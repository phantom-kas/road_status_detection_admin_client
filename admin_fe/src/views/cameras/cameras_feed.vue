<script setup lang='ts'>
import { increasCount } from '../../composables/rtc'
import { useUserStore } from '@/stores/user';
import { pusherStore } from '@/stores/pusherStore';
import { ref } from 'vue'

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
  <div>
    <button v-if="videEl" @click="call(0, 'cam_1', videEl)">bb</button>
    fo {{ user.userInfo.id }}
  </div>

  <button v-if="videEl" @click="doll(videEl)"> ch</button>
  {{ videEl }}
  <img ref="videEl" src="" />
</template>
<style scoped></style>
