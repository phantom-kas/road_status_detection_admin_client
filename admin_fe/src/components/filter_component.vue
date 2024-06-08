<script setup lang='ts'>
import type { ModelClassesType } from '@/types';
import { onMounted, ref } from 'vue';
import overlay_modal from '@/components/overlay_modal.vue';
import c_button from '@/components/buttons/c_button.vue';
import axios from 'axios';
import input_component from '@/components/form_components/input_component.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const emit = defineEmits(['filter'])
const key = ref(0)
const filters = ref<{ period?: string, classes: ModelClassesType[], date_from?: string, date_to?: string }>({ classes: [] })
const filterMenuIsShow = ref(false)

const handleTimePeriopChange = (p: string) => {
  filters.value.period = p
  key.value++
  emit('filter', filters.value)
}


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
</script>
<template>
  <div class="h-flex fr fs-c gp1rem pt1 pb1 ff">
    <button :class="{ 'selected': filters.period == 'today' }" @click="handleTimePeriopChange('today')"
      class="today bgmute hov_glow cursor_pointer pbtn round1">Today</button>
    <!-- <router-link ></router-link> -->
    <button :class="{ 'selected': filters.period == 'this_week' }" @click="handleTimePeriopChange('this_week')"
      class="today bgmute hov_glow cursor_pointer pbtn round1">This
      week</button>
    <button :class="{ 'selected': filters.period == 'this_month' }" @click="handleTimePeriopChange('this_month')"
      class="today bgmute hov_glow cursor_pointer pbtn round1">This
      month</button>
    <button :class="{ 'selected': filters.period == 'this_year' }" @click="handleTimePeriopChange('this_year')"
      class="today bgmute hov_glow cursor_pointer pbtn round1">This
      year</button>
    <button @click="() => { filters = { classes: [] }; key++; emit('filter', filters) }"
      class="today bgmute hov_glow cursor_pointer pbtn round1">Clear
      filters</button>
    <button @click="filterMenuIsShow = true" class="today bgmute hov_glow cursor_pointer pbtn round1 no_wrap">More
      filters <font-awesome-icon :icon="['fas', 'sliders']" /></button>
    <!-- <span>
      {{ filters.period }}
    </span> -->
  </div>

  <overlay_modal title="Search Filters" v-if="filterMenuIsShow" prop-c-lasses="max500 filters_wrapper"
    @close="filterMenuIsShow = false">
    <div class="h-flex fr mt1 fs-c gp2rem">
      <div class="v-flex mxpw fss gp1rem ">
        <span class="mxpw fs3 bold500 ">
          Classes {{ filters.classes.length }}
        </span>

        <input_component :val="filters.date_from" @inputed="e => filters.date_from = e.value" tp="date" name="data_from"
          class="round1 mxpw" label="Date from" />
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
        <c_button @click="emit('filter', filters), filterMenuIsShow = false" text="Search"
          class="bgc1 mxpw glow_on_hover" />
      </div>
    </div>
  </overlay_modal>
</template>
<style scoped>
button.selected {
  background-color: var(--color2);
  color: rgb(0, 0, 0);

  background-color: white;
  box-shadow: 1px 2px 3px 0;

}



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
<style>
.filters_wrapper>div {
  justify-content: center !important;
  align-items: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>