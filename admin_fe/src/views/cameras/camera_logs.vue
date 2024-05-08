<script setup lang='ts'>
import table_list from '@/components/table_list.vue';
import user_avatar_icon from '@/components/icons/user_avatar_icon.vue';
import { useDateStore } from '../../stores/dateStore';
import camera_avater_icon from '@/components/icons/camera_avater_icon.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const url = 'cameras/get_logs'
const tim = useDateStore();
const router = useRouter()

const props = defineProps({
  id: String,
  default: null
})
const emit = defineEmits(['log'])

const is_showing_log = ref(false);

const showlog = (item: any) => {
  emit('log', item)
  router.push({ name: 'logs', params: { lid: item.id } })
}
</script>
<template>
  <section class="max1200  ">

    <table_list class='mxpw v-flex fs-c' :url="id ? url + '?cid=' + id : url" :table_class="'table max1000'">

      <template #table_header>
        <tr class='mxpw tb1 algn_l'>
          <th>
            Camera
          </th>
          <th>
            Report
          </th>
          <th>
            Location
          </th>
          <th>
            Time
          </th>
        </tr>
        <span></span>
      </template>
      <template #item="{ item, index }">
        <td @click=showlog(item)>
          <!-- <user_avatar_icon :url="'img.png'" username="dsadsa" /> -->

          <camera_avater_icon @click.stop.prevent :id="item.cam_id" :camera_name="'cam ' + item.cam_id" />
        </td>

        <td @click=showlog(item)>
          {{ item.report }}
        </td>
        <td @click=showlog(item)>
          {{ item.location }}
        </td>
        <td @click=showlog(item)>

          {{ tim.getLocalTime(item.created_at) }}
        </td>
      </template>
    </table_list>


  </section>
</template>
<style scoped></style>