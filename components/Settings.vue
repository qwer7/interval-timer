<script setup lang="ts">
import debounce from 'lodash.debounce'
import { setLocalStorageSetting, countdown, defaultTimerSetting } from '~~/modules/countdown';

const { locale, locales } = useI18n()

// TODO move to main window
function detectSavedLanguage(){
  try {
    const lsLocale = JSON.parse(localStorage.getItem('locale') ?? '')
    if(locales.value.includes(lsLocale)){
      locale.value = lsLocale
    }
  } catch (error) {

  }
}

function toggleLanguage() {
  locale.value = locale.value === 'ru' ? 'en' : 'ru'
  localStorage.setItem('locale', JSON.stringify(locale.value))
}

const flag = computed(() => locale.value === 'ru' ? 'en' : 'ru')

const timeSetting = ref({...countdown.getResetProgress()})

function reset() {
  timeSetting.value = { ...defaultTimerSetting }
}

const saveToStorage = debounce(()=>{
  setLocalStorageSetting(timeSetting.value)
}, 250)

onMounted(() => detectSavedLanguage())

watch(timeSetting, () => saveToStorage(),
  {deep: true})
</script>

<template lang="pug">
div
  //- .text-2xl.font-medium.opacity-50 Settings
  InputNumber(
    v-model="timeSetting.prepare"
    :label="$t('ready')"
    :min="0"
    :max="9"
  )
  InputNumber(
    v-model="timeSetting.work"
    :label="$t('work')"
  )
  InputNumber(
    v-model="timeSetting.relax"
    :label="$t('relax')"
  )
  InputNumber(
    v-model="timeSetting.rounds"
    :label="$t('rounds')"

  )

  .my-8.flex.items-center.justify-between
    div
      Button(
        @click="toggleLanguage"
      )
        img(
          :src=`flag === 'ru'
                ? 'russia-flag-round-circle-icon.svg'
                : 'usa-flag-round-circle-icon.svg'`
          width=24
          height=24
        )
    div(class="w-7/12 sm:w-60")
      Button(@click="reset")
        div(class="text-sm sm:text-xl") {{ $t('resetSettings') }}
</template>
