export const localTime = (timeZoneOffset?: string) => {
  console.log('TimeZoneOffset', timeZoneOffset)
  if (timeZoneOffset) {
    const offsetInMilliseconds = parseInt(timeZoneOffset, 10) * 60 * 1000

    const localDateTime = new Date(new Date().getTime() - offsetInMilliseconds).toISOString()

    console.log('localDateTime =>=> ', localDateTime)

    return localDateTime
  }
}
