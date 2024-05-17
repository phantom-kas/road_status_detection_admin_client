<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import spin1_loader from '@/components/spinners/spin1_loader.vue';
import spin2_loader from '@/components/spinners/spin2_loader.vue';
import { useLoaderStore } from '@/stores/loader';
import { useDarkMode } from '../stores/darkMode';

const dark = useDarkMode()

const loader = useLoaderStore();
</script>

<template>
  <main id="main" class="main" :class="{ 'dark': dark.isDark }">


    <router-view>

    </router-view>

    <div id='modals'></div>

  </main>


  <div v-show="loader.isLoading2">
    <div class="overlay v-flex c-c">
      <div class="p1 bgmute  v-flex c-c">
        <spin1_loader />
      </div>
    </div>
  </div>





  <div v-show="loader.isLoading">
    <div id='ld' class='h-flex locer c-c gp1rem'>
      <spin2_loader />
    </div>
  </div>


</template>

<style scoped>
main {
  width: 100%;
  min-height: 100%;
}

#ld {
  position: fixed;
  top: 2rem;
  left: 45vw;
  z-index: 1000;

}

#ld>div {
  color: white;
  padding: 0.4rem 1.5rem;
  border-radius: 5px;
}
</style>
