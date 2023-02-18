<script setup lang="ts">
import { countdown } from '~~/modules/countdown'
import type { Progress, Status } from './types'

const props = defineProps<{
  progress: Progress
  status: Status
}>()

const { t } = useI18n()

const runningTitle = computed<string>(() => {
  const title = {
    'prepare': t('ready'),
    'work': t('work'),
    'relax': t('relax'),
  }
  const runningStatus = countdown.getStatus(props.progress, true) as keyof typeof title
  return title[runningStatus] ?? t('finish')
})

const countdownTime = computed<string>(() => {
  const positiveTime = props.progress.prepare || props.progress.work || props.progress.relax
  return countdown.toTimeFormat(positiveTime)
})
</script>

<template lang="pug">
template(v-if="['prepare'].includes(status)")
  TimerPrepareAnimated(:progress="progress")
template(v-else)
  Card.mb-4
    template(#title) {{ runningTitle }}
    template(#text)
      .text-8xl.font-mono {{ countdownTime }}
</template>
