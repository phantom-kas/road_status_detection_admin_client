<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  propCLasses: {
    type: String,
    default: 'max500'
  },
  title: {
    type: String,
    default: ''

  }
})

defineEmits(['close'])
</script>


<template>

  <Teleport to="#modals">
    <div class='overlay mm' @click="$emit('close')" :class="propCLasses">
      <div class='mxpw mxph h-flex c-c'>
        <div :class="propCLasses" @click.stop="" class='p1 pglr  br5 bgsoft  gp1rem '>

          <div class='mxpw h-flex fe-c'>
            <span class="fg1 bold600 fs3">
              {{ title }}
            </span>
            <font-awesome-icon @click="$emit('close')" class='error' :icon="['fas', 'xmark']" size="2xl" />
          </div>
          <slot>

          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>


<style scoped>
.mm {
  padding-block: 2rem;
}
</style>