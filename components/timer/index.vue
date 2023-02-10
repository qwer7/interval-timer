<script setup lang="ts">

const state = ref('wait')
let counter = ref(0)

const defaultTimerSetting = {
  // ready: 3,
  work: 15,
  relax: 7,
  rounds: 15,
  // loop: 1,
}
const currentTimeSetting = reactive({ ...defaultTimerSetting })

const progress = ref({ ...currentTimeSetting })

function resetProgress(){
  progress.value = { ...currentTimeSetting }
}

function increaseProgressRound() {
  if( !progress.value.rounds ){
    state.value = 'restart'
    return
  }

  progress.value.work = currentTimeSetting.work
  progress.value.relax = currentTimeSetting.relax
  progress.value.rounds--
}

function increaseProgress(){
  if( progress.value.work )
    progress.value.work--
  else if( progress.value.relax )
    progress.value.relax--

  if( !progress.value.work && !progress.value.relax  )
    increaseProgressRound()
}

function everySecond(second: number){
  counter.value = second
  if(state.value === 'run'){
    increaseProgress()
  }
}

function onReStart(){
  resetProgress()
  state.value = 'run'
}

function onStart(){
  state.value = 'run'
}

function onStop(){
  state.value = 'wait'
  resetProgress()
}

function onPause(){
  console.log('pause')
  state.value = 'wait'
}

</script>

<template lang="pug">
div
  EverySecond(@tick="everySecond")
  template(v-if="state==='wait'")
    TimerProgress(
      :settings="currentTimeSetting"
      :progress="progress"
    )
    TimerStart(@start="onStart")
  template(v-if="state==='run'")
    TimerProgress(
      :settings="currentTimeSetting"
      :progress="progress"
    )
    TimerRun(
      @stop="onStop"
      @pause="onPause"
    )
  template(v-if="state==='restart'")
    Button(
      @click="onReStart"
    ) Перезапуск
</template>
