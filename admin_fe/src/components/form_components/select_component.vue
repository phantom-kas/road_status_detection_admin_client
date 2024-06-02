<script setup lang="ts">
import {ref} from 'vue'
const props = defineProps({
  lable: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  val: {
    type: String,
    default: null
  },
  options: {
    type: Array,
    default: null
  },
  required: {
    type: Boolean,
    default: false
  }
})


const vall = ref(props.val)
</script>
<template>
  <div class="field-group">
    <!-- <input :value = "val" class="" placeholder=" " :type="tp" required :name="name" id="cresp" /> -->
    <select placeholder="" :required = "required" v-if="options" v-model="vall" @change="$emit('inputed', {name:name,value:vall})" :class = "{'focus' : vall }"> 
      <!-- <option :value="''" disabled selected>{{ lable }}</option> -->
      <option  v-for="(op, i) in options" :key ="i" :value = op.value :disabled = "op.disabled">
        {{ op.label }} 
      </option>
    </select>

    <label class="floating-label" :for="lable">{{ lable }} </label>
  </div>
</template>

<style scoped>
:root {
}

.field-group {
  --txt_input_bg_col: var(--color-background-soft);
  --txt_input_fs:var(--fs2);
  --txt_input_leftpd: 0.8rem;
    --txt_input_blck_pd: 0.7rem;
  position: relative;
  font-size: var(--txt_input_fs);
  height: min-content;
}

.field-group label {
  position: absolute;
  top: var(--txt_input_blck_pd);
  left: var(--txt_input_leftpd);
  transition-property: top color font-size;
  transition-duration: 0.5s;
  pointer-events: none;
  font-size: var(--txt_input_fs);
  line-height: 0.7;

  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.field-group select {
  width: 100%;
  padding-top: var(--txt_input_blck_pd);
  padding-bottom: var(--txt_input_blck_pd);
  padding-left: var(--txt_input_leftpd);
  background-color: var(--color-background-soft);
  border: none;
  /* height: 100%; */
}

/* .field-group select:focus + .floating-label, */

.field-group select.focus + .floating-label{
  top: calc(-0.5 * var(--txt_input_fs));
  font-size: calc(0.8 * var(--txt_input_fs));
  background-color: var(--txt_input_bg_col);
  color: var(--color-text);
  line-height: initial;


  height: initial;
  width: initial;
  display: initial;
}

.field-group select {
  outline: none;
  min-width: 150px;
}
.field-group.rr ,.field-group.rr select {
  border-radius:5px ;
}
</style>
