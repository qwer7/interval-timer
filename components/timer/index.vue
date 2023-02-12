<script setup lang="ts">
import type { Progress } from './types';
import { sounds, playSound } from "~~/modules/sounds"

type State = 'waiting' | 'running'
const state = ref<State>('waiting')

const defaultTimerSetting = {
  prepare: 3,
  work: 15,
  relax: 7,
  rounds: 15,
}
// const defaultTimerSetting = {
//   prepare: 3,
//   work: 1,
//   relax: 4,
//   rounds: 3,
// }
const currentTimeSetting = reactive({ ...defaultTimerSetting })

const progress = ref({ ...currentTimeSetting })

function onBeforeWork() {
  playSound(sounds.start)
}
function onBeforeRelax() {
  playSound(sounds.relax)
}

function resetProgress(){
  progress.value = { ...currentTimeSetting }
}

function increaseProgressRound() {
  if( !progress.value.rounds ){
    state.value = 'waiting'
    return
  }

  progress.value.work = currentTimeSetting.work
  progress.value.relax = currentTimeSetting.relax
  progress.value.rounds--
}

function increaseProgress(){

  if( progress.value.prepare ){
    progress.value.prepare--
    !progress.value.prepare && onBeforeWork()
  }
  else if( progress.value.work ){
    progress.value.work--
    !progress.value.work && onBeforeRelax()
  }
  else if( progress.value.relax ){
    progress.value.relax--
    !progress.value.relax && onBeforeWork()
  }


  if( !progress.value.work && !progress.value.relax  )
    increaseProgressRound()
}

function everySecond(second: number){
  if(state.value === 'running'){
    increaseProgress()
  }
}

function onReStart(){
  resetProgress()
  state.value = 'waiting'
}

function onStart(){
  state.value = 'running'
}

function onStop(){
  state.value = 'waiting'
  resetProgress()
}

function onPause(){
  state.value = 'waiting'
}

function allTime(obj: Progress) {
  return Object.values(obj).reduce((acc, v) => acc + v, 0)
}

type Status = 'wait' | 'pause' | 'prepare' | 'work' | 'relax' | 'restart'
const status = computed<Status>(()=>{
  const progressTime = allTime(progress.value)
  const startTime = allTime(currentTimeSetting)
  const timeDifference = startTime - progressTime
  //  Waiting status
  if(state.value === 'waiting'){
    return progressTime === 0
      ? 'restart'
      : timeDifference === 0
        ? 'wait'
        : 'pause'
  }
  //  Running status
  if(state.value === 'running'){
    return progress.value.prepare
    ? 'prepare'
    : progress.value.work
      ? 'work'
      : 'relax'
  }
  // For exception situation
  return 'restart'
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
    EverySecond(@tick="everySecond")

    template(v-if="['wait', 'pause'].includes(status)")
      TimerProgress(
        :settings="currentTimeSetting"
        :progress="progress"
      )
      TimerStart(@start="onStart")
    template(v-if="state==='running'")
      TimerProgress(
        :settings="currentTimeSetting"
        :progress="progress"
      )
      TimerRun(
        @stop="onStop"
        @pause="onPause"
      )
    template(v-if="status==='restart'")
      Button(
        @click="onReStart"
      ) Перезапуск
</template>
