<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import base_url from "@/src/lib/base_url";
import HeroBG2 from "@/src/assets/images/Hero-Image-02.jpg";
import highlightsData from "@/src/content/hero/highlights.json";

type Highlight = {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  durationMs?: number;
};

const highlights = (highlightsData ?? []) as Highlight[];
const activeIndex = ref(0);
const activeHighlight = computed<Highlight | null>(() => {
  if (!highlights.length) return null;
  return highlights[activeIndex.value] ?? null;
});

const imageModules = import.meta.glob(
  "/src/assets/images/**/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" },
) as Record<string, string>;

const imageByBasename = new Map<string, string>(
  Object.entries(imageModules).map(([path, url]) => {
    const basename = path.split("/").pop() ?? path;
    return [basename, url];
  }),
);

const resolveImageUrl = (image?: string): string | null => {
  if (!image) return null;

  // Allow JSON to specify exact Vite glob key, e.g. "/src/assets/images/Spotlight1.png"
  if (image in imageModules) return imageModules[image] ?? null;

  // Allow just a filename, e.g. "Spotlight1.png"
  const asBasename = image.split("/").pop() ?? image;
  return imageByBasename.get(asBasename) ?? null;
};

const activeBackgroundUrl = computed(() => {
  return resolveImageUrl(activeHighlight.value?.image) ?? HeroBG2;
});

const heroStyle = computed(() => ({
  backgroundImage: `url(${activeBackgroundUrl.value})`,
}));

const rotateHighlight = () => {
  if (!highlights.length) return;
  activeIndex.value = (activeIndex.value + 1) % highlights.length;
};

let timeoutId: number | undefined;

const scheduleNextRotation = () => {
  if (timeoutId) window.clearTimeout(timeoutId);

  const durationMs = activeHighlight.value?.durationMs ?? 5000;
  timeoutId = window.setTimeout(() => {
    rotateHighlight();
    scheduleNextRotation();
  }, durationMs);
};

const goNext = () => {
  rotateHighlight();
  scheduleNextRotation();
};

const goPrev = () => {
  if (!highlights.length) return;
  activeIndex.value = (activeIndex.value - 1 + highlights.length) % highlights.length;
  scheduleNextRotation();
};

const onHeroKeydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    goNext();
    return;
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goPrev();
  }
};

onMounted(() => {
  scheduleNextRotation();
});

onUnmounted(() => {
  if (timeoutId) window.clearTimeout(timeoutId);
});
</script>
<template>
  <div
    class="hero-container"
    :style="heroStyle"
    tabindex="0"
    role="region"
    aria-label="Homepage highlights"
    @keydown="onHeroKeydown"
  >
    <div class="container-xl">
      <div class="d-flex align-items-center p-4 col-md-7 herobox">
        <div class="text-white">
          <h2 class="mb-4 fs-2 text-white">
            {{ activeHighlight?.title ?? "Intelligent Transportation Systems Joint Program Office" }}
          </h2>
          <p class="mb-4 fs-4 text-white">
            {{
              activeHighlight?.description ??
              "The Intelligent Transportation Systems Joint Program Office (ITS JPO) seeks to transform the way society moves. Explore our website for information on research and deployments that advance the use of ITS to move people and goods more safely and efficiently."
            }}
          </p>
          <a
            class="btn btn-outline-light btn-lg text-dark m-0 fs-4"
            :href="activeHighlight?.link ?? base_url('/about/')"
            role="button"
          >
            LEARN MORE ABOUT THE ITS JPO
          </a>

          <div class="d-flex gap-2 mt-3" aria-label="Highlight navigation">
            <button
              type="button"
              class="btn btn-outline-light btn-sm"
              aria-label="Previous highlight"
              @click="goPrev"
            >
              ‹
            </button>
            <button
              type="button"
              class="btn btn-outline-light btn-sm"
              aria-label="Next highlight"
              @click="goNext"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
    .hero-container {
    background-position: center;
    background-size: cover;
    padding: 50px 0 100px 0;
  }
  .herobox {
    border-radius: 15px;
    background-color: rgba(7, 46, 85, 0.85)
  }
</style>