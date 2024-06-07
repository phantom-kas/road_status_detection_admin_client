<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import { useDarkMode } from './stores/darkMode';
import { onMounted } from 'vue';
import toads_list from './components/toads_list.vue';

function hasClass(element: HTMLElement, cls: String) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function removeClass(ele: HTMLElement, cls: string | String) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

function addClass(ele: HTMLElement, cls: string | String) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

onMounted(() => {
  document.addEventListener("click", function (e: MouseEvent) {

    if (!e)
      return
    const element = e.target as HTMLElement
    const isDropdownButton = element.matches("[data-dd-btn]")
    if (!isDropdownButton && element.closest("[data-dd]") != null) {

      return
    }

    let currentDropdown: HTMLElement | null
    if (isDropdownButton) {
      currentDropdown = element.closest("[data-dd]")
      currentDropdown?.classList.toggle("dd_active")
      if (!currentDropdown) return
      if (hasClass(currentDropdown, "dd_active")) {
        console.log((e.clientX / document.documentElement.clientWidth * 100))
        //   window.alert('percentage xy ('+ e.clientX / document.documentElement.clientWidth * 100 + ' ,' +  e.clientY / document.documentElement.clientHeight * 100 +' )')
        if ((e.clientY / document.documentElement.clientHeight * 100) > 50) {


          addClass(currentDropdown, 'dd_to_up')
          removeClass(currentDropdown, 'dd_to_down')
        }
        else {
          addClass(currentDropdown, 'dd_to_down')
          removeClass(currentDropdown, 'dd_to_up')
        }


        if ((e.clientX / document.documentElement.clientWidth * 100) > 50) {
          addClass(currentDropdown, 'dd_to_left')
          removeClass(currentDropdown, 'dd_to_right')
        }
        else {
          addClass(currentDropdown, 'dd_to_right')
          removeClass(currentDropdown, 'dd_to_left')
        }

      }



    }

    document.querySelectorAll("[data-dd].dd_active").forEach(dropdown => {
      if (dropdown === currentDropdown) return
      dropdown.classList.remove("dd_active")
    })
  })
})
</script>

<template>
  <RouterView />
  <toads_list />

</template>

<style scoped></style>
