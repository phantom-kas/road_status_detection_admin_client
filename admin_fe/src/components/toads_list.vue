<script setup lang="ts">
import toastItemVue from './toast_item.vue';
import { useAlertStore } from "../stores/alerts";
const useAlerts = useAlertStore();


function remove(index: number) {
  useAlerts.remove(index)
}

</script>
<template>
  <transition-group tag="div" id="toastLsit" name="list">
    <toastItemVue v-for="(alert, i) in useAlerts.getgetalerts" :key=alert.key :msg=alert.message :status=alert.status
      @remove="remove(i)" />
  </transition-group>


</template>
<style scoped>
#toastLsit {
  position: fixed;
  z-index: 188888;

  max-height: 100vh;

  width: 2px;
  top: 10px;
  right: 10px;
  width: min-content;

  overflow-y: scroll;
  overflow-x: auto;
  background: none;
}

#toastLsit::-webkit-scrollbar,
#toastLsit::-webkit-scrollbar-thumb {
  pointer-events: initial;
}

#toastLsit::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5; */


  width: 0;

  background: transparent;
}

#toastLsit::-webkit-scrollbar {
  width: 9px;
  background-color: #F5F5F5;


  width: 0;
  /* Remove scrollbar space */
  background: transparent;
  /* Optional: just make scrollbar invisible */
}

#toastLsit::-webkit-scrollbar-thumb {
  /* border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #555; */

  width: 0;
  background: transparent;
}

#toastLsit>div {

  pointer-events: initial;
  position: relative;
  width: 200px;



}



/* ::-webkit-scrollbar {
    width: 0; 
    background: transparent;  
}
::-webkit-scrollbar-thumb {
    background: #FF0000;
} */
</style>