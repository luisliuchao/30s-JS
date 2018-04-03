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
  arr.reduce((a ,v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), []);
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

// flatten
// Flattens an array up to the specified depth.
// Use recursion, decrementing depth by 1 for each level of depth. Use Array.reduce() and Array.concat() to merge elements or arrays. Base case, for depth equal to 1 stops recursion. Omit the second argument, depth to flatten only to a depth of 1 (single flatten).
const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);

// forEachRight
// Executes a provided function once for each array element, starting from the array's last element.
// Use Array.slice(0) to clone the given array, Array.reverse() to reverse it and Array.forEach() to iterate over the reversed array.
const forEachRight = (arr, callback) =>
  Array.slice().reverse().forEach(callback);

// groupBy
// Groups the elements of an array based on the given function.
// Use Array.map() to map the values of an array to a function or property name. Use Array.reduce() to create an object, where the keys are produced from the mapped results.
const groupBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, v, i) => (acc[v] = (acc[v] || []).concat(arr[i]), acc) , {});

// head
// Returns the head of a list.
// Use arr[0] to return the first element of the passed array.
const head = arr => arr[0];

// indexOfAll
// Returns all indices of val in an array. If val never occurs, returns [].
// Use Array.forEach() to loop over elements and Array.push() to store indices for matching elements. Return the array of indices.
const indexOfAll = (arr, val) =>
  Array.reduce((acc, v, i) => (v === val && acc.push(i), acc), []);

// initial
// Returns all the elements of an array except the last one.
// Use arr.slice(0,-1) to return all but the last element of the array.
const initial = arr => arr.slice(0, -1);

// initialize2DArray
// Initializes a 2D array of given width and height and value.
// Use Array.map() to generate h rows where each is a new array of size w initialize with value. If the value is not provided, default to null.
const initialize2DArray = (h, w, val = null) => Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

// initializeArrayWithRange
// Initializes an array containing the numbers in the specified range where start and end are inclusive with their common difference step.
// Use Array.from(Math.ceil((end+1-start)/step)) to create an array of the desired length(the amounts of elements is equal to (end-start)/step or (end+1-start)/step for inclusive end), Array.map() to fill with the desired values in a range. You can omit start to use a default value of 0. You can omit step to use a default value of 1.
const initializeArrayWithRange = (end, start, step = 1) =>
  Array.from({ length: Math.ceil((end + 1 - start) / step )}).map((v, i) => i * step + start);

// initializeArrayWithRangeRight
// Initializes an array containing the numbers in the specified range (in reverse) where start and end are inclusive with their common difference step.
// Use Array.from(Math.ceil((end+1-start)/step)) to create an array of the desired length(the amounts of elements is equal to (end-start)/step or (end+1-start)/step for inclusive end), Array.map() to fill with the desired values in a range. You can omit start to use a default value of 0. You can omit step to use a default value of 1.
const initializeArrayWithRangeRight = (end, start, step = 1) =>
  Array.from({ length: Math.ceil((end + 1 - start) / step )}).map((v, i) => (arr.length - i - 1) * step + start);

// initializeArrayWithValues
// Initializes and fills an array with the specified values.
// Use Array(n) to create an array of the desired length, fill(v) to fill it with the desired values. You can omit val to use a default value of 0.
const initializeArrayWithValues = (length, val = 0) => Array.from({length}).fill(val);

// intersection
// Returns a list of elements that exist in both arrays.
// Create a Set from b, then use Array.filter() on a to only keep values contained in b.
const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(v => s.has(v));
};

// intersectionBy
// Returns a list of elements that exist in both arrays, after applying the provided function to each array element of both.
// Create a Set by applying fn to all elements in b, then use Array.filter() on a to only keep elements, which produce values contained in b when fn is applied to them.
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.filter(v => s.has(fn(v)));
};

// intersectionWith
// Returns a list of elements that exist in both arrays, using a provided comparator function.
// Use Array.filter() and Array.findIndex() in combination with the provided comparator to determine intersecting values.
const intersectionWith = (a, b, comp) => a.filter(x => b.findIndex(y => comp(x,y)) !== -1);

// isSorted
// Returns 1 if the array is sorted in ascending order, -1 if it is sorted in descending order or 0 if it is not sorted.
// Calculate the ordering direction for the first two elements. Use Object.entries() to loop over array objects and compare them in pairs. Return 0 if the direction changes or the direction if the last element is reached.
const isSorted = arr => {
  let direction = -(arr[0] - arr[1]);
  for (let [i, val] of arr.entries()) {
    direction = !direction ? -(arr[i - 1] - arr[i]) : direction;
    if (i === arr.length - 1) return !direction ? 0 : direction;
    else if ((val - arr[i + 1]) * direction > 0) return 0;
  }
};

// join
// Joins all elements of an array into a string and returns this string. Uses a separator and an end separator.
// Use Array.reduce() to combine elements into a string. Omit the second argument, separator, to use a default separator of ','. Omit the third argument, end, to use the same value as separator by default.
const join = (arr, separator = ',', end = separator) => arr.reduce((acc, val, i) => acc + (i === arr.length - 1 ? end : separator) + val, '').slice(1);
// standard answer
const join = (arr, separator = ',', end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1 ? acc + val : acc + val + separator,
    ''
  );

// last
// Returns the last element in an array.
// Use arr.length - 1 to compute the index of the last element of the given array and returning it.
const last = arr => arr[-1];

// longestItem
// Takes any number of iterable objects or objects with a length property and returns the longest one.
// Use Array.sort() to sort all arguments by length, return the first (longest) one.<Paste>
const longestItem = (...vals) => vals.sort((a, b) => b.length - a.length)[0];

// mapObject
// Maps the values of an array to an object using a function, where the key-value pairs consist of the original value as the key and the mapped value.
// Use an anonymous inner function scope to declare an undefined memory space, using closures to store a return value. Use a new Array to store the array with a map of the function over its data set and a comma operator to return a second step, without needing to move from one context to another (due to closures and order of operations).
const mapObject = (arr, fn) =>
  (a => (
    (a = [arr, arr.map(fn)]), a[0].reduce((acc, val, ind) => ((acc[val] = a[1][ind]), acc), {})
  ))();

// maxN
// Returns the n maximum elements from the provided array. If n is greater than or equal to the provided array's length, then return the original array(sorted in descending order).
// Use Array.sort() combined with the spread operator (...) to create a shallow clone of the array and sort it in descending order. Use Array.slice() to get the specified number of elements. Omit the second argument, n, to get a one-element array.
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

// minN
// Returns the n minimum elements from the provided array. If n is greater than or equal to the provided array's length, then return the original array(sorted in ascending order).
// Use Array.sort() combined with the spread operator (...) to create a shallow clone of the array and sort it in ascending order. Use Array.slice() to get the specified number of elements. Omit the second argument, n, to get a one-element array.
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);

