<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref, type PropType } from 'vue'

const imgError = ref(false)
const isLarg = ref(false)
const image = ref<HTMLImageElement | null>(null)
const toggleLarge = () => isLarg.value = !isLarg.value
const props = defineProps({
  url: {
    type: String
  },
  classes: {
    type: String,
    default: 'max500'
  },
  box: {
    type: Object as PropType<[number, number, number, number]>,
    default: () => { return null }
  }
})
const dim = ref<[number, number, number, number] | null>(null)

onMounted(() => {

  if (props.box) {
    dim.value = props.box
  }

})
const imageHeight = ref(0)
const imageWidth = ref(0)
const showBox = ref(false)
const getIMageDimensions = () => {
  if (image.value && !imgError.value) {
    console.log(image.value.naturalHeight)
    console.log(image.value.naturalWidth)
    imageHeight.value = image.value.naturalHeight
    imageWidth.value = image.value.naturalWidth
    showBox.value = true
  }
}

</script>
<template>
  <div @click="toggleLarge" class="max500 cursor_pointer " :class="[classes, { 'islarg': isLarg }]">



    <div class="p pos_rel ">
      <div v-show="isLarg" class="h-flex fe-c mxpw ">
        <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
      </div>
      <div v-if="!imgError" clas=" pos_rel c-c rbg image_container mxpw">
        <img ref="image" @load="getIMageDimensions" @error="imgError = true" class="mxpw" :src="url" alt="">
        <div v-if="dim && showBox" class="pos_abs  bb" :style="{
          left: `calc((${(dim[0] / imageWidth)} * 100%)`,
          top: `calc((${(dim[1] / imageHeight)} * 100%)`,
          height: `calc((${(dim[3] - dim[1]) / imageHeight}) * 100%)`,
          width: `calc((${(dim[2] - dim[0]) / imageWidth}) * 100%)`
        }">

        </div>
      </div>


      <font-awesome-icon v-else :icon="['fas', 'file-circle-xmark']" size='10x' class="nopoint " :class=classes />

    </div>

  </div>
</template>
<style scoped>
.image_container {
  display: flex;
}

.bb {
  border: 5px solid var(--color2);
  z-index: 100;
}

.islarg {
  position: fixed;
  top: 0px;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  z-index: 30;
  overflow: scroll;
  padding-inline: auto;
  background-color: rgba(0, 0, 0, 0.617);

}

.islarg>div>div.image_container {
  width: calc(100% - 5rem);
  margin-inline: auto;
  position: relative;
  z-index: 10;
}

.islarg>div>div>img {
  z-index: 10;
  position: relative;
}
</style>