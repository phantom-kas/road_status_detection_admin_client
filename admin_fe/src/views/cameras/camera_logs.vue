<script setup lang='ts'>
import table_list from '@/components/table_list.vue';
import user_avatar_icon from '@/components/icons/user_avatar_icon.vue';
import { useDateStore } from '../../stores/dateStore';
import camera_avater_icon from '@/components/icons/camera_avater_icon.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import overlay_modal from '@/components/overlay_modal.vue';
import input_component from '@/components/form_components/input_component.vue';
import c_button from '@/components/buttons/c_button.vue';
import type { ModelClassesType } from '@/types';
import axios from 'axios'
import Filter_component from '@/components/filter_component.vue'
const filterMenuIsShow = ref(false)
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
  if (props.id)
    router.push({ name: 'logs', params: { lid: item.id } })
}

const filters = ref<{ period?: string, classes: ModelClassesType[], date_from?: string, date_to?: string }>({ classes: [] })
const key = ref(0)
const classes = ref<ModelClassesType[]>([
  {
    class: 'car',
    report_id: '6'
  },
  {
    class: 'crack',
    report_id: '1'
  },
  {
    class: 'man',
    report_id: '2'
  }, {
    class: 'tree',
    report_id: '3'
  }, {
    class: 'bic',
    report_id: '9'
  }, {
    class: 'lamp',
    report_id: '4'
  }, {
    class: 'aniaml',
    report_id: '5'
  }])


const handleFilterClass = (c: ModelClassesType) => {
  if (c.selected) {
    c.selected = false
    let i = filters.value.classes.findIndex((e) => e.class == c.class)
    filters.value.classes.splice(i, 1)
  }

  else {
    c.selected = true
    filters.value.classes?.push(c)
  }
  console.log(filters.value.classes)

}

onMounted(() => {
  axios.get('cameras/get_classes?model_id=2')
    .then(res => {
      classes.value = res.data.data
    })

})

const handleTimePeriopChange = (p: string) => {
  filters.value.period = p
  key.value++
}


const handleFilter = (f: { period?: string | undefined; classes: { class: string; selected?: boolean | undefined; report_id: string; }[]; date_from?: string | undefined; date_to?: string | undefined; }) => {
  filters.value = f
  key.value = key.value + 1;
}
</script>
<template>
  <section class="max1200  ">


    <!-- <div class="h-flex fr fs-c gp1rem pt1 pb1 ff">
      <button @click="handleTimePeriopChange('today')"
        class="today bgmute hov_glow cursor_pointer pbtn round1">Today</button>
    
      <button @click="handleTimePeriopChange('this_week')" class="today bgmute hov_glow cursor_pointer pbtn round1">This
        week</button>
      <button @click="handleTimePeriopChange('this_month')"
        class="today bgmute hov_glow cursor_pointer pbtn round1">This month</button>
      <button @click="handleTimePeriopChange('this_year')" class="today bgmute hov_glow cursor_pointer pbtn round1">This
        year</button>
      <button @click="() => { filters = { classes: [] }; key++ }"
        class="today bgmute hov_glow cursor_pointer pbtn round1">Clear
        filters</button>
      <button @click="filterMenuIsShow = true" class="today bgmute hov_glow cursor_pointer pbtn round1 no_wrap">More
        filters <font-awesome-icon :icon="['fas', 'sliders']" /></button>
    </div> -->
    <Filter_component @filter="e => handleFilter(e)" />
    <table_list :key class='mxpw v-flex fs-c' :params="filters" :url="id ? url + '?cid=' + id : url"
      :table_class="'table max1000'">

      <template #table_header>
        <tr class='mxpw tb1 algn_l'>
          <th class="row1">
            Camera
          </th>
          <th>
            Class
          </th>
          <th class="row3">
            Location
          </th>
          <th>
            Time
          </th>
        </tr>
        <span></span>
      </template>
      <template #item="{ item, index }">
        <td @click=showlog(item) class="row1">
          <!-- <user_avatar_icon :url="'img.png'" username="dsadsa" /> -->

          <camera_avater_icon @click.stop.prevent :id="item.cam_id" :camera_name="'cam ' + item.cam_id" />
        </td>

        <td @click=showlog(item)>
          {{ item.report }}
          <!-- {{ item.report_id }} -->
        </td>
        <td @click=showlog(item) class="row3">
          <span>
            {{ item.location }}
          </span>
        </td>
        <td @click=showlog(item)>

          {{ tim.getLocalTime(item.created_at) }}
        </td>
      </template>
    </table_list>


    <!-- <overlay_modal title="Search Filters" v-if="filterMenuIsShow" prop-c-lasses="max500 filters_wrapper"
      @close="filterMenuIsShow = false">
      <div class="h-flex fr mt1 fs-c gp2rem">
        <div class="v-flex mxpw fss gp1rem ">
          <span class="mxpw fs3 bold500 ">
            Classes {{ filters.classes.length }}
          </span>
          <input_component :val="filters.date_from" @inputed="e => filters.date_from = e.value" tp="date"
            name="data_from" class="round1 mxpw" label="Date from" />
          <input_component :val="filters.date_to" @inputed="e => filters.date_to = e.value" tp="date" name="data_to"
            class="round1 fg1 " label="Date to" />
        </div>
        <div class="v-flex  fr fs-fs fss">
          <span class="mxpw  fs3 bold500">
            Classes
          </span>
          <div class="h-flex fr fs-fs gp1rem">
            <span @click="handleFilterClass(c, i)" class="pbtn  round1 hov_glow_col1 cursor_pointer bg2 sdw1"
              :class="{ 'bgselected': c.selected }" v-for="c, i in classes" :key="i">
              {{ c.class }}
            </span>
          </div>
        </div>
        <div class="mxpw ">
          <c_button @click="key++, filterMenuIsShow = false" text="Search" class="bgc1 mxpw glow_on_hover" />
        </div>
      </div>
    </overlay_modal> -->
    <!-- {{ filters }} -->
  </section>
</template>
<style>
@media screen and (max-width:400px) {

  table .row3,
  table .row1 {
    display: none;
  }

  /* tr {
    background: red !important;
  } */
}

.resss .row3,
.resss .row3>span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 4rem;
}

.resss .row3>span {
  display: block;
}
</style>