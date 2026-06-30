<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  safeties: {
    type: Array,
    required: true,
  },
  playbooks: {
    type: Array,
    required: true,
  },
});

const selectedSafety = ref("all");
const selectedCategories = ref([]);
const selectedLocations = ref([]);
const selectedFacilities = ref([]);
const searchHasQuery = ref(false);
const searchMatchedSlugs = ref(new Set());

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

const matchingBySecondary = computed(() =>
  props.playbooks.filter((item) => {
    // Sidebar counts reflect the current secondary filters and active search scope.
    const categoryMatch = matchesCategory(selectedCategories.value, item.category);
    const locationMatch = matchesGroup(selectedLocations.value, item.location);
    const facilityMatch = matchesGroup(selectedFacilities.value, item.facility);
    const searchMatch = matchesSearchScope(item.slug);

    return categoryMatch && locationMatch && facilityMatch && searchMatch;
  }),
);

const safetyCountMap = computed(() => {
  const counts = {};

  matchingBySecondary.value.forEach((item) => {
    // Count each safety once per playbook card to avoid double counting duplicates.
    const uniqueSafeties = [...new Set(item.safety.map(normalizeValue))];
    uniqueSafeties.forEach((key) => {
      counts[key] = (counts[key] || 0) + 1;
    });
  });

  return counts;
});

const safetiesWithCounts = computed(() =>
  props.safeties.map((safety) => ({
    ...safety,
    count: safetyCountMap.value[safety.value] ?? 0,
  })),
);

const allCount = computed(() => matchingBySecondary.value.length);

const createDetail = (source = "update") => ({
  safety: selectedSafety.value,
  source,
});

const dispatchFilterChange = () => {
  window.dispatchEvent(
    new CustomEvent("safety-playbook-filter-change", {
      detail: createDetail(),
    }),
  );
};

const setSafety = (safetyValue) => {
  selectedSafety.value = safetyValue;
  dispatchFilterChange();
};

const clearAll = () => {
  selectedSafety.value = "all";
  selectedCategories.value = [];
  selectedLocations.value = [];
  selectedFacilities.value = [];

  window.dispatchEvent(
    new CustomEvent("safety-playbook-filter-change", {
      detail: createDetail("clear"),
    }),
  );
};

const onSecondaryFilterChange = (event) => {
  // Keep primary-sidebar counts in sync with top-filter selections.
  const detail = event?.detail ?? {};
  selectedCategories.value = detail.categories ?? [];
  selectedLocations.value = detail.locations ?? [];
  selectedFacilities.value = detail.facilities ?? [];
};

const onSearchChange = (event) => {
  // Search emits slug matches so counts can recompute without re-querying content.
  const detail = event?.detail ?? {};
  searchHasQuery.value = detail.hasQuery ?? false;
  searchMatchedSlugs.value = new Set(detail.matchedSlugs ?? []);
};

onMounted(() => {
  window.addEventListener("safety-playbook-secondary-filter-change", onSecondaryFilterChange);
  window.addEventListener("safety-playbook-search-change", onSearchChange);
});

onBeforeUnmount(() => {
  window.removeEventListener("safety-playbook-secondary-filter-change", onSecondaryFilterChange);
  window.removeEventListener("safety-playbook-search-change", onSearchChange);
});
</script>

<template>
  <nav class="panel sticky-top" aria-label="Safety playbook filters">
    <h3 class="panel-title">Filter Tools</h3>

    <div class="panel-section">
      <h4 class="panel-section-title">Safety Areas</h4>
      <button
        type="button"
        class="panel-item"
        :class="{ 'panel-item-active': selectedSafety === 'all' }"
        :aria-pressed="selectedSafety === 'all'"
        @click="setSafety('all')"
      >
        <span class="panel-item-text">All Safety Areas</span>
        <span class="panel-count">{{ allCount }}</span>
      </button>
      <button
        v-for="safety in safetiesWithCounts"
        :key="safety.value"
        type="button"
        class="panel-item"
        :class="{ 'panel-item-active': selectedSafety === safety.value }"
        :aria-pressed="selectedSafety === safety.value"
        @click="setSafety(safety.value)"
      >
        <span class="panel-item-text">{{ safety.label }}</span>
        <span class="panel-count">{{ safety.count }}</span>
      </button>
    </div>

    <div class="panel-actions">
      <button type="button" class="clear-button" @click="clearAll">Clear All Filters</button>
    </div>
  </nav>
</template>

<style scoped>
.panel {
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  background: #fff;
}

.panel-title {
  background: rgb(5, 86, 129);
  color: #fff;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 1rem;
  text-transform: none;
  font-size: 1.4rem;
  margin: 0;
}

.panel-section {
  border-bottom: 1px solid #e5e7eb;
}

.panel-section-title {
  font-size: 1rem;
  font-weight: 700;
  padding: 0.75rem 1rem;
  margin: 0;
  background: rgb(249, 250, 251);
  border-bottom: 1px solid #e5e7eb;
}

.panel-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
  font-weight: 600;
  width: 100%;
  background: #fff;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;
}

.panel-item:last-child {
  border-bottom: none;
}

.panel-item:hover {
  background: rgb(206, 229, 239);
}

.panel-item-active {
  background: rgb(206, 229, 239);
}

.panel-item-active .panel-count {
  background: rgb(5, 86, 129);
  color: #fff;
}

.panel-item-text {
  margin-right: 0.5rem;
}

.panel-count {
  background: rgb(229, 231, 235);
  padding: 0 0.75rem;
  height: 1.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.panel-actions {
  padding: 0.75rem 1rem;
}

.clear-button {
  width: 100%;
  border: 1px solid rgb(5, 86, 129);
  color: rgb(5, 86, 129);
  background: #fff;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
}

.clear-button:hover {
  background: rgb(239, 246, 251);
}
</style>
