<template lang="pug">
.cursor-pointer.select-none.p-2.px-8.text-gray-500.text-3xl.leading-none.text-center.bg-gray-200.border-2.border-gray-500.rounded-lg(
  class="min-w-[200px]"
  @click="$emit('click')"
)
  slot
</template>
