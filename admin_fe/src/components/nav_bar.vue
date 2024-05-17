<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import day_night_switch from './day_night_switch.vue'
import { ref } from 'vue'
import drop_wrap from './drop_wrap.vue'

const menuIsOpen = ref<boolean>(false)


const toggleMenu = () => {
  menuIsOpen.value = !menuIsOpen.value
}



const profile_info = ref<{ img_url: string, _imgError?: boolean }>({
  img_url: 'dsadas'
})
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



        <router-link :to="{ name: 'users' }" class="nav_btn_c hv_ic_shw">
          <div><font-awesome-icon :icon="['fas', 'users']" /> </div>
          <span>Users</span>
        </router-link>


        <div class="nav_btn_c hv_ic_shw">
          <div><font-awesome-icon :icon="['far', 'file']" /> </div>
          <span>Reports</span>
        </div>

        <drop_wrap class="mxpw deop  dd_to_left col_blk" :content="[
          { label: 'Add Camera', icon: ['fas', 'video'], route: { name: 'login' } },
          { label: 'Add User', icon: ['fas', 'user'], route: { name: 'add_user' } },
        ]">


          <template #icon>
            <div data-dd-btn class='cursor_pointer mxpw  no_wrap'>


              <div class="nav_btn_c hv_ic_shw no_point">
                <div>

                  <font-awesome-icon :icon="['fas', 'plus']" size="xl" />
                </div>
                <span>Add</span>
              </div>
            </div>

          </template>
        </drop_wrap>

      </div>


      <div class='mavbar_cc mb1 mavbar_cc2'>

        <div class="h-flex fs-c mxpw   hv_ic_shw cursor_pointer">

          <day_night_switch class="hd_no_hv" />
          <span>&nbsp;Theme</span>
        </div>

        <!-- <div class="nav_btn_c hv_ic_shw gp1rem ">
          <div>
            <img v-if="!profile_info._imgError" :src="profile_info.img_url" alt=""
              @error="profile_info._imgError = true">
            <font-awesome-icon v-else :icon="['far', 'circle-user']" size="xl" />
          </div>
          <div class="h-flex sb-c  hide_txt">
            User
            <drop_wrap class="mxpw deop  dd_to_left col_blk" :content="[
              { label: 'Sign Out', icon: ['fas', 'arrow-right-from-bracket'], route: { name: 'login' } },]">


              <template #icon>
                <div data-dd-btn class='cursor_pointer'>
                  <font-awesome-icon :icon="['fas', 'user']" class='nopoint' />
                </div>
              </template>
</drop_wrap>
</div>
</div> -->

        <drop_wrap class="mxpw deop  dd_to_left col_blk" :content="[
          { label: 'Sign Out', icon: ['fas', 'arrow-right-from-bracket'], route: { name: 'login' } },]">


          <template #icon>
            <div data-dd-btn class='cursor_pointer mxpw  no_wrap'>


              <div class="nav_btn_c hv_ic_shw no_point">
                <div>
                  <img v-if="!profile_info._imgError" :src="profile_info.img_url" alt=""
                    @error="profile_info._imgError = true">
                  <font-awesome-icon v-else :icon="['far', 'circle-user']" size="xl" />
                </div>
                <span>User</span>
              </div>
            </div>

          </template>
        </drop_wrap>



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

/* * {
  z-index: 1;
  opacity: 0.5;
}

.deop,
.deop * {
  z-index: auto;
  overflow: 1;
} */

.navbar_ccc {
  background-color: var(--color-background-2);
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
  background-color: var(--color-background-soft);
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

.nav_btn_c>span,
.nav_btn_c>.hide_txt {
  border-radius: 20px;
  height: 1.4rem;
}






.hv_ic_shw>span,
.hv_ic_shw>.hide_txt {
  width: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.2s;
  transform: translateY(0.4rem);
}

.nav_btn_c>.hide_txt {
  overflow: unset;

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
.nav_bar.open .hv_ic_shw>.hide_txt,
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
  .navbar_ccc:hover .hv_ic_shw>.hide_txt,
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

.navbar_ccc.open .nav_btn_c>div:first-child {
  background: none;
  box-shadow: none;

}
</style>