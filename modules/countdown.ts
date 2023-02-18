import { Progress } from "~~/components/timer/types";

const defaultTimerSetting = {
  prepare: 3,
  work: 15,
  relax: 7,
  rounds: 15,
}
// const defaultTimerSetting = {
//   prepare: 3,
//   work: 4,
//   relax: 5,
//   rounds: 2,
// }

export const currentTimeSetting = { ...defaultTimerSetting }

function oneRoundTime() {
  return currentTimeSetting.relax + currentTimeSetting.work
}

// TODO: fix error for first round
export function allTime(obj: Progress, oneRound: number = oneRoundTime() ) {
  const completeRoundsTime = obj.rounds > 1 ? (obj.rounds - 1) * oneRound : 0
  return obj.prepare + (obj.work + obj.relax) + completeRoundsTime
}

function getResetProgress() {
  return { ...currentTimeSetting }
}

function tick(inputProgress: Progress, event = (name:string)=>{} ): Progress {
  const progress = { ...inputProgress }
  if( progress.prepare ){
    progress.prepare--
    if(!progress.prepare) {
      progress.rounds--
      event('beforeWork')
    }

  }
  else if( progress.work ){
    progress.work--
    !progress.work && event('beforeRelax')
  }
  else if( progress.relax ){
    progress.relax--
    !progress.relax && event('beforeWork')
  }

  if( progress.work || progress.relax  )
    return progress

  if( progress.rounds  ){
    progress.work = currentTimeSetting.work
    progress.relax = currentTimeSetting.relax
    progress.rounds--
    event('endRound')
  }
  else {
    event('end')
  }

  return progress
}

function getStatus(progress: Progress, running: boolean=false) {
  const progressTime = allTime(progress)
  const startTime = allTime(currentTimeSetting)
  const timeDifference = startTime - progressTime
  //  Waiting status
  if(!running){
    return progressTime === 0
      ? 'restart'
      : timeDifference === 0 ? 'wait' : 'pause'
  }
  //  Running status
  else if(running && progressTime){
    return progress.prepare
      ? 'prepare'
      : progress.work ? 'work' : 'relax'
  }
  return 'restart'
}

function toTimeFormat(seconds :number){
  return new Date(seconds * 1000).toISOString().substring(14, 19)
}

function toPositiveProgress(inputProgress :Progress){
  return {
    prepare: currentTimeSetting.prepare - inputProgress.prepare,
    work: currentTimeSetting.work - inputProgress.work,
    relax: currentTimeSetting.relax - inputProgress.relax,
    rounds: currentTimeSetting.rounds - inputProgress.rounds
  }
}

function timeLeft(progress: Progress) {
  const progressTime = allTime(toPositiveProgress(progress)) ?? 0
  const totalTime = allTime(currentTimeSetting) ?? 0
  const diffTime =  totalTime - progressTime
  return toTimeFormat((diffTime))
}


export const countdown  = {
  allTime,
  getResetProgress,
  getStatus,
  oneRoundTime,
  tick,
  toTimeFormat,
  timeLeft,
  toPositiveProgress,
}
