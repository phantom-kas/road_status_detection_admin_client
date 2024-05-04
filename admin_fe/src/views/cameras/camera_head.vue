<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const imgError = ref(false)
</script>
<template>
  <div class='v-flex mxpw fs-fs chead'>
    <div class="h-flex fs-c gp1rem bgmute sdw1">
      <div>
        <img v-if="!imgError" src="" alt="" @error="imgError = true">
        <font-awesome-icon v-else :icon="['fas', 'video']" size='6x' class="nopoint" />
      </div>

      <div class="v-flex-fs-fs-gp05rem">
        <div><span>Name:</span> <span>Ligma</span></div>
        <div><span>Name:</span> <span>Ligma</span></div>
        <div><span>Name:</span> <span>Ligma</span></div>
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
</style>