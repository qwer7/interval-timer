<script setup lang="ts">
import type { Progress } from './types';
import { sounds, playSound } from "~~/modules/sounds"
import { countdown } from '~~/modules/countdown';


const isRunning = ref(false)
const progress = ref<Progress>(countdown.getResetProgress())

function resetProgress(){
  progress.value = countdown.getResetProgress()
}

function countdownEvent(name: string) {
  if(name === 'beforeWork') playSound(sounds.start)
  if(name === 'beforeRelax') playSound(sounds.relax)
  if(name === 'end') isRunning.value = false
}

function everySecond(second: number){
  if(isRunning.value){
    progress.value = countdown.tick(progress.value, countdownEvent)
  }
}

function onReStart(){
  resetProgress()
  isRunning.value = false
}

function onStart(){
  if(status.value === 'wait'){
    resetProgress()
  }
  isRunning.value = true
}

function onStop(){
  isRunning.value = false
  resetProgress()
}

function onPause(){
  isRunning.value = false
}

type Status = 'wait' | 'pause' | 'prepare' | 'work' | 'relax' | 'restart'
const status = computed<Status>(()=> countdown.getStatus(progress.value, isRunning.value));

const runningTitle = computed<string>(() => {
  const title = {
    'prepare': 'Готовимся',
    'work': 'Работаем',
    'relax': 'Отдыхаем',
  }
  const runningStatus = countdown.getStatus(progress.value, true) as keyof typeof title
  return title[runningStatus] ?? ''
})

const countdownTime = computed<string>(() => {
  const positiveTime = progress.value.prepare || progress.value.work || progress.value.relax
  return countdown.toTimeFormat(positiveTime)
})
</script>

<template lang="pug">
div(
  class=` p-0 w-full h-full
          sm:p-4 sm:w-auto sm:h-auto sm:rounded-lg
          backdrop-blur bg-white/20`
)
  div(
    class=` p-4 w-full h-full flex flex-col justify-center
            sm:p-8 sm:w-[500px] sm:rounded
            text-slate-700 bg-white
            dark:text-sky-200/50 dark:bg-slate-700`
  )
    EverySecond(
      :enable="isRunning"
      @tick="everySecond"
    )
    //- Main countdown panel
    div
      template(v-if="['prepare'].includes(status)")
        TimerPrepareAnimated(:progress="progress")
      template(v-else)
        Card.mb-4
          template(#title) {{ runningTitle }}
          template(#text)
            .text-8xl.font-mono {{ countdownTime }}

      //- Info panel
      TimerInfoPanel(:progress="progress")

      //- Command panel
      template(v-if="['wait', 'pause'].includes(status)")
        Button(@click="onStart") Старт
      template(v-else-if="isRunning")
        .grid.grid-cols-2.gap-4
          Button(@click="onStop") Стоп
          Button(@click="onPause") Пауза
      template(v-else)
        Button(@click="onReStart") Перезапуск
</template>
