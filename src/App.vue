<script setup lang="ts">
import { computed, ref } from 'vue';

const { orientation } = window.screen;

const isLandscape = ref(orientation.type.includes('landscape') || true);

orientation.onchange = () => {
  isLandscape.value = orientation.type.includes('landscape');
};
</script>

<template>
  <Teleport to="body" v-if="!isLandscape">
    <div class="test"></div>
  </Teleport>
</template>

<style scoped></style>
