<script setup lang="ts">

interface IProgress{
  work: number
  relax: number
  rounds: number
}

const props = defineProps<{
  settings: IProgress
  progress: IProgress
}>()

const positiveProgress = computed<IProgress>(()=>({
  work: props.settings.work - props.progress.work,
  relax: props.settings.relax - props.progress.relax,
  rounds: props.settings.rounds - props.progress.rounds,
}))

function toTimeFormat( seconds :number){
  return new Date(seconds * 1000).toISOString().substring(14, 19)
}

type HumanTimer = Record<keyof IProgress, string>
const humanTimer = computed<HumanTimer>(()=>({
  work: toTimeFormat(props.progress.work),
  relax: toTimeFormat(props.progress.relax),
  rounds: `${props.settings.rounds - props.progress.rounds}`,
}))

</script>

<template lang="pug">
.p-16
  template(v-if="progress.work")
    .p-4.bg-gray-200.rounded-lg.shadow
      .text-center.text-2xl Работаем
      .p-2.text-center.text-8xl.font-mono {{ humanTimer.work }}
  template(v-else-if="progress.relax")
    .p-4.bg-gray-200.rounded-lg.shadow
      .text-center.text-2xl Отдыхаем
      .p-2.text-center.text-8xl.font-mono {{ humanTimer.relax }}
  .mb-4
  .w-40.p-2.flex.flex-col.bg-gray-200.rounded-lg.shadow
    .text-center.text-2xl Раунды
    .flex.items-center.justify-center
      .text-center.text-3xl {{ humanTimer.rounds }}
      .px-1.text-center.text-3xl /
      .text-center.text-3xl {{ settings.rounds }}
</template>
