<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import type { chartDataSetType, filterType } from '@/types';
import type { PropType } from 'vue';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

const props = defineProps({
  filters: {
    type: Object as PropType<filterType>,
    default: null
  },
  raw_data: {
    type: Array,
    default: () => { return [] }
  }
})
const Chartdata = ref<chartDataSetType[]>([])
const Data = ref([])
const chartElement = ref<HTMLCanvasElement | null>(null)

const chart = ref({})
const classData = ref<any>({})
const labels = [1, 2, 3, 3, 4, 5, 6, 7];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

let config: any = {
  type: 'line',
  data: {},
  options: {},
};
let lineLabels: any = []
let lineDAta: any = []

onMounted(() => {
  axios.get('cameras/get_report_for?model_id=2', { params: props.filters })
    .then(res => {
      if (props.filters.period == 'today') {
        return res
      }
      classData.value = {}
      Chartdata.value = []
      for (let index = 0; index < res.data.data.length; index++) {
        if (classData.value[res.data.data[index].report] == undefined) {
          classData.value[res.data.data[index].report] = [
            { x: res.data.data[index].date, y: parseInt(res.data.data[index].num) }
          ]

        } else {
          classData.value[res.data.data[index].report].push({
            x: res.data.data[index].date,
            y: parseInt(res.data.data[index].num)
          })
        }
      }

      return res

    }).then((res) => {

      if (props.filters.period != 'today') {
        return
      }
      for (let index = 0; index < res.data.data.length; index++) {
        if (classData.value[res.data.data[index].report] == undefined) {
          classData.value[res.data.data[index].report] = parseInt(res.data.data[index].num)
        }
        else {
          classData.value[res.data.data[index]] = classData.value[res.data.data[index]] + parseInt(res.data.data[index].num)
        }
      }

      lineLabels = Object.keys(classData.value);
      lineDAta = Object.values(classData.value);
      return

    }).then(() => {

      for (const key of Object.keys(classData.value)) {
        //console.log(key)
        Chartdata.value.push({
          label: key,
          data: classData.value[key]
        })
      }
    })
    .then(res => {
      console.log(Chartdata.value)
      if (props.filters.period == 'today') {
        config.data.labels = lineLabels
        config.type = 'bar'
        config.data.datasets = [{
          label: 'My First Dataset',
          data: lineDAta
        }]
        config.options = {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      } else {
        config.type = 'line'
        config.data = { datasets: Chartdata.value }
        config.options = {
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
      console.log(config)
      chart.value = new Chart(chartElement.value as HTMLCanvasElement, config)
    })

})
</script>
<template>

  <div class="pos_rel max1000">
    <canvas ref="chartElement" id="acquisitions" class="mt2 pos_rel"></canvas>
  </div>
  <div>
    <!-- {{ classData }} -->
    <!-- dd{{ classData }} -->
  </div>
</template>
<style scoped></style>