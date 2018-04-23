// byteSize
// Returns the length of a string in bytes.
// Convert a given string to a Blob Object and find its size.
const byteSize = str => (new Blob([str])).size();

// capitalize
// Capitalizes the first letter of a string.
// Use array destructuring and String.toUpperCase() to capitalize first letter, ...rest to get array of characters after first letter and then Array.join('') to make it a string again. Omit the lowerRest parameter to keep the rest of the string intact, or set it to true to convert to lowercase.
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

// capitalizeEveryWord
// Capitalizes the first letter of every word in a string.
// Use String.replace() to match the first character of each word and String.toUpperCase() to capitalize it.
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

// decapitalize
// Decapitalizes the first letter of a string.
// Use array destructuring and String.toLowerCase() to decapitalize first letter, ...rest to get array of characters after first letter and then Array.join('') to make it a string again. Omit the upperRest parameter to keep the rest of the string intact, or set it to true to convert to uppercase.
const decapitalize = ([first, ...rest], upperRest = false) =>
  first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join(''));

// escapeHTML
// Escapes a string for use in HTML.
// Use String.replace() with a regexp that matches the characters that need to be escaped, using a callback function to replace each character instance with its associated escaped character using a dictionary (object).
const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );

// escapeRegExp
// Escapes a string to use in a regular expression.
// Use String.replace() to escape special characters.
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// fromCamelCase
// Converts a string from camelcase.
// Use String.replace() to remove underscores, hyphens, and spaces and convert words to camelcase. Omit the second argument to use a default separator of _.
const fromCamelCase = (str, separator = '_') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();

// isAbsoluteURL
// Returns true if the given string is an absolute URL, false otherwise.
// Use a regular expression to test if the string is an absolute URL.
const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);

// isAnagram
// Checks if a string is an anagram of another string (case-insensitive, ignores spaces, punctuation and special characters).
// Use String.toLowerCase(), String.replace() with an appropriate regular expression to remove unnecessary characters, String.split(''), Array.sort() and Array.join('') on both strings to normalize them, then check if their normalized forms are equal.<Paste>
const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

// isLowerCase
// Checks if a string is lower case.
// Convert the given string to lower case, using String.toLowerCase() and compare it to the original.
const isLowerCase = str => str === str.toLowerCase();

// isUpperCase
// Checks if a string is upper case.
// Convert the given string to upper case, using String.toUpperCase() and compare it to the original.
const isUpperCase = str => str === str.toUpperCase();

// mask
// Replaces all but the last num of characters with the specified mask character.
// Use String.slice() to grab the portion of the characters that need to be masked and use String.replace() with a regexp to replace every character with the mask character. Concatenate the masked characters with the remaining unmasked portion of the string. Omit the second argument, num, to keep a default of 4 characters unmasked. If num is negative, the unmasked characters will be at the start of the string. Omit the third argument, mask, to use a default character of '*' for the mask.
const mask = (cc, num= 4, mask = '*') =>
  ('' + cc).slice(0, -num).replace(/./g, mask) + ('' + cc).slice(-num);

// pad
// Pads a string on both sides with the specified character, if it's shorter than the specified length.
// Use String.padStart() and String.padEnd() to pad both sides of the given string. Omit the third argument, char, to use the whitespace character as the default padding character.
const pad = (str, length, char = ' ') =>
  str.padStart((str.length + length)/2, char).padEnd(length, char);

// palindrome
// Returns true if the given string is a palindrome, false otherwise.
// Convert string String.toLowerCase() and use String.replace() to remove non-alphanumeric characters from it. Then, String.split('') into individual characters, Array.reverse(), String.join('') and compare to the original, unreversed string, after converting it String.tolowerCase().
const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === s.split('').reverse().join('');
};

// pluralize
// Returns the singular or plural form of the word based on the input number. If the first argument is an object, it will use a closure by returning a function that can auto-pluralize words that don't simply end in s if the supplied dictionary contains the word.
// If num is either -1 or 1, return the singular form of the word. If num is any other number, return the plural form. Omit the third argument to use the default of the singular word + s, or supply a custom pluralized word when necessary. If the first argument is an object, utilize a closure by returning a function which can use the supplied dictionary to resolve the correct plural form of the word.
const pluralize = (val, word, plural = word + 's') => {
  const _pluralize = (num, word, plural = word + 's') =>
    [1, -1].includes(Number(num)) ? word : plural;
  if (typeof val === 'object') return (num, word) => _pluralize(num, word, val[word]);
  return _pluralize(val, word, plural);
};

// removeNonASCII
// Removes non-printable ASCII characters.
// Use a regular expression to remove non-printable ASCII characters.
const removeNonASCII = str => str.replace(/[^\x20-\x7E]/g, '');

// reverseString
// Reverses a string.
// Use the spread operator (...) and Array.reverse() to reverse the order of the characters in the string. Combine characters to get a string using String.join('').
const reverseString = str => [...str].reverse().join();

// sortCharactersInString
// Alphabetically sorts the characters in a string.
// Use the spread operator (...), Array.sort() and String.localeCompare() to sort the characters in str, recombine using String.join('').
const sortCharacterInString = str => [...str].sort((a, b) => a.localeCompare(b)).join();

// splitLines
// Splits a multiline string into an array of lines.
// Use String.split() and a regular expression to match line breaks and create an array.
const splitLines = str => str.split(/\r?\n/);

// stripHTMLTags
// Removes HTML/XML tags from string.
// Use a regular expression to remove HTML/XML tags from a string.
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');

// toCamelCase
// Converts a string to camelcase.
// Break the string into words and combine them capitalizing the first letter of each word, using a regexp.
const toCamelCase = str => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

// toKebabCase
// Converts a string to kebab case.
// Break the string into words and combine them adding - as a separator, using a regexp.
const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

// toSnakeCase
// Converts a string to snake case.
// Break the string into words and combine them adding _ as a separator, using a regexp.
const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');

// truncateString
// Truncates a string up to a specified length.
// Determine if the string's length is greater than num. Return the string truncated to the desired length, with '...' appended to the end or the original string.
const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

// unescapeHTML
// Unescapes escaped HTML characters.
// Use String.replace() with a regex that matches the characters that need to be unescaped, using a callback function to replace each escaped character instance with its associated unescaped character using a dictionary (object).
const unescapeHTML = str =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
      }[tag] || tag)
  );

// URLJoin
// Joins all given URL segments together, then normalizes the resulting URL.
// Use String.join('/') to combine URL segments, then a series of String.replace() calls with various regexps to normalize the resulting URL (remove double slashes, add proper slashes for protocol, remove slashes before parameters, combine parameters with '&' and normalize first parameter delimiter).
const URLJoin = (...args) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');

// words
// Converts a given string into an array of words.
// Use String.split() with a supplied pattern (defaults to non-alpha as a regexp) to convert to an array of strings. Use Array.filter() to remove any empty strings. Omit the second argument to use the default regexp.
const words = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean);

