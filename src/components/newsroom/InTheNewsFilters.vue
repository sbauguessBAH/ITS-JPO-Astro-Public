<script setup lang="ts">
import { onMounted, ref } from "vue";
import MultiSelect from "../MultiSelect.vue";

type FilterDetail = {
  technologyAreas: string[];
  searchQuery: string;
};

const props = defineProps<{
  technologyAreasList: string[];
}>();

const technologyAreas = ref<string[]>([]);
const searchQuery = ref("");

const emitFilterChange = () => {
  const detail: FilterDetail = {
    technologyAreas: [...technologyAreas.value],
    searchQuery: searchQuery.value,
  };

  window.dispatchEvent(
    new CustomEvent("in-the-news-filter-change", {
      detail,
    }),
  );
};

const clearFilters = () => {
  technologyAreas.value = [];
  searchQuery.value = "";
  emitFilterChange();
};

const updateTechnologyAreas = (value: string[]) => {
  technologyAreas.value = value;
  emitFilterChange();
};

const updateSearchQuery = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    searchQuery.value = event.target.value;
    emitFilterChange();
  }
};

onMounted(() => {
  emitFilterChange();
});
</script>

<template>
  <section class="news-filter-panel" aria-label="In the News filters">
    <div class="news-filter-grid">

      <div class="news-filter-field technologyAreaContainer">
        <label for="technologyAreas">Technology Area</label>
        <MultiSelect
          id="technologyAreas"
          label="Technology Area"
          :model-value="technologyAreas"
          :options="props.technologyAreasList"
          @update:model-value="updateTechnologyAreas"
        />
      </div>

      <div class="news-filter-field">
        <label for="searchInput">Search</label>
        <input id="searchInput" :value="searchQuery" type="text" class="news-filter-input" @input="updateSearchQuery" />
      </div>
    </div>

    <button type="button" class="news-filter-clear" @click="clearFilters">Clear filters</button>
  </section>
</template>
