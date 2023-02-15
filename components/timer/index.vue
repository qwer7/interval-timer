<script setup lang="ts">
import type { Progress } from './types';
import { sounds, playSound } from "~~/modules/sounds"
import { countdown } from '~~/modules/countdown';


const isRunning = ref(false)
const progress = ref<Progress>(countdown.getResetProgress())

function resetProgress(){
  prepareAnimation.value = false
  setTimeout(()=>{
    progress.value = countdown.getResetProgress()
  },10)
}

function countdownEvent(name: string) {
  if(name === 'beforeWork') playSound(sounds.start)
  if(name === 'beforeRelax') playSound(sounds.relax)
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

const prepareAnimation = ref(false)

watch(()=>[progress.value.prepare], ([prepare])=>{
  if(prepare <= 3 && isRunning.value && !prepareAnimation.value){
    prepareAnimation.value = true
  }
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
    template(v-if="['wait', 'pause'].includes(status)")
      TimerProgress(
        :settings="countdown.getResetProgress()"
        :progress="progress"
      )
      TimerStart(@start="onStart")
    //- template(v-if="status === 'prepare'")
    //-   Card
    //-     .text-center.text-2xl.opacity-50 Готовимся
    //-     .h-28.p-2.flex.items-center.justify-center(
    //-       @click="prepareAnimation = !prepareAnimation"
    //-     )
    //-       Transition(
    //-         name="countdown"
    //-         @afterEnter="prepareAnimation = false"
    //-       )
    //-         .text-center.text-6xl.font-mono(
    //-           v-if="prepareAnimation"
    //-         ) {{ progress.prepare }}
    template(v-else-if="isRunning")
      TimerProgress(
        :settings="countdown.getResetProgress()"
        :progress="progress"
      )
        template(#prepare)
          Card
            .text-center.text-2xl.opacity-50 Готовимся
            .h-28.p-2.flex.items-center.justify-center(
              @click="prepareAnimation = !prepareAnimation"
            )
              Transition(
                name="countdown"
                @afterEnter="prepareAnimation = false"
              )
                .text-center.text-6xl.font-mono(
                  v-if="prepareAnimation"
                ) {{ progress.prepare }}
      TimerRun(
        @stop="onStop"
        @pause="onPause"
      )
    template(v-if="status==='restart'")
      Button(
        @click="onReStart"
      ) Перезапуск
</template>

<style>
.countdown-enter-active {
  transition: all 0.0s ease;
  opacity: 0.5;
  margin-left: 30%;
  font-size: 60px;
}
.countdown-leave-active {
  animation: countdown-in .9s
}

@keyframes countdown-in {
  0% {
    margin-left: 30%;
    font-size: 60px;
    opacity: 0.5
  }

  40% {
    margin-right: 0%;
    font-size: 96px;
    opacity: 1
  }

  55% {
    margin-right: 0%;
    font-size: 96px;
    opacity: 1
  }

  100% {
    margin-right: 50%;
    font-size: 54px;
    opacity: 0.00
  }
}
</style>
