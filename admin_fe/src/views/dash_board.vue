<script setup lang="ts">
import { dashboardStore } from '@/stores/dashboradStore';
import camera_logs from './cameras/camera_logs.vue';
const dashboard = dashboardStore()
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';
const chart = ref({})
const chartElement = ref<HTMLCanvasElement | null>(null)
// const data = [
//   { year: 2010, count: 10 },
//   { year: 2011, count: 20 },
//   { year: 2012, count: 15 },
//   { year: 2013, count: 25 },
//   { year: 2014, count: 22 },
//   { year: 2015, count: 30 },
//   { year: 2016, count: 28 },

// ];
const labels = [1, 2, 3, 4, 5, 6, 7];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'My First',
      data: [5, 29, 10, 8, 6, 5, 0],
      fill: false,
      borderColor: 'rgb(50, 19, 192)',
      tension: 0.1
    },
    {
      label: 'My First',
      data: [5, 29, 1, 80, 56, 35, 70],
      fill: false,
      borderColor: 'rgb(50, 1, 12)',
      tension: 0.1
    }
  ]
};


const config = {
  type: 'line',
  data: data,
};

onMounted(() => chart.value = new Chart(<HTMLCanvasElement>chartElement.value,
  config
))
</script>
<template>
  <section class="mxpw mxph">
    <div class="mxph pglr  dash_wrapper  h-flex  fs-fs gp1rem mglra">



      <div class="max700  v-flex sb-c mxph gp1rem ">
        <div class="objects_count mxpw   v-flex  fs-fs round1   bgcol p04105 ">
          <h3 class="mxpw mb1">Number of Detections Today</h3>

          <div class="h-flex fs-fs mxpw  gp1rem  num_count_wrapper">
            <div v-for="(value, key) in dashboard.detectsCount"
              class="h-flex fs-c no_wrap round1  num_count  max300  sdw1 mb1 p04105" :key="key">
              <div class=" h-flex fs-c  gp05rem">
                <span class="fs9">{{ value }}</span>
                <span>{{ key }}</span>
              </div>
            </div>
          </div>

        </div>

        <div class="bgcol chart_wrapper fg mxpw round1 p04106 ">
          <h3>
            Graph
          </h3>
          <div class="pos_rel mxpw">
            <canvas ref="chartElement" id="acquisitions" class=" pos_rel"></canvas>
          </div>
        </div>
      </div>


      <div class="bgcol p1 round1 dashlogs overflowx_hidden">
        <h2>Recent logs</h2>
        <camera_logs class="" />
      </div>
    </div>
  </section>
</template>


<style scoped>
.dashlogs {
  height: 100%;
}

/* .chart_wrapper {
  height: 60%;
} */

.objects_count {
  /* position: sticky;
  top: 0px; */
}

.num_count_wrapper {
  overflow-x: scroll;
  /* padding-bottom: 2rem; */
}

.num_count {
  color: white;
  background-image: linear-gradient(to right, #870000, #190a05);
}

.num_count:nth-child(2n) {
  background-image: linear-gradient(to right, #ff512f, #f09819);


}

.num_count:nth-child(5n) {
  background-image: linear-gradient(to right, hsl(208, 66%, 50%), hsl(328, 66%, 50%))
}

.num_count:nth-child(4n) {
  background-image: linear-gradient(to right, #5a3f37, #2c7744);


  /* background-image: linear-gradient(to right, var(--btn-gradient-start), var(--btn-gradient-end)); */

}

.num_count:nth-child(3n) {
  background-image: linear-gradient(to right, #0f0c29, #302b63, #24243e);
}


@media screen and (max-width:1212px) {
  .dash_wrapper {
    flex-direction: column;
  }

  .dash_wrapper>* {
    width: 100%;
  }

  .dashlogs {
    height: max-content;
    overflow: unset;
  }
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
</style>