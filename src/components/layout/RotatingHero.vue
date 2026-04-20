<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import base_url from "@/src/lib/base_url";
import HeroBG2 from "@/src/assets/images/Hero-Image-02.jpg";
import highlightsData from "@/src/content/hero/highlights.json";

const heroStyle = {
  backgroundImage: `url(${HeroBG2})`,
};

type Highlight = {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
};

const highlights = (highlightsData ?? []) as Highlight[];
const activeIndex = ref(0);
const activeHighlight = computed<Highlight | null>(() => {
  if (!highlights.length) return null;
  return highlights[activeIndex.value] ?? null;
});

const rotateHighlight = () => {
  if (!highlights.length) return;
  activeIndex.value = (activeIndex.value + 1) % highlights.length;
};

let intervalId: number | undefined;

onMounted(() => {
  intervalId = window.setInterval(rotateHighlight, 5000);
});

onUnmounted(() => {
  if (intervalId) window.clearInterval(intervalId);
});
</script>
<template>
  <div class="hero-container" :style="heroStyle">
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