<script setup lang="ts">
import day_night_switch from '@/components/day_night_switch.vue';
</script>
<template>
  <section class="mxpw mxph">
    <div class="h-flex c-c gp2rem">
      <h1>Login</h1>
      <day_night_switch class="dn" />
    </div>
    <div class="mxpw mxph ">
      <router-view></router-view>
    </div>
  </section>
</template>


<style scoped>
.dn {}
</style>