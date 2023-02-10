<script setup lang="ts">
defineEmits(['pause', 'stop'])


</script>

<template lang="pug">
.grid.grid-cols-2.gap-6
  Button(
    @click="$emit('stop')"
  ) Стоп
  Button(
    @click="$emit('pause')"
  ) Пауза
</template>
