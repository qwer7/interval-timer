<script setup lang="ts">
import type { Progress, Status } from './types';
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

const status = computed<Status>(()=> countdown.getStatus(progress.value, isRunning.value));

function onStart(){
  if(status.value === 'wait'){
    resetProgress()
  }
  isRunning.value = true
}

function onStop(){
  resetProgress()
  isRunning.value = false
}

function onPause(){
  isRunning.value = false
}
</script>

<template lang="pug">
div(
  class=` p-0 w-full h-full
          sm:p-4 sm:w-auto sm:h-[470px] sm:rounded-lg
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
    .flex.flex-col.justify-between(
      class="sm:h-full"
    )
      Settings(v-if="status==='wait'")
      template(v-else)
        //- Main countdown panel
        TimerCountdownPanel(
          :progress="progress"
          :status="status"
        )
        //- Info panel
        TimerInfoPanel(:progress="progress")
      //- Command panel
      template(v-if="['wait', 'pause'].includes(status)")
        Button(@click="onStart") {{ $t('start') }}
      template(v-else-if="isRunning")
        .grid.grid-cols-2.gap-4
          Button(@click="onStop") {{ $t('stop') }}
          Button(@click="onPause") {{ $t('pause') }}
      template(v-else)
        Button(@click="onStop") {{ $t('restart') }}
</template>
