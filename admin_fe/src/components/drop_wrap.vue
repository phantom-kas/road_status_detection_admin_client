<script setup>
// import MouseTracker from './MouseTracker.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

</script>
<template>
  <div class='dd_' data-dd>

    <slot name='icon'>
      <div data-dd-btn class='icon_wrp v-flex c-c  cursor_pointer ripple'>
        <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" class='nopoint' />
      </div>
    </slot>

    <div class="dd_menu pos_abs rbg">
      <slot name='menu'>
        <div class=''>
          dadsasda
        </div>
        <div class=''>
          dadsasda
        </div>
        <div class=''>
          dadsasda
        </div>
      </slot>
    </div>
  </div>
</template>



<style scoped>
.dd_ {
  position: relative;
  display: inline-block;
  /* z-index: 100; */
}

.rbg {
  background-color: red;
}

.dd_menu {

  position: absolute;
  transform: scale(1, 0.2) translate(0, -4rem);
  display: block;
  opacity: 0;
  pointer-events: none;
  z-index: 1;

  transition: transform 0.3s, opacity 0.1s;

}

.dd_active>.dd_menu {
  pointer-events: unset;
  display: block;
  opacity: 1;
  transform: translateY(0rem);
  transform: scale(1, 1) translate(0, 0rem);
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