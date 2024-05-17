<script setup lang="ts">
import { pageFiller } from '../stores/pageFillerStore'
import { onMounted } from 'vue'
import load_spin from '../components/spinners/load_spin.vue'

const pageContent = pageFiller()
const props = defineProps({
  url: {
    type: String,
    default: 'user/get_users'
  },
  params: {
    type: Object,
    default: () => { }
  },
  table_class: {
    type: String,
    default: ' mxpw tb1 '
  }
}
)

pageContent.mount()

onMounted(() => {

  pageContent.observAndFetch({ url: props.url, params: props.params });
})


</script>
<template>
  <div>


    <table :class="table_class">
      <slot name="table_header">
        <tr>
          <th>Head</th>
        </tr>
      </slot>
      <transition-group name="list">
        <tr class="cursor_pointer hov_glow" v-for="(content, i) in pageContent.pageContent" :key="content.id">
          <slot name="item" v-bind="{ item: content, index: i }">

          </slot>
        </tr>
      </transition-group>

    </table>
    <!-- {{ //pageContent.last_id
    }}
    {{ //pageContent.loadMore
    }} -->
    <span v-show="pageContent.loadMore" id="observe">
      <load_spin />
    </span>
  </div>

</template>



<style scoped></style>