<script setup lang="ts">
import camera_head from './camera_head.vue'
import horizontal_navbar from '@/components/horizontal_navbar.vue';
import drop_wrap from '@/components/drop_wrap.vue';
import log_report_component from '@/components/log_report_component.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
defineProps({
  lid: {
    type: String,
    default: null
  },
  id: {
    type: String,
    default: null
  }
})
const log = ref<any>()
const c = (e: any) => {
  log.value = e
}
</script>
<template>
  <section class='h-flex sb-fs gp05rem pos_rel'>
    <div class="mxpw v-flex c-c pos_rel">
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
        route: { name: 'logs' },
        is_route: true
      }
      ]" />
      <div class="mxpw " :class="{ 'cs_log_r_c': lid }">
        <router-view @log="(a: any) => c(a)"></router-view>
      </div>
    </div>





    <transition name="slide-fade" mode="out-in">
      <div :key="lid" v-if="lid" class="mxph pos_sticky log_r_c">
        <log_report_component @close="router.push({ name: 'logs', params: { id } })" :id="lid" :log />
      </div>
    </transition>



  </section>
</template>
<style scoped>
@media screen and (max-width:773px) {
  .log_r_c {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 1;
    /* background-color: red; */
  }

  .cs_log_r_c {
    display: none;
  }
}
</style>