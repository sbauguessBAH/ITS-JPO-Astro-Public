<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, type Ref } from "vue";
import { mapSettings, states, type State } from "./_cohort-locations";

/** Final tooltip X position (relative to container, frozen after delay) */
const mouseX: Ref<number> = ref(0);
/** Final tooltip Y position (relative to container, frozen after delay) */
const mouseY: Ref<number> = ref(0);
/** Temporary X position during delay period */
const tempX: Ref<number> = ref(0);
/** Temporary Y position during delay period */
const tempY: Ref<number> = ref(0);
/** Whether to show tooltip */
const showTooltip: Ref<boolean> = ref(false);
/** Current selected state (or null if no tooltip to show) */
const currentState: Ref<State | null> = ref(null);
/** Whether we're currently hovering over a shape */
const hoveringShape: Ref<boolean> = ref(false);
/** Whether we're hovering over the tooltip itself */
const hoveringTooltip: Ref<boolean> = ref(false);
/** ID of the state that initiated the current hover */
const currentStateId: Ref<string | null> = ref(null);

/** Timeout for showing the tooltip after delay */
let showTimeout: ReturnType<typeof setTimeout> | null = null;
/** Timeout for hiding the tooltip after delay */
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Track temporary mouse position during delay period
 * @param event MouseEvent
 */
const updateTempMouse = (event: MouseEvent) => {
  const container = document.querySelector('.map-container') as HTMLElement | null;
  if (container) {
    const rect = container.getBoundingClientRect();
    tempX.value = event.clientX - rect.left;
    tempY.value = event.clientY - rect.top;
  } else {
    tempX.value = event.clientX;
    tempY.value = event.clientY;
  }
};

/** Clear all timeouts */
const clearTimeouts = () => {
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
};

/**
 * Show tooltip with delay (handles both hover and click)
 * @param event MouseEvent
 * @param key State abbreviation
 * @param state State object
 * @param delay Delay in milliseconds
 */
const handleSelect = (event: MouseEvent, key: string, state: State, delay: number) => {
  // If state has no members, don't show tooltip
  if (!state.members || state.members.length === 0) return;

  clearTimeouts();
  window.removeEventListener('mousemove', updateTempMouse);

  hoveringShape.value = true;
  currentStateId.value = key;


  // Start tracking live mouse coords during delay (relative to container)
  const container = document.querySelector('.map-container') as HTMLElement | null;
  if (container) {
    const rect = container.getBoundingClientRect();
    tempX.value = event.clientX - rect.left;
    tempY.value = event.clientY - rect.top;
  } else {
    tempX.value = event.clientX;
    tempY.value = event.clientY;
  }
  window.addEventListener('mousemove', updateTempMouse);

  // Delay before showing tooltip
  showTimeout = setTimeout(() => {
    window.removeEventListener('mousemove', updateTempMouse);

    // If still hovering over the same shape after delay, show tooltip
    if (currentStateId.value === key) {
      // Freeze the position
      mouseX.value = tempX.value;
      mouseY.value = tempY.value;
      currentState.value = state;
      showTooltip.value = true;
    }
  }, delay);
};

/**
 * Schedule hide when leaving a shape
 */
const handleDeselect = () => {
  clearTimeouts();
  window.removeEventListener('mousemove', updateTempMouse);

  hoveringShape.value = false;
  currentStateId.value = null;
  hideTimeout = setTimeout(() => {
    if (!hoveringShape.value && !hoveringTooltip.value) {
      hideTooltip();
    }
  }, mapSettings.leaveDelay);
};

/**
 * Hide tooltip immediately
 */
const hideTooltip = () => {
  clearTimeouts();
  window.removeEventListener('mousemove', updateTempMouse);

  showTooltip.value = false;
  currentState.value = null;
  hoveringShape.value = false;
  hoveringTooltip.value = false;
  currentStateId.value = null;
};

/**
 * Handle global mouse enter (for tooltip hover detection)
 * @param event MouseEvent
 */
const onGlobalMouseEnter = (event: MouseEvent) => {
  const target = event.target as Element;
  if (target.classList.contains('map-tooltip') || target.closest('.map-tooltip')) {
    hoveringTooltip.value = true;
    clearTimeouts();
  }
};

/**
 * Handle global mouse leave (for tooltip hover detection)
 * @param event MouseEvent
 */
const onGlobalMouseLeave = (event: MouseEvent) => {
  const target = event.target as Element;
  if (target.classList.contains('map-tooltip') || target.closest('.map-tooltip')) {
    hoveringTooltip.value = false;

    if (!hoveringShape.value) {
      clearTimeouts();
      hideTimeout = setTimeout(hideTooltip, mapSettings.leaveDelay);
    }
  }
};

