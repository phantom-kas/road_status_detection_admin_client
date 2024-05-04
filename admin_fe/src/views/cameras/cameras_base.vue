<script setup>
import cameras_view from './cameras_view.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <section class="pglr mxpw h-flex fs-fs gp1rem mxph">

    <div :class="{ 'fg1': route.name == 'cameras' }" class="mxph">
      <cameras_view class="mxph overflow_scroll overflowx_hidden" />
    </div>
    <div :class="{ 'fg1': route.name !== 'cameras' }">
      <router-view class=""></router-view>
    </div>

  </section>
</template>
<style scoped>
.cams_b {
  overflow: hidden;
  max-height: 100%;
}
</style>
