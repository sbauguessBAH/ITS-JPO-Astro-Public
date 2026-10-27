<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  options: string[];
  modelValue: string[];
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const root = ref<HTMLElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const optionGroup = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const buttonSummary = computed(() => props.modelValue.length ? `${props.modelValue.length} selected` : "All");

const close = (restoreFocus = false) => {
  isOpen.value = false;
  if (restoreFocus) trigger.value?.focus();
};

const open = async (last = false) => {
  isOpen.value = true;
  await nextTick();
  const inputs = optionGroup.value?.querySelectorAll<HTMLInputElement>("input");
  inputs?.[last ? inputs.length - 1 : 0]?.focus();
};

const toggle = () => {
  if (isOpen.value) close(true);
  else void open();
};

const toggleOption = (option: string) => {
  emit(
    "update:modelValue",
    props.modelValue.includes(option)
      ? props.modelValue.filter((value) => value !== option)
      : [...props.modelValue, option],
  );
};

const clear = () => {
  emit("update:modelValue", []);
  trigger.value?.focus();
};

const onOutsidePointer = (event: PointerEvent) => {
  if (event.target instanceof Node && !root.value?.contains(event.target)) close();
};

const onFocusOut = (event: FocusEvent) => {
  if (!(event.relatedTarget instanceof Node) || !root.value?.contains(event.relatedTarget)) close();
};

const onOptionKeydown = (event: KeyboardEvent) => {
  const inputs = Array.from(optionGroup.value?.querySelectorAll<HTMLInputElement>("input") ?? []);
  const index = inputs.findIndex((input) => input === event.target);
  if (index < 0) return;

  let nextIndex: number;
  switch (event.key) {
    case "ArrowDown": nextIndex = (index + 1) % inputs.length; break;
    case "ArrowUp": nextIndex = (index - 1 + inputs.length) % inputs.length; break;
    case "Home": nextIndex = 0; break;
    case "End": nextIndex = inputs.length - 1; break;
    default: return;
  }
  event.preventDefault();
  inputs[nextIndex]?.focus();
};

onMounted(() => document.addEventListener("pointerdown", onOutsidePointer));
onBeforeUnmount(() => document.removeEventListener("pointerdown", onOutsidePointer));
</script>

<template>
  <div ref="root" class="multi-select" @focusout="onFocusOut" @keydown.esc.prevent.stop="close(true)">
    <button
      :id="id"
      ref="trigger"
      type="button"
      class="multi-select-trigger"
      :class="{ 'multi-select-trigger-open': isOpen }"
      :aria-label="`${label}: ${buttonSummary}`"
      :aria-expanded="isOpen"
      :aria-controls="`${id}-options`"
      @click="toggle"
      @keydown.down.prevent="open()"
      @keydown.up.prevent="open(true)"
    >
      <span class="multi-select-summary">{{ buttonSummary }}</span>
      <svg class="multi-select-chevron" viewBox="0 0 20 20" aria-hidden="true">
        <path d="m4 7 6 6 6-6" />
      </svg>
    </button>
    <div
      v-show="isOpen"
      :id="`${id}-options`"
      ref="optionGroup"
      class="multi-select-options"
      role="group"
      :aria-label="`${label} options`"
      @keydown="onOptionKeydown"
    >
      <div class="multi-select-actions">
        <button
          type="button"
          class="multi-select-clear"
          :aria-label="`Clear ${label}`"
          :disabled="modelValue.length === 0"
          @click="clear"
        >Clear</button>
      </div>
      <ul class="multi-select-list">
        <li v-for="option in options" :key="option" class="multi-select-item">
          <label class="multi-select-option">
            <input type="checkbox" :checked="modelValue.includes(option)" @change="toggleOption(option)" />
            <span>{{ option }}</span>
          </label>
        </li>
      </ul>
      <p v-if="!options.length" class="multi-select-empty">No options available.</p>
    </div>
  </div>
</template>

<style scoped>
.multi-select {
  position: relative;
  min-width: 0;
  --filter-bg: #fff;
  --filter-color: rgb(5, 86, 129);
  --filter-border: #e5e7eb;
}

.multi-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-height: 2.5rem;
  border: 1px solid var(--filter-border);
  border-radius: 100vh;
  padding: 0.45rem 0.75rem;
  font: inherit;
  font-weight: 600;
  text-align: left;
  color: #111827;
  background: var(--filter-bg);
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
}

.multi-select-summary {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.multi-select-chevron {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  color: #666;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.2s ease;
}

.multi-select-trigger-open .multi-select-chevron {
  transform: rotate(180deg);
}

.multi-select-trigger:hover,
.multi-select-trigger:focus,
.multi-select-trigger-open {
  border-color: var(--filter-color);
}

.multi-select-trigger:focus,
.multi-select-trigger-open {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--filter-color) 18%, transparent);
}

.multi-select button:focus-visible {
  outline: 2px solid var(--filter-color);
  outline-offset: 2px;
}

.multi-select-options {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 50;
  width: 100%;
  max-height: 18rem;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #fff;
  box-shadow: 0 10px 24px rgb(0 0 0 / 12%);
}

.multi-select-actions {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0.5rem 0.65rem;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.multi-select-clear {
  border: 1px solid var(--filter-color);
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  color: var(--filter-color);
  background: #fff;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.multi-select-clear:hover:not(:disabled) {
  background: color-mix(in srgb, var(--filter-color) 8%, white);
}

.multi-select-clear:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.multi-select-list,
.multi-select-item {
  margin: 0;
  padding: 0;
  list-style: none;
}

.multi-select-item + .multi-select-item {
  border-top: 1px solid #f3f4f6;
}

.multi-select .multi-select-option {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  padding: 0.6rem 0.75rem;
  font: inherit;
  font-size: 0.95rem;
  color: #1f2937;
  cursor: pointer;
  overflow-wrap: anywhere;
  transition: background-color 0.15s ease;
}

.multi-select-option:hover,
.multi-select-option:focus-within {
  background: #f9fafb;
}

.multi-select-option input {
  margin: 0;
  accent-color: var(--filter-color);
  cursor: pointer;
  scroll-margin-top: 3.5rem;
}

.multi-select-empty {
  margin: 0;
  padding: 0.4rem 0.5rem;
}
</style>
