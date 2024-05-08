<script setup lang="ts">
import user_head from './user_head.vue'
import horizontal_navbar from '@/components/horizontal_navbar.vue';
import drop_wrap from '@/components/drop_wrap.vue';


const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

</script>
<template>
  <section class='v-flex c-c pos_rel'>
    <user_head :id />

    <horizontal_navbar class="mt1" :btns="[{
      name: 'Profile info',
      route: { name: 'camera' },
      is_route: true
    },
    {
      name: 'Recent activity',
      route: { name: 'recent_activity' },
      is_route: true
    }]" />


    <div class="mxpw">
      <router-view></router-view>
    </div>


  </section>
</template>
<style scoped></style>