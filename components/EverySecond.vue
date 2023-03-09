<script setup lang="ts">
const props = defineProps<{
  enable: boolean
}>()

const emit = defineEmits(['tick'])

let interval = 0
let counter = 0

function everySecond() {
  counter++
  emit('tick', counter)
}

function startInterval() {
  interval = setInterval(() => {
    everySecond()
  }, 1000)
}

onBeforeUnmount(() => {
  interval && clearInterval(interval)
})

watch(() => props.enable, (enable) => {
  interval && clearInterval(interval)
  enable && startInterval()
})
</script>
