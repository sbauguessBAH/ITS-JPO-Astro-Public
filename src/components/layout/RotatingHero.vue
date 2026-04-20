<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import base_url from "@/src/lib/base_url";
import HeroBG2 from "@/src/assets/images/Hero-Image-02.jpg";
import highlightsData from "@/src/content/hero/highlights.json";

type ImageLike = string | { src: string };

const toImageUrl = (value: ImageLike): string => {
  return typeof value === "string" ? value : value.src;
};

type Highlight = {
  id: string;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
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
) as Record<string, ImageLike>;

const imageByName = new Map<string, string>();
for (const [path, url] of Object.entries(imageModules)) {
  const basename = path.split("/").pop() ?? path;
  imageByName.set(basename, toImageUrl(url));

  const dot = basename.lastIndexOf(".");
  const hasExt = dot > 0;
  if (hasExt) imageByName.set(basename.slice(0, dot), toImageUrl(url));
}

const resolveImageUrl = (image?: string): string | null => {
  if (!image) return null;

  // Accept JSON values like "Hero-Image-02.jpg", "Hero-Image-02",
  // "./assets/Hero-Image-02.png", or any path ending in the filename.
  const normalized = image.replace(/^\.\//, "").replace(/^assets\//, "");
  const basename = normalized.split("/").pop() ?? normalized;
  const dot = basename.lastIndexOf(".");
  const stem = dot > 0 ? basename.slice(0, dot) : basename;

  return imageByName.get(basename) ?? imageByName.get(stem) ?? null;
};

const activeBackgroundUrl = computed(() => {
  return resolveImageUrl(activeHighlight.value?.image) ?? toImageUrl(HeroBG2 as ImageLike);
});

type SlideDirection = "next" | "prev";
const slideDirection = ref<SlideDirection>("next");

const backgroundStyle = (url: string) => {
  return {
    backgroundImage: `url("${encodeURI(url)}")`,
  };
};

const setIndex = (index: number, direction: SlideDirection) => {
  if (!highlights.length) return;
  slideDirection.value = direction;
  activeIndex.value = index;
};

const rotateHighlight = () => {
  if (!highlights.length) return;
  setIndex((activeIndex.value + 1) % highlights.length, "next");
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
  setIndex((activeIndex.value - 1 + highlights.length) % highlights.length, "prev");
  scheduleNextRotation();
};

const goTo = (index: number) => {
  if (!highlights.length) return;
  if (index < 0 || index >= highlights.length) return;
  const direction: SlideDirection = index >= activeIndex.value ? "next" : "prev";
  setIndex(index, direction);
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
    tabindex="0"
    role="region"
    aria-label="Homepage highlights"
    @keydown="onHeroKeydown"
  >
    <TransitionGroup
      :name="slideDirection === 'prev' ? 'hero-slide-prev' : 'hero-slide-next'"
      tag="div"
      class="hero-bg"
      aria-hidden="true"
    >
      <div
        :key="`${activeIndex}-${activeBackgroundUrl}`"
        class="hero-bg-layer"
        :style="backgroundStyle(activeBackgroundUrl)"
      />
    </TransitionGroup>

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

            <div
              v-if="highlights.length > 1"
              class="d-flex align-items-center gap-2"
              role="navigation"
              aria-label="Select highlight"
            >
              <button
                v-for="(_, index) in highlights"
                :key="index"
                type="button"
                class="hero-dot rounded-circle border-0"
                :class="index === activeIndex ? 'bg-light' : 'bg-secondary'"
                :aria-label="`Go to highlight ${index + 1} of ${highlights.length}`"
                :aria-current="index === activeIndex ? 'true' : undefined"
                @click="goTo(index)"
              />
            </div>

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
    position: relative;
    background-position: center;
    background-size: cover;
    padding: 50px 0 100px 0;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;
  }

  .hero-bg-layer {
    position: absolute;
    inset: 0;
    background-position: center;
    background-size: cover;
    will-change: transform;
  }

  .container-xl {
    position: relative;
    z-index: 1;
  }

  .herobox {
    border-radius: 15px;
    background-color: rgba(7, 46, 85, 0.85)
  }

  .hero-dot {
    width: 10px;
    height: 10px;
    padding: 0;
    display: inline-block;
  }

  .hero-dot:focus-visible {
    outline: 2px solid var(--bs-light);
    outline-offset: 3px;
  }

  .hero-slide-next-enter-active,
  .hero-slide-next-leave-active,
  .hero-slide-prev-enter-active,
  .hero-slide-prev-leave-active {
    transition: transform 600ms ease;
  }

  /* Next: new slides in from left, old slides out to right */
  .hero-slide-next-enter-from {
    transform: translateX(-100%);
    z-index: 1;
  }

  .hero-slide-next-enter-to {
    transform: translateX(0);
    z-index: 1;
  }

  .hero-slide-next-leave-from {
    transform: translateX(0);
    z-index: 0;
  }

  .hero-slide-next-leave-to {
    transform: translateX(100%);
    z-index: 0;
  }

  /* Prev: new slides in from right, old slides out to left */
  .hero-slide-prev-enter-from {
    transform: translateX(100%);
    z-index: 1;
  }

  .hero-slide-prev-enter-to {
    transform: translateX(0);
    z-index: 1;
  }

  .hero-slide-prev-leave-from {
    transform: translateX(0);
    z-index: 0;
  }

  .hero-slide-prev-leave-to {
    transform: translateX(-100%);
    z-index: 0;
  }
</style>