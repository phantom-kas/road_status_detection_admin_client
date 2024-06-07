<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { PropType } from 'vue'

interface dropoption {
  icon?: [string, string],
  label: string,
  emit?: [string, any]
  route?: { name: string, params?: {} }
}


interface main_btn_type {
  icon?: [string, string],
  label?: string,
}
const props = defineProps({
  content: {
    type: Array as PropType<dropoption[]>,
    required: true
  },
  main_btn: {
    type: Object as PropType<main_btn_type>,
    default: () => {
      return { icon: ['fas', 'ellipsis-vertical'] as [string, string], label: 'false' }
    }
  }
})
</script>
<template>
  <div class='dd_' data-dd>

    <slot name='icon'>
      <div data-dd-btn class='icon_wrp  v-flex c-c  cursor_pointer '>
        <font-awesome-icon v-if="main_btn.icon" :icon="main_btn.icon" class='nopoint' />
        <div v-else>
          {{ main_btn.label }}
        </div>
      </div>
    </slot>

    <div class="dd_menu sdw1 pos_abs rbg">
      <slot name='menu'>
        <div class='bg_col4  v-flex fs-fs fs1 gp05rem pil1 pt1 pb1 '>

          <template v-for="c, i in content" :key=i>
            <div @click="$emit(...c.emit)" v-if="!c.route && c.emit"
              class='mxpw no_wrap gp05rem h-flex fs-fs gp1  cursor_pointer '>
              <span>
                <font-awesome-icon v-if="c.icon" :icon="c.icon" />
              </span>
              <span>
                {{ c.label }}
              </span>
            </div>

            <router-link v-else-if="c.route" :to="c.route"
              class='mxpw gp05rem h-flex fs-fs gp1  no_wrap cursor_pointer '>
              <span>
                <font-awesome-icon v-if="c.icon" :icon="c.icon" />
              </span>
              <span>
                {{ c.label }}
              </span>
            </router-link>
          </template>
        </div>
      </slot>
    </div>
  </div>
</template>



<style scoped>
.dd_menu {
  color: var(--color-text);
}

.dd_ {
  position: relative;
  display: inline-block;
  /* z-index: 100; */
}

.rbg {
  background-color: var(--color-background);
}

.dd_menu {
  border-radius: 10px;

  position: absolute;
  transform: scale(1, 0.2) translate(0, -4rem);
  display: block;
  opacity: 0;
  pointer-events: none;
  z-index: 1;
  padding-inline: 1rem;
  transition: transform 0.3s, opacity 0.1s;

}

.dd_menu>div>*:hover {
  /* border-bottom: 2px solid var(--color1); */
  box-shadow: 0px 3px var(--color2);
  ;
}

.dd_active>.dd_menu {
  pointer-events: unset;
  display: block;
  opacity: 1;
  transform: translateY(0rem);
  transform: scale(1, 1) translate(0, 0rem);
}

.icon_wrp:active {
  background-color: var(--color2);
}

.dd_active {}

/* .menu{
  position: absolute;
} */
.icon_wrp {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  /* background-color: var(--col2); */
}

.icon_wrp {}

.dd_active {}

.dd_to_left>.dd_menu {
  right: 0px;
}

.dd_to_left_i>.dd_menu {
  right: 0px !important;
}

.dd_to_right>.dd_menu {
  left: 0px;
}

.dd_to_up {}

.dd_to_up>.dd_menu {
  transform-origin: bottom;
  bottom: 2rem;
}

.dd_to_down>.dd_menu {
  transform-origin: top;
}
</style>