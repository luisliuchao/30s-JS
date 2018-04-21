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
