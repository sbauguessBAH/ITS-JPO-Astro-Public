<script setup lang="ts">
import { onMounted, ref } from "vue";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";

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
          v-model="technologyAreas"
          :options="props.technologyAreasList"
          display="chip"
          :showClear="true"
          @change="emitFilterChange"
        />
      </div>

      <div class="news-filter-field">
        <label for="searchInput">Search</label>
        <InputText id="searchInput" v-model="searchQuery" type="text" class="news-filter-input" @input="emitFilterChange" />
      </div>
    </div>

    <button type="button" class="news-filter-clear" @click="clearFilters">Clear filters</button>
  </section>
</template>
