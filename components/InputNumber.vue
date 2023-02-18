<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  label: string
}>()

const emit = defineEmits(['update:modelValue'])

</script>

<template lang="pug">
.my-4.flex.items-center.justify-between
  .text-2xl {{ label }}:
  .w-60.flex.items-center.justify-between
    .select-none.text-3xl.leading-none.text-center.border-2.rounded-lg.overflow-hidden(
      class=`w-full flex items-stretch justify-between
            text-gray-500 bg-sky-50
            dark:text-sky-200/40 dark:bg-sky-100/10
            border-sky-500/20 dark:border-sky-200/30`
    )
      .cursor-pointer.w-16.flex.items-center.justify-center(
        class=`hover:bg-sky-500/20 dark:hover:bg-sky-200/30`
        @click="emit('update:modelValue', modelValue-1)"
      ) -
      .flex.items-center.justify-center
        .text-3xl {{ modelValue }}
      .cursor-pointer.w-16.flex.items-center.justify-center(
        class=`hover:bg-sky-500/20 dark:hover:bg-sky-200/30`
        @click="emit('update:modelValue', modelValue+1)"
      ) +

</template>
