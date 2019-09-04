export function DbTimeToTimestamp(time: string): number {
  const date = new Date(time)

  return Number((date.getTime() / 1000).toFixed(0))
}
