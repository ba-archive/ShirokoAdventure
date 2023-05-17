<script setup lang="ts">
import { computed, ref } from "vue";

const isLandscape = ref(true);

const { orientation } = window.screen;
orientation.onchange = () => {
  isLandscape.value = orientation.type.includes("landscape");
};
</script>

<template>
  <Teleport to="body" v-if="!isLandscape">
    <div class="test"></div>
  </Teleport>
</template>

<style scoped></style>
