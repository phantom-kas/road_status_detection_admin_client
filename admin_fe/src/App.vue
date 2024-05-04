<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useDarkMode } from './stores/darkMode';
import { onMounted } from 'vue';

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
    //  console.log("Dropping test")
    // console.log("Dropping test")
    // return
    // if(e.target.closest("[data-dd]") != null){
    //   e.preventDefault();

    //   e.stopPropagation();
    //    console.log("Dropping test")
    // }
    // console.log('----------------------------------------------------------------');
    // console.log('client ('+ e.clientX +' ,' +e.clientY + ' )');
    // console.log('screen ('+e.screenX +' ,' +e.screenY + ' )');
    // console.log('pageX ('+e.pageX +' ,' +e.pageY + ' )');
    // console.log('clientwh ('+document.documentElement.clientWidth +' ,' +document.documentElement.clientHeight + ' )')
    // console.log('screen (' +window.innerHeight+' ,' +window.innerWidth + ' )');
    /// console.log('----------------------------------------------------------------');
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
const dark = useDarkMode()
</script>

<template>
  <RouterView id="main" class="main" :class="{ 'dark': dark.isDark }" />
</template>

<style scoped></style>
