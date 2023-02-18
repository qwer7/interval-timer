<script setup lang="ts">
import debounce from 'lodash.debounce'
import { setLocalStorageSetting, countdown, defaultTimerSetting } from '~~/modules/countdown';

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
.mb-4.h-80
  InputNumber(
    v-model="timeSetting.prepare"
    :label="$t('ready')"
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

  .ml-auto.w-60
    Button(@click="reset")
      .text-xl {{ $t('resetSettings') }}
</template>
