<script setup lang='ts'>
import { useUserStore } from '../../stores/user.ts'
import { useDateStore } from '../../stores/dateStore';
import axios from 'axios'
import { onMounted, ref } from 'vue';
import type { userInfoType } from '@/types';

const { getLocalTime } = useDateStore()
const { profile_img_url, userInfo } = useUserStore()
const props = defineProps({
  id: {
    type: String,
    default: null
  }
})

const userData = ref<userInfoType | null>(null);

onMounted(() => {
  if (props.id == userInfo.id || props.id == null) {
    userData.value = userInfo;
    if (userData.value)
      userData.value.profile_img_url = profile_img_url
    return
  }
  axios.get('users/get_user_details', { params: { id: props.id } })
    .then(res => {
      userData.value = res.data.data[0];
      if (userData.value)
        userData.value.profile_img_url = res.data.img_url + res.data.data[0].profile_img_url
    })

})
</script>
<template>
  <div class="mxpw v-flex c-c">
    <div class="max1000 v-flex fs-c gp1rem">
      <div class="v-flex c-c mt2 ">
        <img class="image sdw1" :src="userData?.profile_img_url" alt="">
      </div>

      <div class="v-flex mxpw fs-c gp05rem p1 user_info_c fs5">
        <div><span>First Name:</span><span>{{ userData?.lname }}</span></div>
        <div><span>Last Name:</span><span>{{ userData?.fname }}</span></div>
        <div><span>UserName:</span><span>{{ userData?.user_name }}</span></div>
        <div><span>Created at:</span><span class="last">{{ getLocalTime(userInfo.created_at) }}</span></div>

        <!-- {{ userInfo }} -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.user_info_c {}

.image {
  border-radius: 50%;
}

.user_info_c>div>span {
  font-size: var(--fs3);
  width: 50%;
}

.user_info_c>div {
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.user_info_c>div>span:first-child {
  width: 50%;
  text-align: right;
  /* background-color: red; */
  display: inline-block;
  font-size: var(--fs1);
}

.last {
  font-size: var(--fs1) !important;
}
</style>