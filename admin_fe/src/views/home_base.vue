<script setup lang="ts">
import input_component from "../components/form_components/input_component.vue";
import nav_bar from "../components/nav_bar.vue";
import { useRTStore } from '../stores/route.ts'

const rt = useRTStore()
</script>
<template>
  <div class='mxpw h-flex c-fs mxph'>

    <nav_bar />


    <div class=' mxpw  fg1  view'>
      <div class='h-flex mxpw fs-c pglr'>
        <h4 class='fs6' v-html="rt.getTitle"></h4>
      </div>
      <div id='body' class=" mxpw">
        <router-view class="overflow_scroll overflowx_hidden"></router-view>
      </div>
    </div>


  </div>
</template>
<style scoped>
.view {
  overflow: hidden;
  height: 100vh;
  height: 100dvh;
}

#body {
  height: calc(100% - 3rem);
}
</style>
