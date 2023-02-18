<script setup lang="ts">
import { countdown } from '~~/modules/countdown'
import type { Progress } from './types'

const props = defineProps<{
  progress: Progress
}>()

const currentRound = computed(() => countdown.toPositiveProgress(props.progress).rounds)
const totalRounds = computed(() => countdown.getResetProgress().rounds)
const timeLeft = computed(() => countdown.timeLeft(props.progress) )

</script>

<template lang="pug">
.mb-4.grid.grid-cols-2.gap-4
  Card
    template(#title) {{ $t('rounds') }}
    template(#text)
      .text-3xl.font-mono {{ currentRound }}/{{ totalRounds }}
  Card
    template(#title) {{ $t('timeLeft') }}
    template(#text)
      .text-3xl.font-mono {{ timeLeft }}
</template>
