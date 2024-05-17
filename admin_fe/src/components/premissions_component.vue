<script setup lang='ts'>
import axios from 'axios';
import type { userPremission } from '@/types';
import { ref, onMounted } from 'vue'
import switch_component from './form_components/switch_component.vue';


const props = defineProps({
  id: {
    type: String
  }

})
const dbPremissions = ref<userPremission[] | null>(null)



onMounted(() => {
  axios.get('users/get_user_premissions', { params: { uid: props.id } })
    .then(res => {
      dbPremissions.value = res.data.data
    })
})


</script>
<template>
  <div class="mxpw">
    <h2>Premissions</h2>
    <div v-if="dbPremissions" class="h-flex mt1 fs-fs gp2rem fr premc">
      <div v-for="p, i in dbPremissions" :key="i">
        <span>{{ p?.premission }}</span>
        <switch_component :checked="p.user_id != null"
          @changed="e => $emit('update_premission', [e, p?.premission_id])" />
      </div>
    </div>
    <!-- {{
      dbPremissions
    }} -->
  </div>
</template>
<style scoped></style>