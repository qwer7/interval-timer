<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  label: string
  min?: number
  max?: number
}>()

const emit = defineEmits(['update:modelValue'])

function increase() {
  const max = props.max ?? 999
  const value = Math.min(props.modelValue + 1, max)
  emit('update:modelValue', value)
}
function decrease() {
  const min = props.min ?? 1
  const value = Math.max(props.modelValue - 1, min)
  emit('update:modelValue', value)
}

</script>

<template lang="pug">
.my-4.select-none.flex.items-center.justify-between
  div(class="mr-4 flex-grow text-right text-xl sm:text-2xl") {{ label }}:
  .flex.items-center.justify-between(
    class=`w-7/12 sm:w-60`
  )
    .select-none.text-3xl.leading-none.text-center.border-2.rounded-lg.overflow-hidden(
      class=`w-full flex items-stretch justify-between
            text-gray-500 bg-sky-50
            dark:text-sky-200/40 dark:bg-sky-100/10
            border-sky-500/20 dark:border-sky-200/30`
    )
      .cursor-pointer.flex.items-center.justify-center.font-mono(
        class=`w-14 sm:w-16 hover:bg-sky-500/20 dark:hover:bg-sky-200/30`
        @click="decrease"
      ) -
      .flex.items-center.justify-center
        div(class="text-2xl sm:text-3xl") {{ modelValue }}
      .cursor-pointer.flex.items-center.justify-center.font-mono(
        class=`w-14 sm:w-16 hover:bg-sky-500/20 dark:hover:bg-sky-200/30`
        @click="increase"
      ) +

</template>
