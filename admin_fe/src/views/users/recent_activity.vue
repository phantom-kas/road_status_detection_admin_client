<script setup lang='ts'>
import table_list from '@/components/table_list.vue';
import user_avatar_icon from '@/components/icons/user_avatar_icon.vue';
import { useDateStore } from '../../stores/dateStore';

const url = 'users/get_recent_activites'
const tim = useDateStore();

const props = defineProps({
  id: String,
  default: null
})
</script>
<template>
  <section class="max1200  ">

    <table_list class='mxpw v-flex fs-c' :url="id ? url + '?uid=' + id : url" :table_class="'table max1000'">

      <template #table_header>
        <tr class='mxpw tb1 algn_l'>
          <th>
            User
          </th>
          <th>
            Activity
          </th>
          <th>
            Time
          </th>
        </tr>
        <span></span>
      </template>
      <template #item="{ item, index }">
        <td>
          <user_avatar_icon :url="'img.png'" username="dsadsa" />
        </td>

        <td>
          {{ item.title }}
        </td>
        <td>

          {{ tim.getLocalTime(item.created_at) }}
        </td>
      </template>
    </table_list>


  </section>
</template>
<style scoped></style>