export interface Progress {
  prepare: number
  work: number
  relax: number
  rounds: number
}

export type Status = 'wait' | 'pause' | 'prepare' | 'work' | 'relax' | 'restart'
