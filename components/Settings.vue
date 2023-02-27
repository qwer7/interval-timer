<script setup lang="ts">
import debounce from 'lodash.debounce'
import { setLocalStorageSetting, countdown, defaultTimerSetting } from '~~/modules/countdown';

const timeSetting = ref({...countdown.getResetProgress()})

// const totalTime = ref(countdown.toTimeFormat(countdown.allTime(timeSetting.value)))
const totalTime = computed(() => countdown.toTimeFormat(countdown.allTime(timeSetting.value)))

function reset() {
  timeSetting.value = { ...defaultTimerSetting }
}

const saveToStorage = debounce(()=>{
  setLocalStorageSetting(timeSetting.value)
}, 250)

watch(timeSetting, () => saveToStorage(), {deep: true})
</script>

<template lang="pug">
.mb-8
  .mb-8.select-none.overflow-hidden.border-2.rounded-lg(
      class=`w-full
          text-gray-500 bg-sky-50
          border-sky-500/20
          dark:text-sky-200/40 dark:bg-sky-100/10
          dark:border-sky-200/30`
    )
    .flex.items-stretch.justify-around
      .px-3.cursor-pointer.flex-items-center.justify-center(
        class="hover:bg-sky-500/10 dark:hover:bg-sky-200/10 rounded-[10%/50%]"
      )
        LanguageSwitcher
      .px-3.cursor-pointer.flex-items-center.justify-center(
        class="hover:bg-sky-500/10 dark:hover:bg-sky-200/10 rounded-[10%/50%]"
      )
        ColorThemeSwitcher
      .px-3.cursor-pointer.flex-items-center.justify-center(
        class="hover:bg-sky-500/10 dark:hover:bg-sky-200/10 rounded-[10%/50%]"
      )
        .relative
          .h-8.px-4.flex.items-center.justify-center(@click="reset")
            SvgIconReset
          .h-4.text-center(class="text-[10px]") {{ $t('reset') }}

  .grid.grid-cols-1.gap-4(
    class="sm:grid-cols-2"
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
      v-model="timeSetting.prepare"
      :label="$t('ready')"
      :min="0"
      :max="9"
    )
    InputNumber(
      v-model="timeSetting.rounds"
      :label="$t('rounds')"
    )
  .mt-4.flex(class="justify-end sm:justify-start")
    .pr-4.text-2xl.font-medium.opacity-50 {{ $t('totalTime') }}:
    .text-2xl.font-medium.opacity-70 {{ totalTime }}
</template>
