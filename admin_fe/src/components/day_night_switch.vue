<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { useDarkMode } from '../stores/darkMode';
const dark = useDarkMode()
</script>
<template>
  <div @click="dark.toggle()" title='toogle night mode' class='cursor_pointer h-flex fs-fs drakbtn'>
    <font-awesome-icon v-if='dark.isDark' :icon="['fa', 'moon']" class='dnn_icon moon' />
    <font-awesome-icon v-else :icon="['fas', 'sun']" class='dnn_icon sun' />
  </div>
</template>



<style scoped>
.drakbtn {
  width: 40px;
  padding: 0.3rem;
  background-color: var(--color-background);
  position: relative;
  border-radius: 20px;
  border: 0.5px solid var(--color-text)
}

.dnn_icon {
  position: relative;
  top: 0%;

}

.moon {
  margin-left: auto;
  animation: 0.3s ease-out 0s 1 anim1;
}

.sun {
  animation: 0.3s ease-out 0s 1 anim2;
}


@keyframes anim1 {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0%);
  }
}

@keyframes anim2 {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0%);
  }
}
</style>