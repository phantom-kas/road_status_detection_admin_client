<script setup lang="ts">
import { ref } from 'vue'
import drop_wrap from '../../components/drop_wrap.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import camera_avater_icon from '@/components/icons/camera_avater_icon.vue';

type camobj = { name: string, id: string }
const cams = ref<camobj[]>(
  [{ name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },


  ])
const handleClick = (id: string) => {

}

const d = (p: any) => window.alert(p)
const t = (p: any) => window.alert(p)
</script>
<template>
  <section class="max1200 v-flex fs-fs ">

    <div class="h-flex gp1rem sb-c mxpw hov_glow cam" @click="handleClick(c.id)" v-for="c, i in cams" :key="i">
      <!-- <router-link class="no_wrap" :to="{ name: 'camera', params: { id: 1 } }">
        cam {{ i }}
      </router-link> -->

      <camera_avater_icon :id="'1'" :camera_name="'cam ' + i" />
      <drop_wrap @bim="e => d(e)" @trash="e => t(e)" class="  dd_to_left_i col_blk" :content="[
        { label: 'hi', icon: ['fas', 'trash'], emit: ['bim', 'ligma'] },
        { label: 'trash', icon: ['fas', 'trash'], emit: ['trash', 'bob'] },
        { label: 'Todash', icon: ['fas', 'trash'], route: { name: 'dashboard' } },]">

      </drop_wrap>
    </div>



  </section>
</template>


<style scoped>
.seccc>a {
  background-color: aqua;
  padding-inline: 0.5rem;
}

.cam>a {
  padding-inline: 0.5rem;
}
</style>