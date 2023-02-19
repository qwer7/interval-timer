<script setup lang="ts">
type ColorMode = 'system' | 'light' | 'dark'

const colorMode = useColorMode()

const colorThemeName = computed(() => colorMode.preference === 'system' ? 'auto' : colorMode.preference)

const nextColorTheme = computed<ColorMode>(() => {
  switch(colorMode.preference as ColorMode){
    case 'system': return 'dark'
    case 'dark': return 'light'
    case 'light': return 'system'
  }
})

function toggleTheme() {
  const next = nextColorTheme.value
  colorMode.preference = nextColorTheme.value
}


</script>

<template lang="pug">
.relative
  .h-8.px-4.flex.items-center.justify-center(
    @click="toggleTheme"
  )
    ColorThemeIconSystem(v-if="colorMode.preference === 'system'")
    ColorThemeIconLight(v-if="colorMode.preference === 'light'")
    ColorThemeIconDark(v-if="colorMode.preference === 'dark'")
  .h-4.text-center(class="text-[10px]")  {{ $t(colorThemeName) }}
</template>
