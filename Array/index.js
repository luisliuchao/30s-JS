// all
// Returns true if the provided predicate function returns true for all elements in a collection, false otherwise.
// Use Array.every() to test if all elements in the collection return true based on fn. Omit the second argument, fn, to use Boolean as a default.
const all = (arr, fn = Boolean) => arr.every(fn);

// any
// Returns true if the provided predicate function returns true for at least one element in a collection, false otherwise.
// Use Array.some() to test if any elements in the collection return true based on fn. Omit the second argument, fn, to use Boolean as a default.
const any = (arr, fn = Boolean) => arr.some(fn);

// bifurcate
// Splits values into two groups. If an element in filter is truthy, the corresponding element in the collection belongs to the first group; otherwise, it belongs to the second group.
// Use Array.reduce() and Array.push() to add elements to groups, based on filter.
const bifurate= (arr, filter) =>
  arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [[], []])

// bifurcateBy
// Splits values into two groups according to a predicate function, which specifies which group an element in the input collection belongs to. If the predicate function returns a truthy value, the collection element belongs to the first group; otherwise, it belongs to the second group.
// Use Array.reduce() and Array.push() to add elements to groups, based on the value returned by fn for each element.
const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0: 1].push(val), acc), [[], []]);

// chunk
// Chunks an array into smaller arrays of a specified size.
// Use Array.from() to create a new array, that fits the number of chunks that will be produced. Use Array.slice() to map each element of the new array to a chunk the length of size. If the original array can't be split evenly, the final chunk will contain the remaining elements.
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length/size) }, (v, i) => arr.slice(i * size, i * size + size));

// compact
// Removes falsey values from an array.
// Use Array.filter() to filter out falsey values (false, null, 0, "", undefined, and NaN).
const compact = (arr) => arr.filter(Boolean);

// countBy
// Groups the elements of an array based on the given function and returns the count of elements in each group.
// Use Array.map() to map the values of an array to a function or property name. Use Array.reduce() to create an object, where the keys are produced from the mapped results.<Paste>
const countBy(arr, fn) =>
  arr.map(typeof fn === 'function' ? fn: val[fn]).reduce((acc, val, i) => (acc[val] = (acc[val] || 0) + 1, acc), {});

// countOccurrences
// Counts the occurrences of a value in an array.
// Use Array.reduce() to increment a counter each time you encounter the specific value inside the array.
const countOccurances = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1: a), 0);

// deepFlatten
// Deep flattens an array.
// Use recursion. Use Array.concat() with an empty array ([]) and the spread operator (...) to flatten an array. Recursively flatten each element that is an array.
const deepFlatten = (arr) =>
  arr.reduce((acc, val) => (Array.isArray(val) ? acc = acc.concat(deepFlatten(val)) : acc.push(val), acc), [])
// standard answer
const deepFlatten = (arr) => [].concat(...arr.map(v) => (Arra.isArray(v) ? deepFlatten(v) : v));

// difference
// Returns the difference between two arrays.
// Create a Set from b, then use Array.filter() on a to only keep values not contained in b.
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(v => !s.has(v));
}

// differenceBy
// Returns the difference between two arrays, after applying the provided function to each array element of both.
// Create a Set by applying fn to each element in b, then use Array.filter() in combination with fn on a to only keep values not contained in the previously created set.
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.filter(v => !s.has(fn(v)));
}

// differenceWith
// Filters out all values from an array for which the comparator function does not return true.
// Use Array.filter() and Array.findIndex() to find the appropriate values.
const differenceWith = (arr, val, comp) => arr.filter(a => val.findIndex(b => comp(a, b)) === -1)

// drop
// Returns a new array with n elements removed from the left.
// Use Array.slice() to slice the remove the specified number of elements from the left.
const drop = (arr, n = 1) => arr.slice(n);

// dropRight
// Returns a new array with n elements removed from the right.
// Use Array.slice() to slice the remove the specified number of elements from the right.
const dropRight = (arr, n = 1) => arr.slice(0, -n);

// dropRightWhile
// Removes elements from the end of an array until the passed function returns true. Returns the remaining elements in the array.
// Loop through the array, using Array.slice() to drop the last element of the array until the returned value from the function is true. Returns the remaining elements.
cosnt dropRightWhile = (arr, fn) => {
  while (arr.length > 0 && !fn(arr[arr.length - 1])) arr = arr.slice(0, -1);
  return arr;
};

// dropWhile
// Removes elements in an array until the passed function returns true. Returns the remaining elements in the array.
// Loop through the array, using Array.slice() to drop the first element of the array until the returned value from the function is true. Returns the remaining elements.
const dropWhile = (arr, fn) => {
  while (arr.length > 0 && !fn(arr[0])) arr = arr.slice(1);
  return arr;
};

// everyNth
// Returns every nth element in an array.
// Use Array.filter() to create a new array that contains every nth element of a given array.
const everyNth = (arr, n) => arr.filter((v, i) => i % n === n - 1);

// filterNonUnique
// Filters out the non-unique values in an array.
// Use Array.filter() for an array containing only the unique values.
const filterNonUnique = arr => arr.filter(v => arr.indexOf(v) === arr.lastIndexOf(v));

// findLast
// Returns the last element for which the provided function returns a truthy value.
// Use Array.filter() to remove elements for which fn returns falsey values, Array.slice(-1) to get the last one.
const findLast = (arr, fn) => arr.filter(fn).slice(-1)[0];

// findLastIndex
// Returns the index of the last element for which the provided function returns a truthy value.
// Use Array.map() to map each element to an array with its index and value. Use Array.filter() to remove elements for which fn returns falsey values, Array.slice(-1) to get the last one.
const findLastIndex = (arr, fn) => arr.map((v, i) => [i, v]).filter(val => fn(val[1], val[0], arr)).slice(-1)[0][0]

