<script setup lang='ts'>
import { ref, onMounted, type Ref } from 'vue';
import input_component from './input_component.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import overlay_modal from '../overlay_modal.vue';
import image_picker from '../image_picker.vue';
import axios from 'axios';
import type { userInfo } from '@/types';
import c_button from '../buttons/c_button.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

interface formDataType {
  fname?: string;
  lname?: string;
  image?: any;
  user_name?: string
}
const user_Info = ref<userInfo | null>(null);
const imageError = ref(false)
const showSelectImgGal = ref(false)
const profileImage = ref()
const formData = ref<
  formDataType>({})
const selectedImgInGalary = ref()
const imgDir = ref();

onMounted(() => {
  axios.get('users/get_users', { params: { uid: props.id } })
    .then(res => {

      user_Info.value = res.data.data[0]
      profileImage.value = res.data.profile_img_url + res.data.data[0].profile_img_url
    })
  // .catch(err => {
  //   console.error(err);
  // })
})
const handleImgeCropGalaryImage = (e: any) => {
  selectedImgInGalary.value = e.img
  //formData.value.image = e.img
  profileImage.value = URL.createObjectURL(e.img)
  imageError.value = false
  showSelectImgGal.value = false
  // window.alert('Hello world')

  axios.post('users/update_profile_image', { uid: props.id, 'file-input': e.img }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      console.log(res)
    })

}

const handleSubmit = () => {
  // window.alert('Hello world')
  axios.post('users/update_user_info', { ...formData.value, uid: props.id }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  // .then(res => {
  //   console.log(res)
  // })

}
</script>
<template>
  <form v-if="user_Info" @submit.prevent="handleSubmit()" class="pb100">
    <div class="img mt3 v-flex fs-c ">

      <h2 class="mxpw algn_l mb2">Profile picture </h2>


      <!-- {{ imgDir + user_Info.profile_img_url }} -->

      <div v-if="imageError == false" class="avartar_img">
        <img @error="imageError = true" class="mxpw round sdw1" :src="profileImage" alt="user">
      </div>
      <FontAwesomeIcon v-else :icon="['fas', 'user']" size="8x" />





      <div class="mxpw mt1 h-flex c-c gp1rem">
        <button type="button" v-if="!profileImage" @click="showSelectImgGal = true" class="bgmute pbtn round1 hov_glow">
          <font-awesome-icon :icon="['fas', 'camera']" size="xl" />
        </button>

        <button type="button" v-else @click="showSelectImgGal = true" class="bgmute pbtn round1 hov_glow">
          <font-awesome-icon :icon="['fas', 'pencil']" size="xl" />
        </button>
      </div>
    </div>
    <div class="v-flex fg1 fs-sb  pos_rel  sitxt  gp1rem sb-c">
      <h2 class="mxpw algn_l">Personal Info</h2>
      <input_component :val="user_Info?.fname" @inputed="(e) => { formData.fname = e.value }" class='mxpw'
        label="First Name" name="fname" />
      <input_component :val="user_Info?.lname" @inputed="e => formData.lname = e.value" class='mxpw' label="Last Name"
        name="lname" />
      <input_component :val="user_Info?.user_name" @inputed="e => formData.user_name = e.value" class='mxpw'
        label="User Name" name="user_name" />
      <!-- <input_component :val="user_Info?." @inputed="e => formData.password = e.value" class='mxpw' label="Password" name="pass" /> -->

      <div class="mxpw v-flex c-c">
        <c_button type="submit" text="Submit" class="bgc1 glow_on_hover max200" />
      </div>
      <!-- {{ formData }} -->
    </div>
    <overlay_modal v-if="showSelectImgGal" prop-c-lasses="max1200" @close="showSelectImgGal = false">
      <image_picker :index="0" :image="selectedImgInGalary" @crop="e => handleImgeCropGalaryImage(e)" class='max500' />

    </overlay_modal>
  </form>

</template>
<style scoped></style>