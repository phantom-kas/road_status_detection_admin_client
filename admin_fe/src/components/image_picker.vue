<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted, watch } from "vue"
import Cropper from 'cropperjs'
//import axios from "axios";
import { useLoaderStore } from "../stores/loader";
//import { useUserStore } from "../stores/user";
// import {useAlertStore} from "../stores/alerts";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const preview = ref(false)

const props = defineProps({
  uid: {
    type: String,
    default: ''
  },
  submitText: {
    type: String,
    default: 'Submit'
  },
  image: {
    type: Object,
    default: null
  },
  index: {
    type: Number,
    default: null
  }
})




const emit = defineEmits(['crop', 'rm'])


const loaderStore = useLoaderStore();
// const userStore = useUserStore();
// const useAlerts = useAlertStore();

const selectedFile = ref<any>(null);
const imageInput = ref<HTMLInputElement | null>(null);
const imageSrc = ref<string | ArrayBuffer | null | undefined>(null);
const img = ref<HTMLImageElement | null>(null)
const fileReader = new FileReader();
let cropper: Cropper | null = null;

fileReader.onload = (event) => {
  imageSrc.value = event?.target?.result;
}


const fileChange = (e: Event | DragEvent) => {
  const files = (e.target as HTMLInputElement).files || (e as DragEvent).dataTransfer?.files;
  if (files?.length) {
    selectedFile.value = files[0]
  }
}


const finalImg = ref<any | null>(null);
const ImgData = ref<any | null>(null)
const handelCrop = () => {
  loaderStore.start();
  cropper?.getCroppedCanvas({
    width: 250,
    height: 250,
    imageSmoothingQuality: 'high'
  }).toBlob((blob: any) => {
    loaderStore.stop();
    ImgData.value = { "img": blob, index: props.index }

    // console.log(blob)
    emit('crop', ImgData.value)
  }, "image/jpeg");

}

const cropImage = () => {
  loaderStore.start();
  cropper?.getCroppedCanvas({
    width: 250,
    height: 250,
    imageSmoothingQuality: 'high'
  }).toBlob((blob: any) => {
    loaderStore.stop();
    ImgData.value = { "img": blob }

    console.log(blob)

  }, "image/jpeg");

}

const handlepreview = async () => {
  loaderStore.start();
  cropper?.getCroppedCanvas({
    width: 250,
    height: 250,
    imageSmoothingQuality: 'high'
  }).toBlob((blob) => {
    loaderStore.stop();
    ImgData.value = { "img": blob }
    preview.value = true

    finalImg.value = URL.createObjectURL(blob as Blob);

  }, "image/jpeg");


  //   preview.value = true
  //   cropImage().then((res)=>{
  //     console.log('Res'+res)
  //   console.log(cropper)
  //  console.log(res)
  //   })

}



watchEffect(() => {
  if (selectedFile.value) {
    fileReader.readAsDataURL(selectedFile.value);
  } else {
    imageSrc.value = null
  }
})

watch(imageSrc, () => {
  if (imageSrc.value) {
    cropper?.replace(imageSrc.value as string)
  }
}, { flush: 'post' })

onMounted(() => {
  cropper = new Cropper(img.value as HTMLImageElement, {
    aspectRatio: 1,
    minCropBoxHeight: 200,
    minContainerWidth: 200,
    viewMode: 1,
    dragMode: 'move',
    background: false,
    cropBoxMovable: true,
    cropBoxResizable: true
  })
  if (props.image) {
    selectedFile.value = props.image
    console.log(props.image)
  }
})

onUnmounted(() => {
  cropper?.destroy();
})
const clearFile = () => {
  selectedFile.value = null
  cropper?.destroy();
  emit('rm', { index: props.index })
}
</script>

<template>
  <section class=' pglr mxpw sec v-flex fs-c' style="padding-top: 2rem;">
    <div v-show="imageSrc" class='crop_img_c' style="overflow: hidden;">
      <img ref="img" class='' :src="imageSrc as string" alt="">
    </div>
    <div class="h-flex c-c gp05rem fr  gp05rem mt1 fs2 bold500">
      <button type='button' v-if="!imageSrc" @click="imageInput?.click()"
        class='p12 bbtn col_white  br10 sdw1  fs4 bold500 cursor_pointer '>
        Select image
      </button>
      <button type='button' v-else @click="handelCrop()"
        class='p12  bg_secondary br10 ripple col_white sdw1  fs4 bold500' v-html="submitText">

      </button>
      <button type='button' class='p12 sdw1 no_wrap bg_red br10 sdw1 col_white fs4 bold500' @click="clearFile()">
        Clear <FontAwesomeIcon :icon="['fas', 'trash']"></FontAwesomeIcon>
      </button>
      <button @click="handlepreview()" class='bg_primary p12 sdw1 ripple fs4 bold500' type='button' v-if="imageSrc">
        Preview
      </button>
      <input type="file" ref="imageInput" @change="fileChange($event)" accept=".jpg,.jprg,.png"
        :style="{ display: 'none' }" />
    </div>
    <div v-if="selectedFile">
      Selected Filename:{{ selectedFile.name }}
    </div>
    <div v-else>
      No file selected
    </div>


  </section>
  <Teleport v-if="preview" to="#modals">
    <div class='overlay' @click="preview = false">
      <div class='mxpw mxph h-flex c-c'>
        <div @click.stop="" class='p1 pglr  br5 bgsoft  gp1rem max1000'>
          <div class='mxpw h-flex fe-c'>
            <font-awesome-icon @click="preview = false" class='error' :icon="['fas', 'xmark']" size="2xl" />
          </div>
          <div class="v-flex mxpw c-c fs3 pt2 pb1">
            <img :src="finalImg" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.upload:before {
  content: "\21EE";
  position: relative;
  margin-right: 0.3rem;
}

.crop_img_c {
  height: calc(100vh - 500px);
}

.crop_img_c {
  width: 100%;
}

.crop_img_c>img {
  max-width: 100%;
  max-height: 100%;
  margin-inline: auto;
  object-fit: fill;
}

@media screen and (max-width:700px) {
  .crop_img_c {
    height: calc(100vh - 300px);
  }
}

.bg_secondary {
  background: var(--color2);
}

.bg_primary {
  background: var(--color1);
}
</style>4