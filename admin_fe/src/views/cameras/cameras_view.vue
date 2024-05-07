<script setup lang="ts">
import { ref } from 'vue'
import drop_wrap from '../../components/drop_wrap.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
  { name: 'dsadsa', id: '2' },
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
  <section class="max1200 v-flex fs-fs cam">

    <div class="h-flex c-c " @click="handleClick(c.id)" v-for="c, i in cams" :key="i">
      <router-link class="no_wrap" :to="{ name: 'camera' }">
        cam {{ i }}
      </router-link>
      <drop_wrap @bim="e => d(e)" @trash="e => t(e)" class="mxpw  dd_to_left col_blk" :content="[
        { label: 'hi', icon: ['fas', 'trash'], emit: ['bim', 'ligma'] },
        { label: 'trash', icon: ['fas', 'trash'], emit: ['trash', 'bob'] },
        { label: 'Todash', icon: ['fas', 'trash'], route: { name: 'dashboard' } },
      ]">

      </drop_wrap>
    </div>



  </section>
</template>


<style scoped>
.seccc>div {
  background-color: aqua;
}

.cam>a {
  padding-inline: 1rem;
}
</style>