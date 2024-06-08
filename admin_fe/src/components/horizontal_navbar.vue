<script setup lang="ts">
import type { PropType } from 'vue'
import { useRoute } from 'vue-router';

interface horizontal_nav_props {
  name: string,
  route: { name: string, params?: {} },
  is_route?: boolean,
  emit_name?: String,
}
const props = defineProps({
  btns: {
    type: Array as PropType<horizontal_nav_props[]>,
    required: true
  },
  sticky: {
    type: Boolean,
    required: false
  }

})
</script>
<template>
  <div class="h-flex mxpw fs-fs  gp05rem pos_rel pos_sticky bg2 z1">

    <div class='horizontal_nav_cc lh1' v-for="n, i in btns" :key="i">

      <router-link class=' cursor_pointer v-flex c-c' v-if="n.is_route" :to="n.route">
        {{ n.name }}
      </router-link>
      <div class=' cursor_pointer v-flex c-c' v-else @click="$emit('emit_name')">
        {{ n.name }}
      </div>
    </div>
  </div>

</template>



<style scoped>
.horizontal_nav_cc>* {
  height: 2rem;

  padding-inline: 0.5rem;
  padding-block: 0.2rem;
  position: relative;
  border-radius: 5px;
}

.horizontal_nav_cc::after,
.horizontal_nav_cc>*::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
}

.horizontal_nav_cc::after {
  height: 3px;
  border-radius: 0.5px;

  border-bottom: 1px solid var(--color-text);
  ;
  z-index: 1;
}

.horizontal_nav_cc>*::after {
  height: 3px;
  border-radius: 5px;
  z-index: 2;
}

.horizontal_nav_cc>* {
  color: var(--color-text) !important;
}

.horizontal_nav_cc:hover>*::after {
  background-color: var(--color1);
}

.horizontal_nav_cc:hover>* {
  color: var(--color-text);
  background-color: var(--color-background-mute);
}

a.router-link-exact-active {
  background-color: var(--color-background-soft);
  color: var(--color2-soft) !important;
  font-weight: 900;
}
</style>