<script setup lang="ts">
import type Popover from "bootstrap/js/dist/popover";
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  id: string;
  title: string;
  description: string;
  instructions: string;
  glossaryHref: string;
}>();

const trigger = ref<HTMLButtonElement | null>(null);
const content = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const ready = ref(false);
let popover: Popover | undefined;
let tip: HTMLElement | null = null;
let unmounted = false;

const onShow = () => {
  isOpen.value = true;
};

const onInserted = () => {
  const tipId = trigger.value?.getAttribute("aria-describedby");
  tip = tipId ? document.getElementById(tipId) : null;
  if (tip) {
    tip.id = props.id;
    tip.setAttribute("role", "dialog");
    tip.setAttribute("aria-labelledby", `${props.id}-title`);
    tip.querySelector(".popover-header")?.setAttribute("id", `${props.id}-title`);
    trigger.value?.setAttribute("aria-describedby", props.id);
  }
};

const onShown = () => content.value?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
const onHidden = () => {
  isOpen.value = false;
  tip = null;
};

const close = () => {
  popover?.hide();
  trigger.value?.focus({ preventScroll: true });
};

const onOutsidePointerDown = (event: PointerEvent) => {
  if (event.target instanceof Node && !trigger.value?.contains(event.target) && !tip?.contains(event.target)) {
    popover?.hide();
  }
};

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isOpen.value) {
    event.preventDefault();
    close();
  }
};

onMounted(async () => {
  // Bootstrap accesses the DOM at import time, so load it only after hydration.
  const { default: BootstrapPopover } = await import("bootstrap/js/dist/popover");
  if (unmounted || !trigger.value || !content.value) {
    return;
  }

  trigger.value.addEventListener("show.bs.popover", onShow);
  trigger.value.addEventListener("inserted.bs.popover", onInserted);
  trigger.value.addEventListener("shown.bs.popover", onShown);
  trigger.value.addEventListener("hidden.bs.popover", onHidden);
  document.addEventListener("pointerdown", onOutsidePointerDown);
  document.addEventListener("keydown", onKeyDown);
  popover = new BootstrapPopover(trigger.value, {
    title: props.title,
    content: content.value,
    html: true,
    animation: false,
    trigger: "manual",
    placement: "bottom",
    container: "body",
    boundary: "viewport",
    customClass: "playbook-filter-help-popover",
  });
  ready.value = true;
});

onBeforeUnmount(() => {
  unmounted = true;
  popover?.dispose();
  trigger.value?.removeEventListener("show.bs.popover", onShow);
  trigger.value?.removeEventListener("inserted.bs.popover", onInserted);
  trigger.value?.removeEventListener("shown.bs.popover", onShown);
  trigger.value?.removeEventListener("hidden.bs.popover", onHidden);
  document.removeEventListener("pointerdown", onOutsidePointerDown);
  document.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
  <div class="filter-help">
    <button
      ref="trigger"
      type="button"
      class="filter-help-trigger"
      data-bs-toggle="popover"
      :disabled="!ready"
      :aria-label="`Help with ${title}`"
      :aria-controls="id"
      :aria-expanded="isOpen"
      @click="popover?.toggle()"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M12 11v6" stroke="currentColor" stroke-width="2" />
        <circle cx="12" cy="7.5" r="1.2" fill="currentColor" />
      </svg>
    </button>
    <div hidden>
      <div ref="content" class="filter-help-content">
        <p>{{ description }}</p>
        <p class="filter-help-instructions"><strong>How to use:</strong> {{ instructions }}</p>
        <a :href="glossaryHref">{{ title }} in the Safety Areas and Descriptions Glossary</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-help {
  display: inline-flex;
  flex-shrink: 0;
}

.filter-help-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.filter-help-trigger:hover {
  background: rgb(127 127 127 / 15%);
}

.filter-help-trigger:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

:global(.playbook-filter-help-popover) {
  max-width: min(22rem, calc(100vw - 2rem));
}

:global(.playbook-filter-help-popover .popover-body) {
  max-height: calc(100dvh - 6rem);
  overflow-y: auto;
}

.filter-help-content p {
  margin: 0 0 0.75rem;
}

.filter-help-instructions {
  font-size: 0.85em;
}

.filter-help-content a {
  color: #055681;
  text-decoration: underline;
}
</style>
