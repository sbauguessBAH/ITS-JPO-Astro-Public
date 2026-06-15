<script setup>
import { ref } from "vue";

defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const selectedCategory = ref("all");

const createDetail = (source = "update") => ({
  category: selectedCategory.value,
  source,
});

const dispatchFilterChange = () => {
  window.dispatchEvent(
    new CustomEvent("safety-playbook-filter-change", {
      detail: createDetail(),
    }),
  );
};

const setCategory = (categoryValue) => {
  selectedCategory.value = categoryValue;
  dispatchFilterChange();
};

const clearAll = () => {
  selectedCategory.value = "all";
  window.dispatchEvent(
    new CustomEvent("safety-playbook-filter-change", {
      detail: createDetail("clear"),
    }),
  );
};
</script>

<template>
  <nav class="panel" aria-label="Safety playbook filters">
    <h3 class="panel-title">Filter Tools</h3>

    <div class="panel-section">
      <h4 class="panel-section-title">Category</h4>
      <button
        type="button"
        class="panel-item"
        :class="{ 'panel-item-active': selectedCategory === 'all' }"
        :aria-pressed="selectedCategory === 'all'"
        @click="setCategory('all')"
      >
        <span class="panel-item-text">All Categories</span>
      </button>
      <button
        v-for="category in categories"
        :key="category.value"
        type="button"
        class="panel-item"
        :class="{ 'panel-item-active': selectedCategory === category.value }"
        :aria-pressed="selectedCategory === category.value"
        @click="setCategory(category.value)"
      >
        <span class="panel-item-text">{{ category.label }}</span>
        <span class="panel-count">{{ category.count }}</span>
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
