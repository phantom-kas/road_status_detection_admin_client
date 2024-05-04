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
  ]

)
const handleClick = (id: string) => {

}
</script>
<template>
  <section class="max1200 v-flex fs-fs cam">

    <div class="h-flex c-c gp5rem" @click="handleClick(c.id)" v-for="c, i in cams" :key="i">
      <router-link class="no_wrap" :to="{ name: 'camera' }">
        cam {{ i }}
      </router-link>
      <drop_wrap class="mxpw  dd_to_left col_blk">
        <template #menu>
          <div class='bg_col4 sdw1 v-flex fs-fs fs2 gp05rem pil1 pt1 pb1 '>
            <div class='mxpw gp05rem h-flex fs-fs gp1  cursor_pointer '>
              <span>
                <font-awesome-icon :icon="['fas', 'trash-can']" />
              </span>
              <span>
                Delete
              </span>
            </div>
            <div class='mxpw gp05rem h-flex fs-fs gp1 cursor_pointer '>
              <span>
                <font-awesome-icon :icon="['fas', 'pencil']" />
              </span>
              <span class='no_wrap'>
                Edit week name
              </span>
            </div>
          </div>
        </template>
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