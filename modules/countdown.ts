import { Progress } from "~~/components/timer/types";

const defaultTimerSetting = {
  prepare: 3,
  work: 15,
  relax: 7,
  rounds: 15,
}

export const currentTimeSetting = { ...defaultTimerSetting }

function oneRoundTime() {
  return currentTimeSetting.relax + currentTimeSetting.work
}

export function allTime(obj: Progress, oneRound: number = oneRoundTime() ) {
  return obj.prepare + obj.rounds * oneRound + (obj.work + obj.relax)
}

function getResetProgress() {
  return { ...currentTimeSetting }
}

function tick( inputProgress: Progress, event = (name:string)=>{} ): Progress {
  const progress = { ...inputProgress }
  if( progress.prepare ){
    progress.prepare--
    !progress.prepare && event('beforeWork')
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
  else if(running){
    return progress.prepare
    ? 'prepare'
    : progress.work ? 'work' : 'relax'
  }
  // For exception
  return 'restart'
}

export const countdown  = {
  allTime,
  getResetProgress,
  getStatus,
  oneRoundTime,
  tick
}
