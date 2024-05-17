<script setup lang="ts">
import day_night_switch from '@/components/day_night_switch.vue';
</script>
<template>
  <section class="mxpw mxph">
    <div class="h-flex pglr c-c gp2rem">

      <h1 class="fg1 ">Login</h1>

      <div clas="fg">
        <day_night_switch class="dn" />
      </div>

    </div>
    <div class="mxpw mxph fg">
      <router-view></router-view>
    </div>
  </section>
</template>


<style scoped>
.dn {}
</style>