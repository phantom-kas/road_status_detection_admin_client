<script setup lang='ts'>
// import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// const { userInfo } = useUserStore()
// const imgError = ref(false)
const props = defineProps({
  url: {
    type: String,
    required: false
  },
  camera_name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})
</script>
<template>
  <router-link :to="{ name: 'camera', params: { id } }"
    class=" cursor_pointer uicon h-flex  fs-c gp05rem hov_glow_col1">
    <!-- {{ userInfo.profile_img_url + url }} -->
    <!-- {{ imgError }} -->
    <!-- <div v-if="!imgError" class="avartar_img">
      <img @error="imgError = true" class="mxpw" :src="userInfo.profile_img_url + url" alt="">
    </div> -->
    <font-awesome-icon :icon="['fas', 'video']" size='xl' class="nopoint" />
    <div>
      {{ camera_name }}
    </div>
  </router-link>
</template>
<style scoped>
.uicon {
  width: 10rem;
  padding-inline: 0.5rem;
  padding-block: 0.2rem;
  border-radius: 10px;
}

.avartar_img {
  width: 50px;
  height: 50px;
  overflow: hidden;
  position: relative;
}

.avartar_img {
  border-radius: 50%;
}
</style>