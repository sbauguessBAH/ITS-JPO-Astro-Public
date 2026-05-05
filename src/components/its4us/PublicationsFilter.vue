<script setup>
import { ref } from "vue";

const props = defineProps({
  deploymentAcronyms: {
    type: Array,
    required: true
  },
  phases: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['filter-change']);

const activeFilterType = ref(null); // 'acronym' or 'phase'
const activeFilterValue = ref(null);

const handleFilterClick = (type, value) => {
  // Toggle off if clicking active filter
  if (activeFilterType.value === type && activeFilterValue.value === value) {
    activeFilterType.value = null;
    activeFilterValue.value = null;
    emit('filter-change', { type: null, value: null });
    // Dispatch custom window event for Astro page to listen to
    window.dispatchEvent(new CustomEvent('publications-filter-change', {
      detail: { type: null, value: null }
    }));
  } else {
    activeFilterType.value = type;
    activeFilterValue.value = value;
    emit('filter-change', { type, value });
    // Dispatch custom window event for Astro page to listen to
    window.dispatchEvent(new CustomEvent('publications-filter-change', {
      detail: { type, value }
    }));
  }
};

const isActive = (type, value) => {
  return activeFilterType.value === type && activeFilterValue.value === value;
};

const slugifyForId = (value) =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getAcronymTooltipId = (value) => `deployment-acronym-tooltip-${slugifyForId(value)}`;
</script>

<template>
  <nav class="panel">
    <h3 class="panel-title">Filter Publications</h3>
    
 <!-- Phase Section -->
    <div class="panel-section">
      <h4 class="panel-section-title">Phase</h4>
      <button
        v-for="phase in phases"
        :key="phase.value"
        @click="handleFilterClick('phase', phase.value)"
        :class="['panel-item', { 'panel-item-active': isActive('phase', phase.value) }]"
      >
        <div class="panel-item-text">Phase {{ phase.value }}</div>
        <div class="panel-count">{{ phase.count }}</div>
      </button>
    </div>

    <!-- Deployment Acronym Section -->
    <div class="panel-section">
      <h4 class="panel-section-title">Deployment Acronym</h4>
      <div v-for="acronym in deploymentAcronyms" :key="acronym.value" class="panel-item-wrapper">
        <button
          @click="handleFilterClick('acronym', acronym.value)"
          :aria-describedby="getAcronymTooltipId(acronym.value)"
          :class="['panel-item', { 'panel-item-active': isActive('acronym', acronym.value) }]"
        >
          <div class="panel-item-text">{{ acronym.label }}</div>
          <div class="panel-count">{{ acronym.count }}</div>
        </button>

        <span
          :id="getAcronymTooltipId(acronym.value)"
          role="tooltip"
          class="panel-tooltip"
        >
          {{ acronym.fullLabel || acronym.label }}
        </span>
      </div>
    </div>

   
  </nav>
</template>

<style scoped>
.panel {
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
}

.panel-title {
  background: rgb(5, 86, 129);
  color: white;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 1rem;
  text-transform: none;
  font-size: 1.4rem;
  margin: 0;
}

.panel-section {
  border-bottom: 1px solid #e5e7eb;
}

.panel-section:last-child {
  border-bottom: none;
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
  text-decoration: none;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
  font-weight: 600;
  width: 100%;
  background: white;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;
}

.panel-item:last-child {
  border-bottom: none;
}

.panel-count {
  background: rgb(229, 231, 235);
  padding: 0 0.75rem;
  height: 1.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.panel-item:hover {
  background: rgb(206, 229, 239);
}

.panel-item-active {
  background: rgb(206, 229, 239);
}

.panel-item-active .panel-count {
  background: rgb(5, 86, 129);
  color: white;
}

.panel-item-active:hover {
  background: rgb(206, 229, 239);
}

.panel-item-wrapper {
  position: relative;
}

.panel-tooltip {
  position: absolute;
  left: 1rem;
  bottom: calc(100% + 0.35rem);
  max-width: calc(100% - 2rem);
  background: rgb(5, 86, 129);
  color: white;
  border-radius: 0.5rem;
  padding: 0.35rem 0.5rem;
  font-size: 0.9rem;
  line-height: 1.2;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.panel-item:hover + .panel-tooltip,
.panel-item:focus-visible + .panel-tooltip {
  opacity: 1;
  visibility: visible;
}
</style>
