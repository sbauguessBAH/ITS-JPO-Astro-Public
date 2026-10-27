<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

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

const removeOption = (option: string) => {
  emit("update:modelValue", props.modelValue.filter((value) => value !== option));
  trigger.value?.focus();
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
    <div class="multi-select-control" @click.self="toggle">
      <div v-if="modelValue.length" class="multi-select-chips">
        <span v-for="option in modelValue" :key="option" class="multi-select-chip">
          <span>{{ option }}</span>
          <button type="button" class="multi-select-remove" :aria-label="`Remove ${option}`" @click="removeOption(option)">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="8" />
              <path d="m7 7 6 6m0-6-6 6" />
            </svg>
          </button>
        </span>
      </div>
      <button
        v-if="modelValue.length"
        type="button"
        class="multi-select-clear"
        :aria-label="`Clear ${label}`"
        @click="clear"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 4 12 12m0-12L4 16" /></svg>
      </button>
      <button
        :id="id"
        ref="trigger"
        type="button"
        class="multi-select-trigger"
        :aria-label="`${label}, ${modelValue.length} selected`"
        :aria-expanded="isOpen"
        :aria-controls="`${id}-options`"
        @click="toggle"
        @keydown.down.prevent="open()"
        @keydown.up.prevent="open(true)"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 7 6 6 6-6" /></svg>
      </button>
    </div>
    <div
      v-show="isOpen"
      :id="`${id}-options`"
      ref="optionGroup"
      class="multi-select-options"
      role="group"
      :aria-label="label"
      @keydown="onOptionKeydown"
    >
      <label v-for="option in options" :key="option" class="multi-select-option">
        <input type="checkbox" :checked="modelValue.includes(option)" @change="toggleOption(option)" />
        <span>{{ option }}</span>
      </label>
      <p v-if="!options.length" class="multi-select-empty">No options available.</p>
    </div>
  </div>
</template>

<style scoped>
.multi-select {
  position: relative;
  min-width: 0;
  --multi-select-chip-background: rgb(216, 216, 216);
  --multi-select-checkbox-color: #047cad;
}

.multi-select-control {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  min-height: 42px;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font: inherit;
  color: #111827;
  background: #fff;
  cursor: pointer;
}

.multi-select-chips {
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
}

.multi-select-chip {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  margin: 4px 2px;
  border-radius: 50px;
  padding: 0 3px 0 12px;
  background: var(--multi-select-chip-background);
  color: #000;
}

.multi-select-chip > span {
  overflow-wrap: anywhere;
  min-width: 0;
}

.multi-select button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 0;
  padding: 0;
  color: inherit;
  background: transparent;
  cursor: pointer;
}

.multi-select .multi-select-trigger {
  flex-grow: 1;
  justify-content: flex-end;
  align-self: stretch;
  min-width: 1.5rem;
}

.multi-select-clear {
  margin-left: auto;
}

.multi-select svg {
  width: 1.25rem;
  height: 1.25rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
}

.multi-select button:focus-visible {
  outline: 2px solid #047cad;
  outline-offset: 2px;
  border-radius: 3px;
}

.multi-select-control:focus-within {
  border-color: #047cad;
}

.multi-select-options {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  z-index: 10;
  width: 100%;
  max-height: 14rem;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid gray;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 6px rgb(0 0 0 / 15%);
}

.multi-select .multi-select-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0.4rem 0.5rem;
  font: inherit;
  color: #000;
  cursor: pointer;
  overflow-wrap: anywhere;
}

.multi-select-option:hover,
.multi-select-option:focus-within {
  background: rgb(238, 238, 238);
}

.multi-select-option input {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin: 0;
  accent-color: var(--multi-select-checkbox-color);
}

.multi-select-empty {
  margin: 0;
  padding: 0.4rem 0.5rem;
}
</style>
