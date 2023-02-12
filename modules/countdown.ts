import { Progress } from "~~/components/timer/types";

export function allTime(obj: Progress, oneRound: number) {
  // return Object.values(obj).reduce((acc, v) => acc + v, 0)
  return obj.prepare + obj.rounds * oneRound + (obj.work + obj.relax)
}
