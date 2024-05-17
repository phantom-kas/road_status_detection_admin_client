<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  text: {
    type: String,
    default: 'Submit'
  },
  type: {
    type: Object as PropType<"button" | "submit" | "reset">,
    default: () => { return "button" }
  }
})
</script>
<template>
  <button :type="type" class=" hover_glow  button round1">
    {{ text }}
  </button>
</template>



<style scoped>
.button {
  padding-inline: 1rem;
  padding-block: 0.7rem;
  font-weight: 600;
}

.bg1 {
  background-color: var(--color-background);
}

.bg2 {
  background-color: var(--color-background-2);
}

.bgc1 {
  background-color: var(--color1);
}

.bgc2 {
  background-color: var(--color2);
}

.bgmute {
  background-color: var(--color-background-mute);
}

.bgsoft {
  background-color: var(--color-background-soft);
}

.bgc1.glow_on_hover:hover {
  background-color: var(--color1-soft);
}
</style>