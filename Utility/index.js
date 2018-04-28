// castArray
// Casts the provided value as an array if it's not one.
// Use Array.isArray() to determine if val is an array and return it as-is or encapsulated in an array accordingly.
const castArray = val => Array.isArray(val) ? val : [val];

// cloneRegExp
// Clones a regular expression.
// Use new RegExp(), RegExp.source and RegExp.flags to clone the given regular expression.
const cloneRegExp = regExp => new RegExp(regExp.source, RegExp.flags);

// coalesce
// Returns the first non-null/undefined argument.
// Use Array.find() to return the first non null/undefined argument.
const coalesce = (...args) => args.find(_ => ![undefined, null].includes(_));

// coalesceFactory
// Returns a customized coalesce function that returns the first argument that returns true from the provided argument validation function.
// Use Array.find() to return the first argument that returns true from the provided argument validation function.
const coalesceFactory = valid => (...args) => args.find(valid);

// extendHex
// Extends a 3-digit color code to a 6-digit color code.
// Use Array.map(), String.split() and Array.join() to join the mapped array for converting a 3-digit RGB notated hexadecimal color-code to the 6-digit form. Array.slice() is used to remove # from string start since it's added once.
const extendHex = shortHex =>
  '#' + shortHex.slice(shortHex.startWith('#') ? 1 : 0).split('').map(x => x + x).join('');

// getURLParameters
// Returns an object containing the parameters of the current URL.
// Use String.match() with an appropriate regular expression to get all key-value pairs, Array.reduce() to map and combine them into a single object. Pass location.search as the argument to apply to the current url.
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );

// hexToRGB
// Converts a color code to a rgb() or rgba() string if alpha value is provided.
// Use bitwise right-shift operator and mask bits with & (and) operator to convert a hexadecimal color code (with or without prefixed with #) to a string with the RGB values. If it's 3-digit color code, first convert to 6-digit version. If an alpha value is provided alongside 6-digit hex, give rgba() string in return.
const hexToRGB = hex => {
  let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : '') +
    ')'
  );
};

// httpGet
// Makes a GET request to the passed URL.
// Use XMLHttpRequest web api to make a get request to the given url. Handle the onload event, by calling the given callback the responseText. Handle the onerror event, by running the provided err function. Omit the third argument, err, to log errors to the console's error stream by default.
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHTTPRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};

// httpPost
// Makes a POST request to the passed URL.
// Use XMLHttpRequest web api to make a post request to the given url. Set the value of an HTTP request header with setRequestHeader method. Handle the onload event, by calling the given callback the responseText. Handle the onerror event, by running the provided err function. Omit the third argument, data, to send no data to the provided url. Omit the fourth argument, err, to log errors to the console's error stream by default.
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};

// isBrowser
// Determines if the current runtime environment is a browser so that front-end modules can run on the server (Node) without throwing errors.
// Use Array.includes() on the typeof values of both window and document (globals usually only available in a browser environment unless they were explicitly defined), which will return true if one of them is undefined. typeof allows globals to be checked for existence without throwing a ReferenceError. If both of them are not undefined, then the current environment is assumed to be a browser.
const isBrowser = () => ![typeof window, typeof document].includes('undefined');

// mostPerformant
// Returns the index of the function in an array of functions which executed the fastest.
// Use Array.map() to generate an array where each value is the total time taken to execute the function after iterations times. Use the difference in performance.now() values before and after to get the total time in milliseconds to a high degree of accuracy. Use Math.min() to find the minimum execution time, and return the index of that shortest time which corresponds to the index of the most performant function. Omit the second argument, iterations, to use a default of 10,000 iterations. The more iterations, the more reliable the result but the longer it will take.
const mostPerformant = (fns, iterations = 1000) => {
  const times = fns.map(fn => {
    const before = performance.now();
    for (let i = 0; i < iterations; i += 1) fn();
    return performance.now() - before;
  });
  return times.indexOf(Math.min(...times));
};

// nthArg
// Creates a function that gets the argument at index n. If n is negative, the nth argument from the end is returned.
// Use Array.slice() to get the desired argument at index n.
const nthArg = n => (...args) => args.slice(n)[0];

// parseCookie
// Parse an HTTP Cookie header string and return an object of all cookie name-value pairs.
// Use String.split(';') to separate key-value pairs from each other. Use Array.map() and String.split('=') to separate keys from values in each pair. Use Array.reduce() and decodeURIComponent() to create an object with all key-value pairs.
const parseCookie = str =>
  str.split(';').map(v => v.split('=')).reduce((acc, val) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }. {});

// prettyBytes
// Converts a number in bytes to a human-readable string.
// Use an array dictionary of units to be accessed based on the exponent. Use Number.toPrecision() to truncate the number to a certain number of digits. Return the prettified string by building it up, taking into account the supplied options and whether it is negative or not. Omit the second argument, precision, to use a default precision of 3 digits. Omit the third argument, addSpace, to add space between the number and unit by default.
const prettyBytes = (num, precision = 3, addSpace = true) => {
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
  const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
  const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision));
  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
};

// randomHexColorCode
// Generates a random hexadecimal color code.
// Use Math.random to generate a random 24-bit(6x4bits) hexadecimal number. Use bit shifting and then convert it to an hexadecimal String using toString(16)
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

// RGBToHex
// Converts the values of RGB components to a color code.
// Convert given RGB parameters to hexadecimal string using bitwise left-shift operator (<<) and toString(16), then String.padStart(6,'0') to get a 6-digit hexadecimal value.
const RGBToHex = (r, g, b) => ((r << 16) + (g << 16) + b).toString(16).padStart(6, '0');

// serializeCookie
// Serialize a cookie name-value pair into a Set-Cookie header string.
// Use template literals and encodeURIComponent() to create the appropriate string.
const serializeCookie = (name, val) => `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

// timeTaken
// Measures the time taken by a function to execute.
// Use console.time() and console.timeEnd() to measure the difference between the start and end times to determine how long the callback took to execute.
const timeTaken = (callback) => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
}

// toCurrency
// Take a number and return specified currency formatting.
// Use Intl.NumberFormat to enable country / currency sensitive formatting.
const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(n);

// toDecimalMark
// Use toLocaleString() to convert a float-point arithmetic to the Decimal mark form. It makes a comma separated string from a number.
const toDecimalMark = num => num.toLocaleString('en-US');

// toOrdinalSuffix
// Adds an ordinal suffix to a number.
// Use the modulo operator (%) to find values of single and tens digits. Find which ordinal pattern digits match. If digit is found in teens pattern, use teens ordinal.
const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

// validateNumber
// Returns true if the given value is a number, false otherwise.
// Use !isNaN() in combination with parseFloat() to check if the argument is a number. Use isFinite() to check if the number is finite. Use Number() to check if the coercion holds.
const validateNumber = num => !isNaN(parseFloat(num)) && isFinite(num) && Number(num) === num;

// yesNo
// Returns true if the string is y/yes or false if the string is n/no.
// Use RegExp.test() to check if the string evaluates to y/yes or n/no. Omit the second argument, def to set the default answer as no.
const yesNo = (str, def = false) => {
  /^(y|yes)$/i.test(str) ? true: /^(n|no)$/i.test(str) ? false : def;
};

