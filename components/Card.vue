<template lang="pug">
.p-4.rounded-md(
  class="bg-sky-50 dark:bg-sky-50/10"
)
  slot
    .text-center.text-2xl.opacity-50
      slot(name="title")
    slot(name="body")
      .p-2.flex.items-center.justify-center.text-center
        slot(name="text")
</template>
