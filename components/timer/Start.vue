<script setup lang="ts">
const emit = defineEmits(['start'])

function onStart(){
  console.log('on start')
  emit('start')
}
</script>

<template lang="pug">
div
  Button(
    @click="onStart"
  ) Старт
</template>
