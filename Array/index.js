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
  return a.filter((v) => !s.has(v));
}
