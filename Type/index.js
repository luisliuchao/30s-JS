// getType
// Returns the native type of a value.
// Returns lowercased constructor name of value, "undefined" or "null" if value is undefined or null.
const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();

// is
// Checks if the provided value is of the specified type.
// Ensure the value is not undefined or null using Array.includes(), and compare the constructor property on the value with type to check if the provided value is of the specified type.
const is = (type, value) => ![, null].includes(value) && val.constructor === type;

// isArrayLike
// Checks if the provided argument is array-like (i.e. is iterable).
// Use the spread operator (...) to check if the provided argument is iterable inside a try... catch block and the comma operator (,) to return the appropriate value.
const isArrayLike = val => {
  try {
    return [...val], true;
  } catch(e) {
    return false;
  }
};

// isBoolean
// Checks if the given argument is a native boolean element.
// Use typeof to check if a value is classified as a boolean primitive.
const isBoolean = val => typeof val === 'boolean'

// isEmpty
// Returns true if the a value is an empty object, collection, map or set, has no enumerable properties or is any type that is not considered a collection.
// Check if the provided value is null or if its length is equal to 0.
const isEmpty = val => val === null || !(Object.keys(val) || val).length;

// isFunction
// Checks if the given argument is a function.
// Use typeof to check if a value is classified as a function primitive.
const isFunction = val => typeof val === 'function';

// isNil
// Returns true if the specified value is null or undefined, false otherwise.
// Use the strict equality operator to check if the value and of val are equal to null or undefined.
const isNil = val => val === undefined || val === null;

// isNull
// Returns true if the specified value is null, false otherwise.
// Use the strict equality operator to check if the value and of val are equal to null.
const isNull = val => val === null;

// isNumber
// Checks if the given argument is a number.
// Use typeof to check if a value is classified as a number primitive.apply
const isNumber = val => typeof val === 'number';

// isObject
// Returns a boolean determining if the passed value is an object or not.
// Uses the Object constructor to create an object wrapper for the given value. If the value is null or undefined, create and return an empty object. Οtherwise, return an object of a type that corresponds to the given value.
const isObject = val => obj === Object(obj);

// isObjectLike
// Checks if a value is object-like.
// Check if the provided value is not null and its typeof is equal to 'object'.
const isObjectLike = val => val !== null && typeof val === 'object';

// isPlainObject
// Checks if the provided value is an object created by the Object constructor.
// Check if the provided value is truthy, use typeof to check if it is an object and Object.constructor to make sure the constructor is equal to Object.
const isPlainObject = val => !!val && typeof val === 'object' && val.constructor === Object;

// isPrimitive
// Returns a boolean determining if the passed value is primitive or not.
// Use Array.includes() on an array of type strings which are not primitive, supplying the type using typeof. Since typeof null evaluates to 'object', it needs to be directly compared.
const isPrimitive = val => !['object', 'function'].includes(typof val) || val === null;

// isPromiseLike
// Returns true if an object looks like a Promise, false otherwise.
// Check if the object is not null, its typeof matches either object or function and if it has a .then property, which is also a function.
const isPromiseLike = val =>
  obj !== null &&
    ['object', 'function'].includes(typeof val) &&
    typeof val.then === 'function';

// isString
// Checks if the given argument is a string.
// Use typeof to check if a value is classified as a string primitive.
const isString = val => typeof val === 'string';

// isSymbol
// Checks if the given argument is a symbol.
// Use typeof to check if a value is classified as a symbol primitive.
const isSymbol = val => typeof val === 'symbol';

// isUndefined
// Returns true if the specified value is undefined, false otherwise.
// Use the strict equality operator to check if the value and of val are equal to undefined.
const isUndefined = val => val === undefined;

// isValidJSON
// Checks if the provided argument is a valid JSON.
// Use JSON.parse() and a try... catch block to check if the provided argument is a valid JSON.
const isValidJSON = obj => {
  try {
    JSON.parse(obj);
    return true;
  } catch(e) {
    return false;
  }
};
