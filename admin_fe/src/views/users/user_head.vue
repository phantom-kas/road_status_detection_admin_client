<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import type { userInfo } from '@/types';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const imgError = ref(false)
const user_info = ref<userInfo | null>(null)

onBeforeMount(() => {
  // window.alert(props.id)
  axios.get('users/get_users', { params: { uid: props.id } })
    .then(res => {
      user_info.value = res.data.data[0]
      if (user_info.value)
        user_info.value.img_dir = res.data.profile_img_url
    })

})
</script>
<template>
  <div v-if="user_info" class='v-flex mxpw fs-fs chead'>
    <!-- {{ user_info }} -->
    <div class="h-flex fs-c gp1rem bgmute sdw1">
      <div>
        <img v-if="!imgError" class="round ppimg" :src="user_info?.img_dir as string + user_info?.profile_img_url"
          @error="imgError = true">
        <font-awesome-icon v-else :icon="['far', 'circle-user']" size='6x' class="nopoint" />
      </div>

      <div v-if="user_info" class="v-flex-fs-fs-gp05rem">
        <div><span>First Name:</span> <span>{{ user_info.fname }}</span></div>
        <div><span>Last Name:</span> <span>{{ user_info.lname }}</span></div>
        <div><span>User Name:</span> <span>{{ user_info.user_name }}</span></div>
      </div>
    </div>

  </div>
</template>


<style scoped>
.chead>div {
  padding-inline: 1rem;
  padding-block: 0.5rem;
  border-radius: 20px;
}

.ppimg {
  width: 5rem;
}
</style>