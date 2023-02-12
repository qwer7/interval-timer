<script setup lang="ts">

useHead({
  titleTemplate: 'Interval timer',
})

const classes = computed(() => {
  return ['']
})
</script>

<template lang="pug">
Body(
  class=` bg-gradient-to-br from-[#888bab] via-[#b899c8] to-[#94bec7]
          dark:from-[#303247] dark:via-[#372541] dark:to-[#32545b]`
)
  main.relative.h-full
    NuxtPage
</template>
