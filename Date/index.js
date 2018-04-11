// formatDuration
// Returns the human readable format of the given number of milliseconds.
// Divide ms with the appropriate values to obtain the appropriate values for day, hour, minute, second and millisecond. Use Object.entries() with Array.filter() to keep only non-zero values. Use Array.map() to create the string for each value, pluralizing appropriately. Use String.join(', ') to combine the values into a string.
const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day : Math.floor(ms / (60 * 60 * 24 * 1000)),
    hour: Math.floor(ms / (60 * 60 * 1000)) % 24,
    miniute: Math.floor(ms / (60 * 1000)) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(val => `${val[1]} ${val[1] === 1 ? val[0] : `${val[0]}s`}`)
    .join(', ');
};

// getColonTimeFromDate
// Returns a string of the form HH:MM:SS from a Date object.
// Use Date.toString() and String.slice() to get the HH:MM:SS part of a given Date object.
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);

// getDaysDiffBetweenDates
// Returns the difference (in days) between two dates.
// Calculate the difference (in days) between two Date objects.
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 2);

// getMeridiemSuffixOfInteger
// Converts an integer to a suffixed string, adding am or pm based on its value.
// Use the modulo operator (%) and conditional checks to transform an integer to a stringified 12-hour format with meridiem suffix.
const getMeridiemSuffixOfInteger = num =>
    num === 0 || num === 24
      ? 12 + 'am'
      : num === 12 ? 12 + 'pm' : num < 12 ? num % 12 + 'am' : num % 12 + 'pm';

// tomorrow
// Results in a string representation of tomorrow's date. Use new Date() to get today's date, adding one day using Date.getDate() and Date.setDate(), and converting the Date object to a string.
const tomorrow = (long = false) => {
  let t = new Date();
  t.setDate(t.getDate() + 1);
  const ret = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(
    t.getDate()
  ).padStart(2, '0')}`;
  return !long ? ret : `${ret}T00:00:00`;
};
