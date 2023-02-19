<script setup lang="ts">

useHead({
  titleTemplate: 'Interval timer',
})

const classes = computed(() => {
  return ['']
})

const { locale, locales } = useI18n()

// TODO: to localStorage locale module
function detectSavedLanguage(){
  try {
    const lsLocale = JSON.parse(localStorage.getItem('locale') ?? '')
    if(locales.value.includes(lsLocale)){
      locale.value = lsLocale
    }
  } catch (error) {

  }
}

onMounted(()=>{
  detectSavedLanguage();
})
</script>

<template lang="pug">
Body.touch-manipulation(
  class=` bg-gradient-to-br from-[#888bab] via-[#b899c8] to-[#94bec7]
          dark:from-[#303247] dark:via-[#372541] dark:to-[#32545b]`
)
  main.relative.h-full
    NuxtPage
</template>
