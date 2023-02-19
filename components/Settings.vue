<script setup lang="ts">
import debounce from 'lodash.debounce'
import { setLocalStorageSetting, countdown, defaultTimerSetting } from '~~/modules/countdown';

const colorMode = useColorMode()

const colorTheme = computed(() => colorMode.preference === 'system' ? 'auto' : colorMode.preference)
const nextColorTheme =  computed(() => colorMode.preference === 'system'
  ? 'light'
  : colorMode.preference === 'light'
    ? 'dark'
    : 'system'
    )
function toggleTheme() {
  // 'system', 'light', 'dark'
  const next = nextColorTheme.value
  colorMode.preference = nextColorTheme.value
}

const timeSetting = ref({...countdown.getResetProgress()})

function reset() {
  timeSetting.value = { ...defaultTimerSetting }
}

const saveToStorage = debounce(()=>{
  setLocalStorageSetting(timeSetting.value)
}, 250)

watch(timeSetting, () => saveToStorage(),
  {deep: true})
</script>

<template lang="pug">
.mb-4
  .mb-8.select-none.overflow-hidden.border-2.rounded-lg(
      class=`w-full
          text-gray-500 bg-sky-50
          border-sky-500/20 hover:border-sky-500/50
          dark:text-sky-200/40 dark:bg-sky-100/10
          dark:border-sky-200/30 dark:hover:border-sky-200/50`
    )
    .flex.items-stretch.justify-around
      .cursor-pointer.flex-items-center.justify-center
        LanguageSwitcher
      .cursor-pointer.flex.items-center.justify-center
        ColorThemeSwitcher
      .cursor-pointer.flex.items-center.justify-center
        .relative
          .h-8.px-4.flex.items-center.justify-center(@click="reset")
            SvgIconReset
          .h-4.text-center(class="text-[10px]") {{ $t('reset') }}

  //- .text-2xl.font-medium.opacity-50 Settings
  InputNumber(
    v-model="timeSetting.prepare"
    :label="$t('ready')"
    :min="0"
    :max="9"
  )
  InputNumber(
    v-model="timeSetting.work"
    :label="$t('work')"
  )
  InputNumber(
    v-model="timeSetting.relax"
    :label="$t('relax')"
  )
  InputNumber(
    v-model="timeSetting.rounds"
    :label="$t('rounds')"

  )
</template>
