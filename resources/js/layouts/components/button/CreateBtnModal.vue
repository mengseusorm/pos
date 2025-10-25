<template> 
  <VBtn class="variant"  @click="$emit('click')" > 
    <VIcon icon="bx-plus-circle" start size="20"/>
    {{ $t(translationKey) }} 
  </VBtn> 
</template>

<script setup>
const emit = defineEmits(['click'])

const props = defineProps({
  translationKey: {
    type: String,
    default: ''
  }, 
})


</script>
