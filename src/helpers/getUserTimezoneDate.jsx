const getUserTimezoneDate = (date) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return new Date(date.toLocaleString("en-US", { timeZone: userTimeZone }));
}

export default getUserTimezoneDate
