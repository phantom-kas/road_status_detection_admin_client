<script setup lang='ts'>
defineProps({
  checked: {
    type: Boolean,
    default: false
  }
})
defineEmits(['changed'])
</script>
<template>
  <label class="switch">
    <input :checked @change="e => $emit('changed', (e.target as HTMLInputElement).checked)" type="checkbox">
    <span class="slider round"></span>
  </label>
</template>
<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--color-text);
  -webkit-transition: .4s;
  transition: .4s;
}

.switch>input:checked+.slider {
  background-color: var(--color2);
}

.switch>input:focus+.slider {
  box-shadow: 0 0 1px var(--color2);
}

.switch>input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>