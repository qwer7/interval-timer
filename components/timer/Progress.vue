<script setup lang="ts">
import type { Progress } from './types';

const props = defineProps<{
  settings: Progress
  progress: Progress
}>()

// const positiveProgress = computed<Progress>(()=>({
//   prepare: props.settings.prepare - props.progress.prepare,
//   work: props.settings.work - props.progress.work,
//   relax: props.settings.relax - props.progress.relax,
//   rounds: props.settings.rounds - props.progress.rounds,
// }))

function toTimeFormat( seconds :number){
  return new Date(seconds * 1000).toISOString().substring(14, 19)
}

type HumanTimer = Record<keyof Progress, string>
const humanTimer = computed<HumanTimer>(()=>({
  prepare: `${props.progress.prepare}`,
  work: toTimeFormat(props.progress.work),
  relax: toTimeFormat(props.progress.relax),
  rounds: `${props.settings.rounds - props.progress.rounds}`,
}))

</script>

<template lang="pug">
.pb-8
  template(v-if="progress.prepare")
    Card
      .text-center.text-2xl Готовимся
      .p-2.text-center.text-8xl.font-mono {{ humanTimer.prepare }}
  template(v-else-if="progress.work")
    Card
      .text-center.text-2xl Работаем
      .p-2.text-center.text-8xl.font-mono {{ humanTimer.work }}
  template(v-else-if="progress.relax")
    Card
      .text-center.text-2xl Отдыхаем
      .p-2.text-center.text-8xl.font-mono {{ humanTimer.relax }}
  .mb-4
  //- .w-40.p-2.flex.flex-col.bg-gray-200.rounded-lg.shadow
  Card(class="w-1/2")
    .text-center.text-2xl Раунды
    .flex.items-center.justify-center
      .text-center.text-3xl {{ humanTimer.rounds }}
      .px-1.text-center.text-3xl /
      .text-center.text-3xl {{ settings.rounds }}
</template>
