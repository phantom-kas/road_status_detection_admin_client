import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const dashboardStore = defineStore('dashboardStore', () => {
  const detectsCount = ref<{ [key: string]: number }>({})
  const key = ref(0)
  const date = ref('')
  const classData = ref<any>({})
  interface chartDataSetType {
    label: string
    data: []
  }
  const chartDataSet = ref<chartDataSetType[]>([])

  const getDashBord = async () => {
    console.log('dd')

    return axios
      .get('cameras/get_dash?model_id=2')
      .then((res) => {
        // dashBord.value = res.data.data
        date.value = res.data.datenow
        // detectsCount.value = res.data.today

        for (let index = 0; index < res.data.today.length; index++) {
          detectsCount.value[res.data.today[index].report] = res.data.today[index].num
          console.log(index)
        }
        classData.value = {}
        chartDataSet.value = []
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
      })
      .then(() => {
        console.table(classData.value)

        // chartDataSet.value = []
        for (const key of Object.keys(classData.value)) {
          //console.log(key)
          chartDataSet.value.push({
            label: key,
            data: classData.value[key]
          })
        }

        return true
      })
  }

  const updateDashboard = (msg: any) => {
    for (const key of Object.keys(msg)) {
      if (
        key == 'model_id' ||
        key == 'cam' ||
        key == 'location' ||
        key == 'image' ||
        key == 'cam_id' ||
        key == 'image_url' ||
        key == 'data'
      ) {
        continue
      }

      console.log(key)

      detectsCount.value[key.split('_')[0]] =
        detectsCount.value[key.split('_')[0]] + parseInt(msg[key])
    }
  }

  return { detectsCount, updateDashboard, key, chartDataSet, classData, getDashBord, date }
})
