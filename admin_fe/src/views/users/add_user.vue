<script setup lang='ts'>
import input_component from '@/components/form_components/input_component.vue';
import image_picker from '@/components/image_picker.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import switch_component from '@/components/form_components/switch_component.vue'
import overlay_modal from '@/components/overlay_modal.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios';
import type { userForm, dbPremission } from '@/types';


const showSelectImgGal = ref(false)
const imageError = ref(false)

const selectedImgInGalary = ref<any>(null)
const profileImage = ref()
const premissions = ref<string[]>([])
const dbPremissions = ref<dbPremission[] | null>(null)

const handleImgeCropGalaryImage = (e: any) => {
  // profileImage.value = 
  // console.log(e.img)
  selectedImgInGalary.value = e.img
  formData.value.image = e.img
  profileImage.value = URL.createObjectURL(e.img)
  imageError.value = false
  showSelectImgGal.value = false
}

const formData = ref<userForm>({})

const handleSubmit = () => {
  //window.alert('dsadsa')

  axios.post('users/register_user', { ...formData.value, permissions: premissions.value }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      console.log(res)
    })

}

const removeOrAddPremission = (add: boolean, premission: string) => {

  let index: number = premissions.value.indexOf(premission)
  console.log(premissions.value)

  if (add) {
    if (index == -1) {
      premissions.value.push(premission)
    }

    return
  }

  if (index != -1) {
    premissions.value.splice(index, 1)

    return
  }
}

onMounted(() => {
  axios.get('users/get_premissions')
    .then(res => {
      dbPremissions.value = res.data.data
    })

})
</script>
<template>
  <section class="pb100 mxpw ">
    <form @submit.prevent="handleSubmit()" class="h-flex mt2 c-fs gp2rem pglr fr mglra max1200 ">

      <div class="img v-flex fs-c ">

        <h2 class="mxpw algn_l mb2">Personal Info </h2>
        <!-- {{ formData }}
        dsadas -->


        <div v-if="imageError === false && profileImage" class="avartar_img">
          <img @error="imageError = true" class="mxpw round sdw1" :src="profileImage" alt="user">
        </div>
        <FontAwesomeIcon v-else :icon="['fas', 'user']" size="8x" />





        <div class="mxpw mt1 h-flex c-c gp1rem">
          <button type="button" v-if="!profileImage" @click="showSelectImgGal = true"
            class="bgmute pbtn round1 hov_glow">
            <font-awesome-icon :icon="['fas', 'camera']" size="xl" />
          </button>

          <button type="button" v-else @click="showSelectImgGal = true" class="bgmute pbtn round1 hov_glow">
            <font-awesome-icon :icon="['fas', 'pencil']" size="xl" />
          </button>
        </div>
      </div>
      <div class="v-flex fg1 fs-sb  pos_rel  sitxt  gp1rem sb-c">
        <h2 class="mxpw algn_l">Personal Info</h2>
        <input_component @inputed="(e) => { formData.fname = e.value }" class='mxpw' label="First Name" name="fname" />
        <input_component @inputed="e => formData.lname = e.value" class='mxpw' label="Last Name" name="lname" />
        <input_component @inputed="e => formData.user_name = e.value" class='mxpw' label="User Name" name="user_name" />
        <input_component @inputed="e => formData.password = e.value" class='mxpw' label="Password" name="pass" />
      </div>
      <div class=" fss premcc ">
        <h2>Premissions</h2>
        <div class="h-flex mt1 fs-fs gp2rem fr premc">
          <div v-for="p, i in dbPremissions" :key="i">
            <span>{{ p?.premission }}</span>
            <switch_component @changed="e => removeOrAddPremission(e, p?.id)" />
          </div>

        </div>


      </div>
      <div class="mxpw  h-flex fs-c bb">
        <button class="pbtn hov_glow bgvcol1 round1 fs3 mt1 max200">
          Submit
        </button>
      </div>
      <!-- <image_picker /> -->
    </form>

  </section>

  <overlay_modal v-if="showSelectImgGal" prop-c-lasses="max1200" @close="showSelectImgGal = false">
    <image_picker :index="0" :image="selectedImgInGalary" @crop="e => handleImgeCropGalaryImage(e)" class='max500' />

  </overlay_modal>
</template>
<style scoped>
.sitxt {
  width: 5rem;
}

.premc {
  width: 30rem;
}

.premc>div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

@media screen and (max-width:1093px) {
  .premcc {
    width: 100%;
  }

}

@media screen and (max-width:555px) {
  .sitxt {
    width: 100%;
  }

  .premc {
    width: 100%;
  }

  .bb>button {
    width: 100%;
  }
}
</style>