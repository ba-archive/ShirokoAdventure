<script setup lang="ts">
import { ref, watch } from 'vue';
import LandscapeTip from '@/LandscapeTip.vue';
import isMobile from 'ismobilejs';

const { orientation } = window.screen;

const isLandscape = ref(orientation?.type.includes('landscape') ?? true);

orientation.onchange = () => {
  isLandscape.value = orientation.type.includes('landscape');
};

const isMobileDevice = isMobile(window.navigator).any;
const isTabletDevice = isMobile(window.navigator).tablet;

if (isMobileDevice) {
  if (isLandscape.value) {
    if (!isTabletDevice) {
      window.unityInstance?.SetFullscreen(1);
    }
  } else {
    window.unityInstance?.SetFullscreen(0);
  }
  watch(
    () => isLandscape.value,
    newValue => {
      if (newValue && isMobileDevice && !isTabletDevice) {
        window.unityInstance?.SetFullscreen(1);
      } else {
        window.unityInstance?.SetFullscreen(0);
      }
    }
  );
}
</script>

<template>
  <Teleport to="body" v-if="false">
    <landscape-tip />
  </Teleport>
</template>

<style scoped lang="scss"></style>
