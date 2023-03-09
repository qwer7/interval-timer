<script setup lang="ts">
const { locale } = useI18n()

function toggleLanguage() {
  locale.value = locale.value === 'ru' ? 'en' : 'ru'
  // TODO module
  localStorage.setItem('locale', JSON.stringify(locale.value))
}

const name = computed(() => locale.value === 'ru' ? 'Russian' : 'English')
</script>

<template lang="pug">
.relative
  .h-8.px-4.flex.items-center.justify-center(
    @click="toggleLanguage"
  )
    LanguageIconRU(v-if="locale === 'ru'")
    LanguageIconUS(v-if="locale === 'en'")
  .h-4.text-center(class="text-[10px]") {{ name }}
</template>
