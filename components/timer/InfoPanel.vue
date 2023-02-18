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
    template(#title) Раунды
    template(#text)
      .text-3xl {{ currentRound }} / {{ totalRounds }}
  Card
    template(#title) Осталось
    template(#text)
      .text-3xl {{ timeLeft }}
</template>
