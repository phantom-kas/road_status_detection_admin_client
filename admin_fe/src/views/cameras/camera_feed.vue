<script setup lang='ts'>
import { increasCount } from '../../composables/rtc'
import { useUserStore } from '@/stores/user';
import { pusherStore } from '@/stores/pusherStore';
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  id: {
    type: String,
    default: null,
  }
})
const videEl = ref<HTMLImageElement | null>(null)
const { call } = pusherStore()
const user = useUserStore()
const e = () => {
  let i = increasCount
  window.alert(i)
}
const doll = (e: HTMLImageElement) => {
  e.src = './src/assets/images/image.png'
}
</script>
<template>

  <div class="mxpw  v-flex fs-c gp1rem mt2">
    <div v-if="videEl" class="mxpw h-flex fs-fs">
      <button v-if="videEl" @click="call(0, 'cam_' + id, videEl)"
        class="h-flex c-c gp05rem round1 sdw1 cursor_pointer pbtn bgvcol2 hov_glow_col1">
        <font-awesome-icon size="3x" :icon="['far', 'circle-play']" /> Play
      </button>
    </div>
    <img ref="videEl" src="" alt="" />
  </div>



</template>
<style scoped></style>
