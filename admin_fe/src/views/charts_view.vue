<script setup lang='ts'>
import type { ModelClassesType, filterType } from '@/types';
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import overlay_modal from '@/components/overlay_modal.vue';
import c_button from '@/components/buttons/c_button.vue';
import Chart_component from '@/components/chart_component.vue'


const filterMenuIsShow = ref(false)
const filters = ref<filterType>({ classes: [] })
const key = ref(0)
const handleTimePeriopChange = (p: string) => {
  filters.value.period = p
  key.value++
}
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

onMounted(() => {
  axios.get('cameras/get_classes?model_id=2')
    .then(res => {
      classes.value = res.data.data
    })

})

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
</script>
<template>
  <section class="max1200  ">


    <div class="h-flex fr fs-c gp1rem pt1 pb1 ff">
      <button @click="handleTimePeriopChange('today')"
        class="today bgmute hov_glow cursor_pointer pbtn round1">Today</button>
      <!-- <router-link ></router-link> -->
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
    </div>



    <overlay_modal title="Search Filters" v-if="filterMenuIsShow" prop-c-lasses="max500 filters_wrapper"
      @close="filterMenuIsShow = false">
      <div class="h-flex fr mt1 fs-c gp2rem">
        <div class="v-flex mxpw fss gp1rem ">
          <span class="mxpw fs3 bold500 ">
            Classes {{ filters.classes.length }}
          </span>

        </div>
        <div class="v-flex  fr fs-fs fss">
          <!-- <span class="mxpw  fs3 bold500">
            Classes
          </span> -->
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
    </overlay_modal>

    <div class="mxpw h-flex c-c">
      <Chart_component :key :filters />
    </div>
  </section>
</template>
<style>
.filters_wrapper {
  max-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  /* margin-block: 2rem; */
}

.ff>* {
  color: var(--color-text);
}

.ff>*:hover {
  background-color: var(--color2);
}
</style>