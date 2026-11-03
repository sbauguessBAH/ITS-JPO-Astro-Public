<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import CheckboxMultiSelectDropdown from "./CheckboxMultiSelectDropdown.vue";
import FilterHelpPopover from "./FilterHelpPopover.vue";

const props = defineProps({
  glossaryUrl: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  locations: {
    type: Array,
    required: true,
  },
  facilities: {
    type: Array,
    required: true,
  },
  playbooks: {
    type: Array,
    required: true,
  },
});

const selectedCategories = ref([]);
const selectedLocations = ref([]);
const selectedFacilities = ref([]);
const selectedSafety = ref("all");
// Search state is broadcast by index.astro and used to gray out eliminated options.
const searchHasQuery = ref(false);
const searchMatchedSlugs = ref(new Set());

// Keep formatting aligned with the normalization strategy used by cards and primary filters.
const normalizeValue = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

const matchesGroup = (selectedValues, itemValues) => {
  if (!selectedValues || selectedValues.length === 0) {
    return true;
  }

  const normalizedItemValues = itemValues.map(normalizeValue);
  return selectedValues.some((value) => normalizedItemValues.includes(value));
};

const matchesCategory = (selectedValues, itemCategory) => {
  if (!selectedValues || selectedValues.length === 0) {
    return true;
  }

  return selectedValues.includes(normalizeValue(itemCategory));
};

const matchesSearchScope = (itemSlug) => {
  if (!searchHasQuery.value) {
    return true;
  }

  return searchMatchedSlugs.value.has(itemSlug);
};

const matchesSafety = (item) => {
  if (!selectedSafety.value || selectedSafety.value === "all") {
    return true;
  }

  const itemSafeties = item.safety.map(normalizeValue);
  return itemSafeties.includes(selectedSafety.value);
};

// For each dropdown, temporarily ignore that same dimension so users can see
// which additional options are still reachable under the other active constraints.
const getSelectionScope = (excludeDimension) => ({
  categories: excludeDimension === "categories" ? [] : selectedCategories.value,
  locations: excludeDimension === "locations" ? [] : selectedLocations.value,
  facilities: excludeDimension === "facilities" ? [] : selectedFacilities.value,
});

// Apply current primary safety, secondary selections, and search scope to build reachable items.
const getScopedMatches = (scope) =>
  props.playbooks.filter((item) => {
    const safetyMatch = matchesSafety(item);
    const categoryMatch = matchesCategory(scope.categories, item.category);
    const locationMatch = matchesGroup(scope.locations, item.location);
    const facilityMatch = matchesGroup(scope.facilities, item.facility);
    const searchMatch = matchesSearchScope(item.slug);

    return safetyMatch && categoryMatch && locationMatch && facilityMatch && searchMatch;
  });

const getDisabledOptions = ({ options, selectedValues, matchingItems, itemHasValue }) => {
  const selectedSet = new Set(selectedValues);

  return options
    .filter((option) => {
      // Keep selected options interactive so users can always deselect them.
      if (selectedSet.has(option.value)) {
        return false;
      }

      // Disable only when no remaining item can satisfy this option under the current scope.
      const hasMatch = matchingItems.some((item) => itemHasValue(item, option.value));
      return !hasMatch;
    })
    .map((option) => option.value);
};

const disabledCategories = computed(() => {
  const matchingItems = getScopedMatches(getSelectionScope("categories"));

  return getDisabledOptions({
    options: props.categories,
    selectedValues: selectedCategories.value,
    matchingItems,
    itemHasValue: (item, optionValue) => normalizeValue(item.category) === optionValue,
  });
});

const disabledLocations = computed(() => {
  const matchingItems = getScopedMatches(getSelectionScope("locations"));

  return getDisabledOptions({
    options: props.locations,
    selectedValues: selectedLocations.value,
    matchingItems,
    itemHasValue: (item, optionValue) => item.location.map(normalizeValue).includes(optionValue),
  });
});

const disabledFacilities = computed(() => {
  const matchingItems = getScopedMatches(getSelectionScope("facilities"));

  return getDisabledOptions({
    options: props.facilities,
    selectedValues: selectedFacilities.value,
    matchingItems,
    itemHasValue: (item, optionValue) => item.facility.map(normalizeValue).includes(optionValue),
  });
});

