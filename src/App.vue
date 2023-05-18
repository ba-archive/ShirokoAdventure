<script setup lang="ts">
import { ref } from 'vue';
import LandscapeTip from '@/LandscapeTip.vue';

const { orientation } = window.screen;

const isLandscape = ref(orientation?.type.includes('landscape') ?? true);

orientation.onchange = () => {
  isLandscape.value = orientation.type.includes('landscape');
};
</script>

<template>
  <Teleport to="body" v-if="!isLandscape">
    <landscape-tip />
  </Teleport>
</template>

<style scoped lang="scss"></style>
