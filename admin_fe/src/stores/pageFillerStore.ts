import { defineStore } from 'pinia'
//import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
// import { useUserStore } from '../stores/user'
// import { usePushertore } from './pusherStore'

export const pageFiller = defineStore('pageFiller', () => {
  const pageContent = ref<any[]>([])
  const last_id = ref(0)
  const loadMore = ref(false)
  const profileImgRootUrl = ref('')
  const route = useRoute()

  const mount = () => {
    pageContent.value = []
    last_id.value = 0
    loadMore.value = true
    profileImgRootUrl.value = ''
  }

  const fetchContent = async (params: any, url: string, key: string = 'id') => {
    // let params = {
    //   type:'support',
    //   lim:10
    // }
    if (last_id.value != 0) {
      params.last_id = last_id.value
    }
    if (route.query.search) params.ss = route.query.search

    axios
      .get(url, { params })
      .then((res) => {
        pageContent.value = pageContent.value.concat(res.data.data)
        if (res.data.profile_img_url) {
          profileImgRootUrl.value = res.data.profile_img_url
        }
        return res
      })
      .then((res) => {
        return res
      })
      .then((res) => {
        if (res.data.data.length < 1) {
          loadMore.value = false
          //  window.alert(res.data.status)
          return false
        } else {
          loadMore.value = true
        }
        last_id.value = pageContent.value[pageContent.value.length - 1][key]

        return true
        //.alert(last_id.value)
      })
  }

  const observAndFetch = async ({
    params = {},
    url,
    childOb = '#observe',
    parentOb = '#body',
    key = 'id'
  }: {
    params: any
    url: string
    childOb?: string
    parentOb?: string
    key?: string | number
  }) => {
    const options = {
      root: document.querySelector(parentOb),
      rootMargin: '0px',
      threshold: 1.0
    }
    const observer = new IntersectionObserver(async function (
      entries
      // , observer
    ) {
      if (entries[0].isIntersecting && loadMore.value) {
        while (entries[0].isIntersecting && loadMore.value) {
          //window.alert('seen ' + loadMore.value)
          await fetchContent(params, url, <string>key).then((res) => (loadMore.value = res))
        }
      } else {
        // window.alert('Intersecting' + entries[0].isIntersecting + ' Load more ' + loadMore.value)
      }
    }, options)
    const target = document.querySelector(childOb)
    if (target) observer.observe(target)
  }

  return {
    pageContent,
    fetchContent,
    observAndFetch,
    mount,
    loadMore,
    profileImgRootUrl
  }
})
