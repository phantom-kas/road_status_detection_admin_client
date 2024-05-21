<script setup lang="ts">
import { dashboardStore } from '../stores/dashboardStore';
import camera_logs from './cameras/camera_logs.vue';
import Chart from 'chart.js/auto';
import { onMounted, ref, onBeforeMount, onUnmounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'chartjs-adapter-date-fns';
import { stringify } from 'querystring';
const chart = ref({})
const chartElement = ref<HTMLCanvasElement | null>(null)
const dash = dashboardStore()



const showDashBoard = ref(false)

// onBeforeMount(() => {
//   dash.chartDataSet = []
// })
onMounted(async () => {
  // dash.run()
  showDashBoard.value = await dash.getDashBord()
  let config = {
    type: 'line',
    data: { datasets: dash.chartDataSet },
    options: {
      responsive: true,

      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          }
        },
        y: {
          beginAtZero: true
        }
      }
    }
  }
  chart.value = new Chart(chartElement.value as HTMLCanvasElement, config)
})



</script>
<template>
  <section class="mxpw mxph">
    <!-- {{ dash.key }}
    {{ dash.detectsCount }} -->
    <div class="mxph pglr  dash_wrapper  h-flex  fs-fs gp1rem mglra">

      <div class="max700  v-flex sb-c mxph gp1rem ">
        <div class="objects_count mxpw   v-flex  fs-fs round1   bgcol p04105 ">
          <h3 class="mxpw mb1">Number of Detections Today</h3>

          <div :key="dash.key" class="h-flex fs-fs mxpw  gp1rem  num_count_wrapper">
            <div :key="key + String(value)" v-for="(value, key) in dash.detectsCount"
              class="h-flex fs-c no_wrap round1    max300  sdw1 mb1 p04105 num_count">
              <div class=" h-flex fs-c  gp05rem">
                <span class="fs9"> {{ value ?? 0 }}</span>
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
      </div>{{ showDashBoard }}


      <div class="bgcol p1 round1 dashlogs overflowx_hidden">
        <div class="h-flex sb-c">
          <h2>Recent logs</h2>

          <router-link :to="{ name: 'all__logs' }">
            <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" />
          </router-link>

        </div>
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
  padding-right: 0px;
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

.num_count:last-child {
  margin-right: 1rem;
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
</style>