<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import day_night_switch from './day_night_switch.vue'
import { ref } from 'vue'


const menuIsOpen = ref<boolean>(false)


const toggleMenu = () => {
  menuIsOpen.value = !menuIsOpen.value
}
</script>
<template>
  <div class='h-flex fs-fs mxph nav_bar' :class="{ 'open': menuIsOpen }">
    <div class='navbar_ccc sdw1 mxph'>

      <div class='mavbar_cc mavbar_cc1  '>
        <div class="fs-fs mxpw">
          <h4>L</h4>
        </div>

        <router-link :to="{ name: 'dashboard' }" class="nav_btn_c hv_ic_shw">
          <div><font-awesome-icon :icon="['fas', 'house']" /> </div>
          <span>Dashboard</span>
        </router-link>

        <router-link :to="{ name: 'cameras' }" class="nav_btn_c hv_ic_shw">
          <div><font-awesome-icon :icon="['fas', 'video']" /> </div>
          <span>Cameras</span>
        </router-link>


        <div class="nav_btn_c hv_ic_shw">
          <div><font-awesome-icon :icon="['fas', 'chevron-right']" /> </div>
          <span>Users</span>
        </div>


        <div class="nav_btn_c hv_ic_shw">
          <div><font-awesome-icon :icon="['fas', 'chevron-right']" /> </div>
          <span>Reports</span>
        </div>

      </div>


      <div class='mavbar_cc mb1 mavbar_cc2'>

        <div class="h-flex fs-c mxpw   hv_ic_shw cursor_pointer">

          <day_night_switch class="hd_no_hv" />
          <span>&nbsp;Theme</span>
        </div>

        <div class="nav_btn_c hv_ic_shw">
          <div><font-awesome-icon :icon="['fas', 'chevron-right']" /> </div>
          <span>Dashboard</span>
        </div>

      </div>
    </div>
    <div @click=toggleMenu :class="{ 'open': menuIsOpen }" class='cursor-pointer menubtn v-flex c-c'>
      <font-awesome-icon v-if="!menuIsOpen" :icon="['fas', 'chevron-right']" />

      <font-awesome-icon v-else :icon="['fas', 'chevron-left']" />
    </div>
  </div>
</template>


<style scoped>
.nav_bar {
  font-size: var(--fs_11);
}



.navbar_ccc {
  background-color: var(--color-background-soft);
  padding-inline: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.nav_btn_c {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  padding-block: 0.2em;
}

.hv_ic_shw {
  height: 1.4rem;
}

.nav_btn_c>div:first-child {
  width: 1.4rem;
  height: 1.4rem;
  background-color: var(--color-background);
  box-shadow: var(--sdw1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.mavbar_cc1,
.mavbar_cc2 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
}

.nav_btn_c>span {
  border-radius: 20px;
  height: 1.4rem;
}

.hv_ic_shw>span {
  width: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.2s;
  transform: translateY(0.4rem);
}

.hd_no_hv {
  width: 1.7rem;
  padding-block: 0.1rem;
}




.menubtn {
  background: var(--color-background-soft);
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 0px 50% 50% 0px;
  box-shadow: var(--sdw1);
}

.menubtn.open {
  background-color: var(--color1);
}

.nav_bar.open .hv_ic_shw>span,
.nav_bar.open .hd_no_hv {
  transform: translateY(0px);
  width: 5.5rem;
  text-align: left;
  opacity: 1;
  padding-block: 0.1rem;
}

.nav_bar.open .hd_no_hv {
  width: 1.7rem;
}

@media screen and (hover:hover) {

  .navbar_ccc:hover .hv_ic_shw>span,
  .navbar_ccc:hover .hd_no_hv {
    transform: translateY(0px);
    width: 5.5rem;
    text-align: left;
    opacity: 1;
    padding-block: 0.1rem;
  }

  .navbar_ccc:hover .hd_no_hv {
    width: 1.7rem;
  }

  .navbar_ccc:hover div:first-child {
    background: none;
    box-shadow: none;
  }

  .nav_btn_c:hover {
    background-color: var(--color1);
    border-radius: 5px;
    color: white;
    box-shadow: var(--sdw1);
  }
}

@media screen and (max-width: 425px) {
  .nav_bar {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .nav_bar>.navbar_ccc {
    width: 0;
    pointer-events: none;
    transform: translateX(-2rem);
    transition: transform 0.6s;
    opacity: 0;

  }

  .nav_bar.open>.navbar_ccc {
    width: unset;
    pointer-events: initial;
    transform: translateX(0rem);
    opacity: 1;
  }
}
</style>