<template lang="pug">
.cursor-pointer.select-none.p-2.px-8.overflow-hidden.text-3xl.leading-none.text-center.border-2.rounded-lg(
  class=`w-full
        text-gray-500 bg-sky-50
        border-sky-500/20 hover:border-sky-500/50
        dark:text-sky-200/40 dark:bg-sky-100/10
        dark:border-sky-200/30 dark:hover:border-sky-200/50`
)
  slot
</template>
