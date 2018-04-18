// bindAll
// Binds methods of an object to the object itself, overwriting the existing method.
// Use Array.forEach() to return a function that uses Function.apply() to apply the given context (obj) to fn for each function specified.
const bindAll = (obj, ...fns) =>
  fns.forEach(fn => {
    const f = obj[fn];
    obj[fn] = function() {
      return f.apply(obj);
    };
  });


// deepClone
// Creates a deep clone of an object.
// Use recursion. Use Object.assign() and an empty object ({}) to create a shallow clone of the original. Use Object.keys() and Array.forEach() to determine which key-value pairs need to be deep cloned.
const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(key => {
    const value = clone[key];
    if (typeof value === 'object') {
      clone[key] = deepClone(value);
    }
  });
  return clone;
};

// defaults
// Assigns default values for all properties in an object that are undefined.
// Use Object.assign() to create a new empty object and copy the original one to maintain key order, use Array.reverse() and the spread operator ... to combine the default values from left to right, finally use obj again to overwrite properties that originally had a value.
const defaults = (obj, ...defs) => Object.assign({}, ...defs.reverse(), obj);

// equals
// Performs a deep comparison between two values to determine if they are equivalent.
// Check if the two values are identical, if they are both Date objects with the same time, using Date.getTime() or if they are both non-object values with an equivalent value (strict comparison). Check if only one value is null or undefined or if their prototypes differ. If none of the above conditions are met, use Object.keys() to check if both values have the same number of keys, then use Array.every() to check if every key in the first value exists in the second one and if they are equivalent by calling this method recursively.
const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a != 'object' && typeof b !== 'object')) return a === b;
  if (a === null || a === undefined || b === null || b === undefined) return false;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};

// findKey
// Returns the first key that satisfies the provided testing function. Otherwise undefined is returned.
// Use Object.keys(obj) to get all the properties of the object, Array.find() to test the provided function for each key-value pair. The callback receives three arguments - the value, the key and the object.
const findKey = (obj, fn) => Object.keys(obj).find(key => fn(obj[key], key, obj));

// findLastKey
// Returns the last key that satisfies the provided testing function. Otherwise undefined is returned.
// Use Object.keys(obj) to get all the properties of the object, Array.reverse() to reverse their order and Array.find() to test the provided function for each key-value pair. The callback receives three arguments - the value, the key and the object.
const findKey = (obj, fn) => Object.keys(obj).reverse().find(key => fn(obj[key], key, obj));

// flattenObject
// Flatten an object with the paths for keys.
// Use recursion. Use Object.keys(obj) combined with Array.reduce() to convert every leaf node to a flattened path node. If the value of a key is an object, the function calls itself with the appropriate prefix to create the path using Object.assign(). Otherwise, it adds the appropriate prefixed key-value pair to the accumulator object. You should always omit the second argument, prefix, unless you want every key to have a prefix.
const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, key) => {
    const pre = prefix ? `${prefix}.` : '';
    if (typeof obj[key] === 'object') Object.assign(acc, flattenObject(obj[key], pre + k));
    else acc[pre + k] = obj[key];
    return acc;
  }, {});

// forOwn
// Iterates over all own properties of an object, running a callback for each one.
// Use Object.keys(obj) to get all the properties of the object, Array.forEach() to run the provided function for each key-value pair. The callback receives three arguments - the value, the key and the object.
const forOwn = (obj, fn) => Object.keys(obj).forEach(key => fn(obj[key], key, obj));

// forOwnRight
// Iterates over all own properties of an object in reverse, running a callback for each one.
// Use Object.keys(obj) to get all the properties of the object, Array.reverse() to reverse their order and Array.forEach() to run the provided function for each key-value pair. The callback receives three arguments - the value, the key and the object.
const forOwnRight = (obj, fn) => Object.keys(obj).reverse().forEach(key => fn(obj[key], key, obj));

// functions
// Returns an array of function property names from own (and optionally inherited) enumerable properties of an object.
// Use Object.keys(obj) to iterate over the object's own properties. If inherited is true, use Object.get.PrototypeOf(obj) to also get the object's inherited properties. Use Array.filter() to keep only those properties that are functions. Omit the second argument, inherited, to not include inherited properties by default.
const functions = (obj, inherited = false) =>
  (
    inherited
    ? [...Object.keys(obj), ...Object.get.PrototypeOf(obj)]
    : Object.keys(obj)
  ).filter(key => typeof obj[key] === 'function');
