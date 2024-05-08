<script setup>
import users_view from './users_view.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue';
const route = useRoute()

const key = ref('')
const updateKey = (e) => {
  key.value = e
  // window.alert(e + 'ddsada')
}
</script>
<template>
  <section class="pglr mxpw h-flex fs-fs gp1rem mxph">

    <div :class="{ 'fg1': route.name == 'users' }" class="mxph">
      <users_view @refreshparent="e => updateKey(e)" class="mxph overflow_scroll overflowx_hidden" />
    </div>
    <div :class="{ 'fg1': route.name !== 'users' }">



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

.slide-fade-enter-active {
  transition: all 0.2s ease-out !important;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1) !important;
}

.slide-fade-enter-from {
  transform: translateX(50px) !important;
  opacity: 0 !important;
}

.slide-fade-leave-to {
  transform: translateX(-50px) !important;
  opacity: 0 !important;
}
</style>
