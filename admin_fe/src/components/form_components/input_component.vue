<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tp: {
    type: String,
    default: 'text'
  },
  val: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: null
  },
  required: {
    type: Boolean,
    default: false
  }
})


defineEmits(['inputed'])
let vall = ref(props.val)
</script>
<template>
  <div class="field-group">
    <input :disabled="disabled" v-model="vall" :class="[{ 'date_blur': !vall }, { 'date_focus': vall }]"
      @input="$emit('inputed', { name: name, value: vall })" :type="tp" :required="required" :name="name" :id="name" />
    <label class="floating-label" :for="name"> {{ label }} </label>
  </div>
</template>

<style scoped>
:root {}

.field-group input {
  outline: none;
}

.field-group input[type="text"],
.field-group input[type="date"],
.QUILL,
.field-group select,
.field-group input[type="number"],
.field-group input[type="password"],
.field-group input[type="email"] {
  /* border: 1px solid var(--txt_input_bg_col) */
  border: none;
}

.field-group {
  --txt_input_bg_col: var(--color-background);
  --txt_input_fs: var(--fs2);
  --txt_input_leftpd: 0.8rem;
  --txt_input_blck_pd: 0.7rem;
  position: relative;
  font-size: var(--txt_input_fs);
  height: min-content;
  background-color: var(--color-background);

}

.field-group.rr {
  border-radius: 5px;
}

.field-group label {
  position: absolute;
  top: var(--txt_input_blck_pd);
  left: var(--txt_input_leftpd);
  transition: top 0.5s, color 0.5s, background 0s, font-size 0.5s;

  /* transition-duration: 0.5s; */
  pointer-events: none;
  font-size: var(--txt_input_fs);
  background: none;

  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.field-group input {
  width: 100%;
  padding-top: var(--txt_input_blck_pd);
  padding-bottom: var(--txt_input_blck_pd);
  padding-left: var(--txt_input_leftpd);
  background: none;
  border-radius: 5px;
  /* height: 100%; */
}

.field-group input[type="text"]:focus+.floating-label,
.field-group input[type="number"]:focus+.floating-label,
.field-group input[type="date"]:focus+.floating-label,
.field-group input[type="email"]:focus+.floating-label,

.field-group input[type="password"]:focus+.floating-label,
.date_focus+.floating-label {
  top: calc(-0.5 * var(--txt_input_fs));
  font-size: calc(0.8 * var(--txt_input_fs));
  background-color: var(--txt_input_bg_col);
  color: var(--color-text) !important;
  /* border: 4rem solid gold; */
  line-height: initial;
  /* color:red  !important; */
  height: initial;
  width: initial;
  display: initial;
}

.field-group input[type="date"]:focus {
  color: black !important;

}

.field-group input[type="date"] {
  color-scheme: dark;
}

.date_blur {
  color: transparent
}

.field-group input {
  /* min-width: 150px; */
}

.field-group input[type="date"]::-webkit-calendar-picker-indicator {
  background-color: var(--color2);
  border-radius: 5px;
}
</style>