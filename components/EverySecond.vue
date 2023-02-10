<script setup lang="ts">
const emit = defineEmits(['tick'])

let interval = 0
let counter = 0

function everySecond(){
  counter++
  emit('tick', counter)
}

onMounted(()=>{
  interval = setInterval(()=>{
    everySecond()
  }, 1000)
})
onBeforeUnmount(()=> {
  clearInterval(interval)
})
</script>

<template lang="pug">
</template>
