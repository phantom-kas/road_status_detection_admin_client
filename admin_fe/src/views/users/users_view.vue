<script setup lang="ts">
import { ref, onMounted } from 'vue'
import drop_wrap from '../../components/drop_wrap.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

type userobj = { lname: string, fname: string, id: string }
const users = ref<userobj[] | null>(
  [


  ])
const handleClick = (id: string) => {

}

const d = (p: any) => window.alert(p)
const t = (p: any) => window.alert(p)

onMounted(() => {
  axios.get('users/get_users')
    .then(res => {
      users.value = res.data.data
    })

})

defineEmits(['refreshparent'])
</script>
<template>
  <section class="max1200 v-flex fs-fs ">

    <div class="h-flex gp1rem sb-c mxpw hov_glow cam" @click="handleClick(c.id)" v-for="c, i in users" :key="i">
      <router-link @click="$emit('refreshparent', c.id);" class="no_wrap" :to="{ name: 'user', params: { id: c.id } }">
        {{ c.fname }} {{ c.lname }} {{ c.id }}
      </router-link>
      <drop_wrap @profile="e => d(e)" @trash="e => t(e)" class="  dd_to_left_i col_blk" :content="[
        { label: 'View profile', emit: ['profile', c.id] },
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