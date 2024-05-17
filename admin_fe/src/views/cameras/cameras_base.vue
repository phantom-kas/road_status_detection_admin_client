<script setup>
import cameras_view from './cameras_view.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <section class="pglr mxpw h-flex fs-fs gp1rem mxph">

    <div class="mxph cams_b fg1" :class="{ 'on_cams_b': route.name !== 'cameras' }">
      <cameras_view class="mxph overflow_scroll overflowx_hidden" />
    </div>
    <div :class="{ 'fg1': route.name !== 'cameras' }">
      <!-- <router-view class=""></router-view> -->


      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :key="route.params.id" :is="Component" />


        </transition>
      </router-view>
    </div>





  </section>
</template>
<style scoped>
.cams_b {
  overflow: hidden;
  max-height: 100%;
}

.cams_b {
  position: sticky;
  top: 0;
}

.cams_b.fg1 {
  /* background-color: yellow; */
}

.on_cams_b {
  flex-grow: unset;
}


@media (max-width: 650px) {
  .on_cams_b {
    display: none;
  }
}
</style>
