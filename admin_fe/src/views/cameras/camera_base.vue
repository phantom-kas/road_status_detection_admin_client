<script setup lang="ts">
import camera_head from './camera_head.vue'
import horizontal_navbar from '@/components/horizontal_navbar.vue';
import drop_wrap from '@/components/drop_wrap.vue';
</script>
<template>
  <section class='v-flex c-c pos_rel'>
    <camera_head />

    <horizontal_navbar class="mt1" :btns="[{
      name: 'About',
      route: { name: 'camera' },
      is_route: true
    },
    {
      name: 'Map',
      route: { name: 'dsadsa' }
    },
    {
      name: 'Report',
      route: { name: 'dsadsa' }
    },
    {
      name: 'Logs',
      route: { name: 'dsadsa' }
    }
    ]" />



  </section>
</template>
<style scoped></style>