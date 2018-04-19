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

// get
// Retrieve a set of properties indicated by the given selectors from an object.
// Use Array.map() for each selector, String.replace() to replace square brackets with dots, String.split('.') to split each selector, Array.filter() to remove empty values and Array.reduce() to get the value indicated by it.
const get = (obj, ...selectors) =>
  [...selectors].map(s =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter(t => t !== '')
      .reduce((pre, cur) => prev && pre[cur], obj);
  );

// invertKeyValues
// Inverts the key-value pairs of an object, without mutating it. The corresponding inverted value of each inverted key is an array of keys responsible for generating the inverted value. If a function is supplied, it is applied to each inverted key.
// Use Object.keys() and Array.reduce() to invert the key-value pairs of an object and apply the function provided (if any). Omit the second argument, fn, to get the inverted keys without applying a function to them.
const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc;
  }, {});

// lowercaseKeys
// Creates a new object from the specified object, where all the keys are in lowercase.
// Use Object.keys() and Array.reduce() to create a new object from the specified object. Convert each key in the original object to lowercase, using String.toLowerCase().
const lowercaseKeys = obj =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()]= obj[key];
    return acc;
  }, {});

// mapKeys
// Creates an object with keys generated by running the provided function for each key and the same values as the provided object.
// Use Object.keys(obj) to iterate over the object's keys. Use Array.reduce() to create a new object with the same values and mapped keys using fn.
const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[fn(obj[key], key, obj)] = obj[key];
    return acc;
  }, {});

// mapValues
// Creates an object with the same keys as the provided object and values generated by running the provided function for each value.
// Use Object.keys(obj) to iterate over the object's keys. Use Array.reduce() to create a new object with the same keys and mapped values using fn.
const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {});

// matches
// Compares two objects to determine if the first one contains equivalent property values to the second one.
// Use Object.keys(source) to get all the keys of the second object, then Array.every(), Object.hasOwnProperty() and strict comparison to determine if all keys exist in the first object and have the same values.
const matches = (obj, source) =>
  Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);

// matchesWith
// Compares two objects to determine if the first one contains equivalent property values to the second one, based on a provided function.
// Use Object.keys(source) to get all the keys of the second object, then Array.every(), Object.hasOwnProperty() and the provided function to determine if all keys exist in the first object and have equivalent values. If no function is provided, the values will be compared using the equality operator.
const matchesWith = (obj, source, fn) =>
  Object.keys(source).every(
    key =>
      obj.hasOwnProperty(key) && fn
        ? fn(obj[key], source[key], key, obj, source)
        : obj[key] == source[key]
  );

// merge
// Creates a new object from the combination of two or more objects.
// Use Array.reduce() combined with Object.keys(obj) to iterate over all objects and keys. Use hasOwnProperty() and Array.concat() to append values for keys existing in multiple objects.<Paste>
const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
    Object.keys(obj).reduce((a, k) => {
      acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];
      return acc;
    }, {})
  )

// nest
// Given a flat array of objects linked to one another, it will nest them recursively. Useful for nesting comments, such as the ones on reddit.com.
// Use recursion. Use Array.filter() to filter the items where the id matches the link, then Array.map() to map each one to a new object that has a children property which recursively nests the items based on which ones are children of the current item. Omit the second argument, id, to default to null which indicates the object is not linked to another one (i.e. it is a top level object). Omit the third argument, link, to use 'parent_id' as the default property which links the object to another one by its id.


// objectFromPairs
// Creates an object from the given key-value pairs.
// Use Array.reduce() to create and combine key-value pairs.