const dispatchSecondaryChange = () => {
  if (typeof window === "undefined") {
    return;
  }

  const detail = {
    categories: selectedCategories.value,
    locations: selectedLocations.value,
    facilities: selectedFacilities.value,
  };

  window.dispatchEvent(
    new CustomEvent("safety-playbook-secondary-filter-change", {
      detail,
    }),
  );
};

watch([selectedCategories, selectedLocations, selectedFacilities], () => {
  // Broadcast every secondary filter change so card visibility and sidebar counts stay synchronized.
  dispatchSecondaryChange();
});

const onPrimaryFilterChange = (event) => {
  const detail = event?.detail ?? {};

  selectedSafety.value = detail.safety ?? "all";

  if (detail.source !== "clear") {
    return;
  }

  // Only clear secondary picks when the primary panel explicitly requests a full reset.
  selectedCategories.value = [];
  selectedLocations.value = [];
  selectedFacilities.value = [];
};

const onSearchChange = (event) => {
  const detail = event?.detail ?? {};
  // Reassign a new Set to trigger Vue reactivity for computed disabled lists.
  searchHasQuery.value = detail.hasQuery ?? false;
  searchMatchedSlugs.value = new Set(detail.matchedSlugs ?? []);
};

onMounted(() => {
  window.addEventListener("safety-playbook-filter-change", onPrimaryFilterChange);
  window.addEventListener("safety-playbook-search-change", onSearchChange);
});

onBeforeUnmount(() => {
  window.removeEventListener("safety-playbook-filter-change", onPrimaryFilterChange);
  window.removeEventListener("safety-playbook-search-change", onSearchChange);
});
</script>

<template>
  <div class="playbook-top-filters" aria-label="Secondary ITS Toolkit for Roadway Safety filters">
   
    <CheckboxMultiSelectDropdown
      id="playbook-filter-location"
      v-model="selectedLocations"
      label="Area Types"
      :options="props.locations"
      :disabled-options="disabledLocations"
      variant="location"
    >
      <template #help>
        <FilterHelpPopover
          id="playbook-location-help"
          title="Area Types"
          description="Area types describe the surrounding development context: rural, suburban, or urban."
          instructions="Open the dropdown and check one or more area types. Results can match any selected area type and must also match the other active filters and search. Uncheck an option or use Clear to remove this restriction; All means no restriction. Grayed-out options have no matches with the other active filters and search."
          :glossary-href="`${props.glossaryUrl}#area-type`"
        />
      </template>
    </CheckboxMultiSelectDropdown>

    <CheckboxMultiSelectDropdown
      id="playbook-filter-facility"
      v-model="selectedFacilities"
      label="Facility Types"
      :options="props.facilities"
      :disabled-options="disabledFacilities"
      variant="facility"
    >
      <template #help>
        <FilterHelpPopover
          id="playbook-facility-help"
          title="Facility Types"
          description="Facility types describe the roadway setting where a strategy applies, such as a freeway segment, arterial/collector segment, local segment, interchange, or intersection."
          instructions="Open the dropdown and check one or more facility types. Results can match any selected facility type and must also match the other active filters and search. Uncheck an option or use Clear to remove this restriction; All means no restriction. Grayed-out options have no matches with the other active filters and search."
          :glossary-href="`${props.glossaryUrl}#facility-type`"
        />
      </template>
    </CheckboxMultiSelectDropdown>

     <CheckboxMultiSelectDropdown
      id="playbook-filter-category"
      v-model="selectedCategories"
      label="Categories"
      :options="props.categories"
      :disabled-options="disabledCategories"
      variant="category"
    >
      <template #help>
        <FilterHelpPopover
          id="playbook-category-help"
          title="Categories"
          description="Categories group strategies by technology or operational focus, such as cameras, signals, communication, road weather, and traffic operations."
          instructions="Open the dropdown and check one or more categories. Results can match any selected category and must also match the other active filters and search. Uncheck an option or use Clear to remove this restriction; All means no restriction. Grayed-out options have no matches with the other active filters and search."
          :glossary-href="`${props.glossaryUrl}#categories`"
        />
      </template>
    </CheckboxMultiSelectDropdown>


  </div>
</template>
