<script setup lang="ts">
import user_head from './user_head.vue'
import horizontal_navbar from '@/components/horizontal_navbar.vue';
import drop_wrap from '@/components/drop_wrap.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})




const removeOrAddPremission = (add: boolean, premission: string) => {
  let url: string
  if (add) {
    url = 'users/add_premission'
  }
  else {
    url = 'users/remove_premission'
  }


  axios.post(url, { uid: props.id, pid: premission })
  // .then(res => {
  //   // console.log(res)
  // })
}
</script>
<template>
  <section class='v-flex c-c pos_rel'>
    <user_head v-if="route.name != 'user_info'" :id />

    <horizontal_navbar class="mt1" :btns="[
      //   {
      //   name: 'Profile info',
      //   route: { name: 'camera' },
      //   is_route: true
      // },
      {
        name: 'Recent activity',
        route: { name: 'recent_activity' },
        is_route: true
      }
      ,
      {
        name: 'Premissions',
        route: { name: 'premissions' },
        is_route: true
      }
      ,
      {
        name: 'Edit userinfo',
        route: { name: 'edit_user' },
        is_route: true
      },
      {
        name: 'User info',
        route: { name: 'user_info' },
        is_route: true
      }

    ]" />


    <div class="mxpw">
      <router-view @update_premission="(e: [any, any]) => removeOrAddPremission(...e)"></router-view>
    </div>


  </section>
</template>
<style scoped></style>