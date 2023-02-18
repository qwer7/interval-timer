<script setup lang="ts">
import type { Progress } from './types'

const props = defineProps<{
  progress: Progress
}>()

const prepareAnimation = ref(false)

function startPrepareAnimation() {
  prepareAnimation.value = true
}

watch(()=>[props.progress.prepare], ([prepare])=>{
  if(!prepareAnimation.value && prepare){
    setTimeout(startPrepareAnimation,0)
  }
}, {immediate: true})

</script>

<template lang="pug">
Card.mb-4
  template(#title) {{ $t('ready') }}
  template(#body)
    .h-28.p-2.flex.items-center.justify-center
      Transition(
        name="countdown"
        @afterEnter="prepareAnimation = false"
      )
        .text-center.text-6xl.font-mono(
          v-if="prepareAnimation"
        ) {{ progress.prepare }}
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
