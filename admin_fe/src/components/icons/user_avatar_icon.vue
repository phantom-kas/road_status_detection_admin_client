<script setup lang='ts'>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const { profile_img_url_root } = useUserStore()
const imgError = ref(false)
const props = defineProps({
  url: {
    type: String
  },
  username: {
    type: String
  }
})
</script>
<template>
  <div class=" cursor_pointer uicon h-flex  fs-c gp05rem hov_glow_col1">
    {{ }}
    <!-- {{ imgError }} -->
    <div v-if="!imgError" class="avartar_img">
      <img v-if="url" @error="imgError = true" class="mxpw" :src="profile_img_url_root + url" alt="">
    </div>
    <font-awesome-icon v-else :icon="['far', 'circle-user']" size='xl' class="nopoint" />
    <div>
      {{ username }}
    </div>
    <!-- {{ profile_img_url_root + url }} -->

  </div>
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