/**
 * Handle container click (hide if clicking outside)
 * @param event MouseEvent
 */
const handleContainerClick = (event: MouseEvent) => {
  const target = event.target as Element;
  if (!target.closest('.state') && !target.classList.contains('map-tooltip') && !target.closest('.map-tooltip')) {
    hideTooltip();
  }
};

onMounted(() => {
  const container = document.querySelector(".map-container");
  if (container) {
    container.addEventListener("mouseenter", onGlobalMouseEnter, true);
    container.addEventListener("mouseleave", onGlobalMouseLeave, true);
  }

  document.addEventListener('click', (event) => {
    const target = event.target as Element;
    if (!target.closest('.state') && !target.classList.contains('map-tooltip') && !target.closest('.map-tooltip')) {
      hideTooltip();
    }
  });
});

onBeforeUnmount(() => {
  clearTimeouts();
  window.removeEventListener('mousemove', updateTempMouse);
  
  const container = document.querySelector('.map-container');
  if (container) {
    container.removeEventListener('mouseenter', onGlobalMouseEnter, true);
    container.removeEventListener('mouseleave', onGlobalMouseLeave, true);
  }
});

</script>
<template>
  <div
    class="map-container"
    :style="{ height: mapSettings.totalHeight }"
    @click="handleContainerClick"
  >
    <svg
      class="map-svg"
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="`0 0 ${mapSettings.totalWidth} ${mapSettings.totalHeight}`"
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- Use a group if the state has cohort members -->
      <!-- Draw either the path or the circle representing the State/DC -->
      <!-- Draw the circles for each member agency in the state -->
      <template v-for="[key, state] of Object.entries(states)" :key="key">
        <g
          class="state"
          :class="{ 'cohort-state': !!state.members }"
          @mouseenter="handleSelect($event, key, state, mapSettings.hoverDelay)"
          @mouseleave="handleDeselect"
          @click="handleSelect($event, key, state, mapSettings.clickDelay)"
        >
          <path
            v-if="state.drawable.type === 'path'"
            :d="state.drawable.d"
          ></path>
          <circle
            v-else
            :cx="state.drawable.x"
            :cy="state.drawable.y"
            :r="5"
          ></circle>
          <circle
            v-for="member of state.members"
            :key="member.agency"
            :cx="member.x"
            :cy="member.y"
            :r="mapSettings.cohortRadius"
            class="member-point"
            @mouseenter="handleSelect($event, key, state, mapSettings.hoverDelay)"
            @click="handleSelect($event, key, state, mapSettings.clickDelay)"
          ></circle>
        </g>
      </template>
    </svg>
    <transition name="fade">
      <div
        v-if="showTooltip && currentState"
        class="map-tooltip"
        :style="{ top: `${mouseY + 8}px`, left: `${mouseX + 8}px` }"
      >
        <h1>
          {{ currentState.state }}
        </h1>
        <small>
          {{ currentState.members?.length || 0 }} location{{
            currentState.members && currentState.members.length === 1 ? "" : "s"
          }}
        </small>
        <p v-for="member of currentState.members" :key="member.agency">
          {{ member.agency }}
        </p>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
/** Default for all states */
.state {
  fill: #cae2e7;
  stroke: #ffffff;
}

/** Stylings for cohort states */
.cohort-state {
  fill: #56bbc4;

  .member-point {
    fill: #122e50;
  }

  >path:hover, >circle:hover {
    cursor: pointer;
  }

  &:hover {
    fill: #3f8a91;
    transform-origin: center;
    z-index: 10000;

    .member-point {
      stroke-width: 4;
      stroke: #122e50;
      transition: all;
      transition: all;
      transition-duration: 100ms;
    }
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/** Outer container for the map */
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
}

/** SVG layer of the map */
.map-svg {
  display: block;
  margin: 0 auto;
  position: relative;
  width: 90%;
  height: auto;
  max-width: 100%;
}

.map-tooltip {
  text-align: left;
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #64748b;
  padding: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  transition: all 0.2s;
  z-index: 1000;
  pointer-events: none;
  max-width: 250px;
  
  h1 {
    all: revert;
    font-weight: bold;
    margin: 0 0 4px 0;
    font-size: 16px;
  }

  p {
    all: revert;
    margin: 2px 0;
    font-size: 16px;
    line-height: 1.4;
  }

  small {
    all: revert;
    font-size: 13px;
    color: #6b7280;
  }
}
</style>
