<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import CheckboxMultiSelectDropdown from "./CheckboxMultiSelectDropdown.vue";

const props = defineProps({
  locations: {
    type: Array,
    required: true,
  },
  facilities: {
    type: Array,
    required: true,
  },
  safeties: {
    type: Array,
    required: true,
  },
  playbooks: {
    type: Array,
    required: true,
  },
});

const selectedLocations = ref([]);
const selectedFacilities = ref([]);
const selectedSafeties = ref([]);
const selectedCategory = ref("all");

const normalizeValue = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

const matchesCategory = (item) =>
  !selectedCategory.value || selectedCategory.value === "all" || normalizeValue(item.category) === selectedCategory.value;

const matchesLocations = (item) => {
  if (selectedLocations.value.length === 0) return true;
  const itemLocations = item.location.map(normalizeValue);
  return selectedLocations.value.some((loc) => itemLocations.includes(loc));
};

const matchesFacilities = (item) => {
  if (selectedFacilities.value.length === 0) return true;
  const itemFacilities = item.facility.map(normalizeValue);
  return selectedFacilities.value.some((fac) => itemFacilities.includes(fac));
};

const matchesSafeties = (item) => {
  if (selectedSafeties.value.length === 0) return true;
  const itemSafeties = item.safety.map(normalizeValue);
  return selectedSafeties.value.some((safe) => itemSafeties.includes(safe));
};

const getMatchingItems = () => {
  return props.playbooks.filter(
    (item) => matchesCategory(item) && matchesLocations(item) && matchesFacilities(item) && matchesSafeties(item),
  );
};

const disabledLocations = computed(() => {
  const matchingItems = getMatchingItems();
  return props.locations
    .filter((option) => {
      const hasMatch = matchingItems.some((item) => item.location.map(normalizeValue).includes(option.value));
      return !hasMatch;
    })
    .map((option) => option.value);
});

const disabledFacilities = computed(() => {
  const matchingItems = getMatchingItems();
  return props.facilities
    .filter((option) => {
      const hasMatch = matchingItems.some((item) => item.facility.map(normalizeValue).includes(option.value));
      return !hasMatch;
    })
    .map((option) => option.value);
});

const disabledSafeties = computed(() => {
  const matchingItems = getMatchingItems();
  return props.safeties
    .filter((option) => {
      const hasMatch = matchingItems.some((item) => item.safety.map(normalizeValue).includes(option.value));
      return !hasMatch;
    })
    .map((option) => option.value);
});

const dispatchSecondaryChange = () => {
  if (typeof window === "undefined") {
    return;
  }

  const detail = {
    locations: selectedLocations.value,
    facilities: selectedFacilities.value,
    safeties: selectedSafeties.value,
  };

  window.dispatchEvent(
    new CustomEvent("safety-playbook-secondary-filter-change", {
      detail,
    }),
  );
};

watch([selectedLocations, selectedFacilities, selectedSafeties], () => {
  dispatchSecondaryChange();
});

const onPrimaryFilterChange = (event) => {
  const detail = event?.detail ?? {};

  selectedCategory.value = detail.category ?? "all";

  if (detail.source !== "clear") {
    return;
  }

  selectedLocations.value = [];
  selectedFacilities.value = [];
  selectedSafeties.value = [];
};

onMounted(() => {
  window.addEventListener("safety-playbook-filter-change", onPrimaryFilterChange);
});

onBeforeUnmount(() => {
  window.removeEventListener("safety-playbook-filter-change", onPrimaryFilterChange);
});
</script>

<template>
  <div class="playbook-top-filters" aria-label="Secondary Safety Playbook filters">
    <CheckboxMultiSelectDropdown
      id="playbook-filter-location"
      v-model="selectedLocations"
      label="Location"
      :options="props.locations"
      :disabled-options="disabledLocations"
    />

    <CheckboxMultiSelectDropdown
      id="playbook-filter-facility"
      v-model="selectedFacilities"
      label="Facility"
      :options="props.facilities"
      :disabled-options="disabledFacilities"
    />

    <CheckboxMultiSelectDropdown
      id="playbook-filter-safety"
      v-model="selectedSafeties"
      label="Safety Areas"
      :options="props.safeties"
      :disabled-options="disabledSafeties"
    />
  </div>
</template>
