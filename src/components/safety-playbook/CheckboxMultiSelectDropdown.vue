<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  disabledOptions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const rootEl = ref(null);

const selectedCount = computed(() => props.modelValue.length);
const buttonSummary = computed(() => {
  if (selectedCount.value === 0) {
    return "All";
  }

  return `${selectedCount.value} selected`;
});

const isSelected = (value) => props.modelValue.includes(value);

const isDisabled = (value) => props.disabledOptions.includes(value);

const updateSelection = (value, checked) => {
  if (isDisabled(value)) {
    return;
  }

  const next = new Set(props.modelValue);

  if (checked) {
    next.add(value);
  } else {
    next.delete(value);
  }

  emit("update:modelValue", Array.from(next));
};

const clearSelection = () => {
  emit("update:modelValue", []);
};

const toggleOpen = () => {
  console.log(`[${props.id}] toggleOpen called, isOpen before:`, isOpen.value);
  isOpen.value = !isOpen.value;
  console.log(`[${props.id}] isOpen after:`, isOpen.value);
};

const closeDropdown = () => {
  console.log(`[${props.id}] closeDropdown called`);
  isOpen.value = false;
};

const onDocumentPointerDown = (event) => {
  if (!rootEl.value) {
    return;
  }

  const isClickInsideDropdown = rootEl.value.contains(event.target);
  console.log(`[${props.id}] onDocumentPointerDown - isClickInsideDropdown:`, isClickInsideDropdown, "target:", event.target);

  if (!isClickInsideDropdown) {
    closeDropdown();
  }
};

const onDocumentKeyDown = (event) => {
  if (event.key === "Escape") {
    console.log(`[${props.id}] Escape pressed`);
    closeDropdown();
  }
};

onMounted(() => {
  console.log(`[${props.id}] CheckboxMultiSelectDropdown mounted`);
  console.log(`[${props.id}] Options:`, props.options);
  document.addEventListener("pointerdown", onDocumentPointerDown);
  document.addEventListener("keydown", onDocumentKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onDocumentPointerDown);
  document.removeEventListener("keydown", onDocumentKeyDown);
});
</script>

<template>
  <div ref="rootEl" class="dropdown-filter">
    <label class="dropdown-label" :for="`${id}-trigger`">{{ label }}</label>

    <button
      :id="`${id}-trigger`"
      type="button"
      class="dropdown-trigger"
      :class="{ 'dropdown-trigger-open': isOpen }"
      :aria-controls="`${id}-menu`"
      :aria-expanded="isOpen"
      @click="toggleOpen"
    >
      <span class="dropdown-trigger-text">{{ buttonSummary }}</span>
      <span class="dropdown-trigger-icon" aria-hidden="true">▾</span>
    </button>

    <div
      v-if="isOpen"
      :id="`${id}-menu`"
      class="dropdown-menu"
      role="group"
      :aria-label="`${label} options`"
    >
      <div class="dropdown-actions">
        <button
          type="button"
          class="dropdown-clear"
          :disabled="selectedCount === 0"
          @click="clearSelection"
        >
          Clear
        </button>
      </div>

      <ul class="dropdown-list">
        <li v-for="option in options" :key="option.value" class="dropdown-item">
          <label class="dropdown-checkbox-row" :class="{ 'dropdown-checkbox-row-disabled': isDisabled(option.value) }">
            <input
              type="checkbox"
              class="dropdown-checkbox"
              :checked="isSelected(option.value)"
              :disabled="isDisabled(option.value)"
              @change="updateSelection(option.value, $event.target.checked)"
            />
            <span class="dropdown-option-label">{{ option.label }}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dropdown-filter {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  position: relative;
  overflow: visible;
}

.dropdown-label {
  font-weight: 700;
  color: rgb(5, 86, 129);
  font-size: 0.95rem;
}

.dropdown-trigger {
  min-height: 2.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.45rem 0.75rem;
  background: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
}

.dropdown-trigger:hover {
  border-color: rgb(5, 86, 129);
  background-color: #f8fafb;
}

.dropdown-trigger-open {
  border-color: rgb(5, 86, 129);
  background-color: #f8fafb;
  box-shadow: 0 0 0 3px rgba(5, 86, 129, 0.1);
}

.dropdown-trigger-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-trigger:focus {
  outline: none;
  border-color: rgb(5, 86, 129);
  box-shadow: 0 0 0 3px rgba(5, 86, 129, 0.1);
}

.dropdown-trigger:focus-visible {
  outline: 2px solid rgb(5, 86, 129);
  outline-offset: 2px;
}

.dropdown-trigger-icon {
  color: #666;
  font-size: 0.85rem;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  display: inline-block;
}

.dropdown-trigger-open .dropdown-trigger-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  z-index: 50;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  display: block;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #fff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  max-height: 18rem;
  overflow-y: auto;
  min-width: 200px;
}

.dropdown-actions {
  position: sticky;
  top: 0;
  padding: 0.5rem 0.65rem;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
}

.dropdown-clear {
  border: 1px solid rgb(5, 86, 129);
  color: rgb(5, 86, 129);
  background: #fff;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}

.dropdown-clear:hover:not(:disabled) {
  background-color: rgba(5, 86, 129, 0.05);
}

.dropdown-clear:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dropdown-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.dropdown-item {
  margin: 0;
  padding: 0;
}

.dropdown-item + .dropdown-item {
  border-top: 1px solid #f3f4f6;
}

.dropdown-checkbox-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.75rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dropdown-checkbox-row:hover:not(.dropdown-checkbox-row-disabled) {
  background-color: #f9fafb;
}

.dropdown-checkbox-row-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dropdown-checkbox {
  accent-color: rgb(5, 86, 129);
  cursor: pointer;
  flex-shrink: 0;
}

.dropdown-checkbox:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.dropdown-checkbox-row-disabled .dropdown-checkbox {
  cursor: not-allowed;
}

.dropdown-option-label {
  font-size: 0.95rem;
  color: #1f2937;
}

.dropdown-checkbox-row-disabled .dropdown-option-label {
  color: #9ca3af;
}
</style>
