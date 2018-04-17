// atob
// Decodes a string of data which has been encoded using base-64 encoding.
// Create a Buffer for the given string with base-64 encoding and use Buffer.toString('binary') to return the decoded string.
const atob = str => new Buffer(str, 'base64').toString('binary');

// btoa
// Creates a base-64 encoded ASCII string from a String object in which each character in the string is treated as a byte of binary data.
// Create a Buffer for the given string with binary encoding and use Buffer.toString('base64') to return the encoded string.
const btoa = str => new Buffer(str, 'binary').toString('base64');

// colorize
// Add special characters to text to print in color in the console (combined with console.log()).
// Use template literals and special characters to add the appropriate color code to the string output. For background colors, add a special character that resets the background color at the end of the string.
const colorize = (...args) => ({
  black: `\x1b[30m${args.join(' ')}`,
  red: `\x1b[31m${args.join(' ')}`,
  green: `\x1b[32m${args.join(' ')}`,
  yellow: `\x1b[33m${args.join(' ')}`,
  blue: `\x1b[34m${args.join(' ')}`,
  magenta: `\x1b[35m${args.join(' ')}`,
  cyan: `\x1b[36m${args.join(' ')}`,
  white: `\x1b[37m${args.join(' ')}`,
  bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
});

// hasFlags
// Check if the current process's arguments contain the specified flags.
// Use Array.every() and Array.includes() to check if process.argv contains all the specified flags. Use a regular expression to test if the specified flags are prefixed with - or -- and prefix them accordingly.
const hasFlags = (...flags) =>
  flas.every(flag => process.args.includes(/^-{1,2}/.test(flag) ? flag : `--${flag}`));

// hashNode
// Creates a hash for a value using the SHA-256 algorithm. Returns a promise.
// Use crypto API to create a hash for the given value.
const crypto = require('crypto');
const hashNode = val =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          crypto
            .createHash('sha256')
            .update(val)
            .digest('hex')
        ),
      0
    )
  );

// isTravisCI
// Checks if the current environment is Travis CI.
// Checks if the current environment has the TRAVIS and CI environment variables (reference).
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;

// JSONToFile
// Writes a JSON object to a file.
// Use fs.writeFile(), template literals and JSON.stringify() to write a json object to a .json file.
const fs = require('fs');
const JSONToFile = (obj, filename) =>
  fs.writeFile(`${filename}.json`, JSON.stringify(obj, null, 2));

// readFileLines
// Returns an array of lines from the specified file.
// Use readFileSync function in fs node package to create a Buffer from a file. convert buffer to string using toString(encoding) function. creating an array from contents of file by spliting file content line by line (each \n)
const fs = require('fs');
const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');

// untildify
// Converts a tilde path to an absolute path.
// Use String.replace() with a regular expression and OS.homedir() to replace the ~ in the start of the path with the home directory.
const untildify = str => str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

// UUIDGeneratorNode
// Generates a UUID in Node.JS.
// Use crypto API to generate a UUID, compliant with RFC4122 version 4.
const crypto = require('crypto');
const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

