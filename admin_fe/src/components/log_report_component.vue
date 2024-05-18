<script setup lang='ts'>
import v_image from './v_image.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, onMounted } from 'vue';
import axios from 'axios';
const props = defineProps({
  id: {
    type: String,
    default: null
  },
  log: {
    type: Object,
    default: null
  },
  dir: {
    type: String,
    default: null
  }
})
const flog = ref<any | null>(props.log)
const udir = axios.getUri() + 'uploads'
onMounted(() => {

  if (flog.value) return
  axios.get('cameras/get_logs', { params: { id: props.id } })
    .then(res => {
      if (res.data.status == 'success') {
        flog.value = res.data.data[0]
      }
    })

})
</script>
<template>
  <div v-if="flog" id="log" class="v-flex c-c gp05rem  sdw1 bgcol">
    <div class="h-flex fe-c mxpw ">
      <FontAwesomeIcon @click="$emit('close')" :icon="['fas', 'xmark']" size="xl" />
    </div>
    <v_image :url="udir + flog.image_url" class="mb1" alt="" />
    <div class="li"><span>Camera Id</span><span>{{ flog.cam_id }}</span></div>
    <div class="li"><span>Time</span><span>{{ flog.created_at }}</span></div>
    <div class="li"><span>location</span><span>{{ flog.location }}</span></div>
    <div class="li"><span>Report</span><span>{{ flog.report }}</span></div>
    <div class="li"><span>Camera type</span><span>{{ flog.type }}</span></div>


  </div>
</template>
<style scoped>
#log {
  padding-inline: 1rem;
  padding-block: 2rem;
}

.li {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.3rem;
}

.li>:nth-child(1) {
  color: var(--color-text-light);

}

.li>:nth-child(2) {
  font-weight: 500;
}

.li>* {
  white-space: nowrap;
}
</style>