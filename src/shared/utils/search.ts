export enum TimeType {
  PAST = 'PAST',
  FUTURE = 'FUTURE',
}

export function getSearchWhereTimeSqlStr(timeType: TimeType) {
  return timeType === TimeType.PAST ? 'end_time<=NOW()' : 'end_time>NOW()'
}
