<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue'

const imgError = ref(false)
const isLarg = ref(false)

const toggleLarge = () => isLarg.value = !isLarg.value
defineProps({
  url: {
    type: String
  },
  classes: {
    type: String,
    default: 'max500'
  }
})
</script>
<template>
  <div @click="toggleLarge" class="max500 cursor_pointer " :class="[classes, { 'islarg': isLarg }]">



    <div class="">
      <div v-show="isLarg" class="h-flex fe-c mxpw ">
        <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
      </div>
      <img v-if="!imgError" @error="imgError = true" class="mxpw" :src="url" alt="">

      <font-awesome-icon v-else :icon="['fas', 'file-circle-xmark']" size='10x' class="nopoint " :class=classes />

    </div>

  </div>
</template>
<style scoped>
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

.islarg>div {
  width: calc(100% - 5rem);
  margin-inline: auto;
  position: relative;
  z-index: 10;
}

.islarg>div>img {
  z-index: 10;
  position: relative;
}
</style>