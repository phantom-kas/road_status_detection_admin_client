<script setup lang="ts">
import { onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineProps({
  msg: String,
  status: {
    type: String,
    default: 'success'
  }
})

onMounted(() => {
  setTimeout(() => emit('remove'), 10000)
});

const emit = defineEmits(['remove'])
</script>

<template>
  <div :class="status" class='toast'>
    <div class='fss v-flex c-c'>
      <!-- <i class = 'fa'></i> -->
      <font-awesome-icon v-if="status == 'info'" class='info' :icon="['fas', 'circle-info']" size="2xl" />
      <font-awesome-icon v-else-if="status == 'warning'" class='warning' :icon="['fas', 'triangle-exclamation']"
        size="2xl" />
      <font-awesome-icon v-else-if="status == 'success'" class='success' :icon="['far', 'circle-check']" size="2xl" />
      <font-awesome-icon v-else-if="status == 'error'" class='error' :icon="['fas', 'circle-xmark']" size="2xl" />
    </div>

    <div class='fg' v-html="msg">

    </div>
    <div>
      <!-- <i   class = 'fa fa-times'></i> -->

      <font-awesome-icon @click="emit('remove')" :icon="['fas', 'xmark']" />
    </div>

    <span class='ld_prog'></span>
  </div>
</template>
<style scoped>
.toast {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 200;
  -webkit-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
  -ms-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
  -o-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);

  gap: 0.5rem;
  padding: 0.3rem 0.7rem;
  border-radius: 0.3rem;
  position: relative;

}

div {
  margin-bottom: 0.5rem;
}

.success {
  color: white;
  background: rgb(63, 172, 63);
}

.success>div>:first-child::after {
  content: "";
  color: greed;
  background: rgb(63, 172, 63);
}

.info {
  color: white;
  background: var(--col_info)
}

.error {
  color: white;
  background: rgb(255, 47, 47);
}

.error>div:first-child>i::before {
  content: "\f00d"
}

.msg {}

.warning {}

.warning>div:first-child>i::before {
  content: "\f071"
}

.warning {
  color: white;
  background: #ef94007c;
}

.info {
  color: white;
  background: cornflowerblue;
  ;
}

.success>div:first-child>i::before {
  content: "\f00c";
  color: #ef9400c4;
}

.success>.ld_prog {
  background: rgb(63, 172, 63);
}

.warning>.ld_prog {
  background: #ef94007c;
}

.info>.ld_prog {
  background: cornflowerblue;
}

.error>.ld_prog {
  background: rgb(255, 47, 47);
}

.ld_prog {

  width: 100%;
  position: absolute;
  bottom: -6px;
  right: 0;
  height: 5px;
  animation: slideInFromLeft 10s;
}

@keyframes slideInFromLeft {
  0% {
    transform: scaleX(0);
  }

  100% {
    transform: scaleX(1);
  }
}
</style>