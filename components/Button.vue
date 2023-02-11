<template lang="pug">
.cursor-pointer.select-none.p-2.px-8.text-gray-500.text-3xl.leading-none.text-center.bg-sky-100.border-2.rounded-lg(
  class="min-w-[200px] border-sky-500/20 hover:border-sky-500/50"
  @click="$emit('click')"
)
  slot
</template>
