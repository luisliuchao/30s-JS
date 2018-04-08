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
// Use Array.map() to map the values of an array to a function or property name. Use Array.reduce() to create an object, where the keys are produced from the mapped results.
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
// Use Array.sort() to sort all arguments by length, return the first (longest) one.
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

// none
// Returns true if the provided predicate function returns false for all elements in a collection, false otherwise.
// Use Array.some() to test if any elements in the collection return true based on fn. Omit the second argument, fn, to use Boolean as a default.
const none = (arr, fn = Boolean) = !arr.some(fn)

// nthElement
// Returns the nth element of an array.
// Use Array.slice() to get an array containing the nth element at the first place. If the index is out of bounds, return []. Omit the second argument, n, to get the first element of the array.
const nthEl = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0];

// partition
// Groups the elements into two arrays, depending on the provided function's truthiness for each element.
// Use Array.reduce() to create an array of two arrays. Use Array.push() to add elements for which fn returns true to the first array and elements for which fn returns false to the second one.
const partition = (arr, fn = Boolean) => arr.reduce((acc, v, i, arr) => (acc[fn(v, i, arr) ? 0 : 1].push(v), acc), [[], []]);

// permutations
// ⚠️ WARNING: This function's execution time increases exponentially with each array element. Anything more than 8 to 10 entries will cause your browser to hang as it tries to solve all the different combinations.
// Generates all permutations of an array's elements (contains duplicates).
// Use recursion. For each element in the given array, create all the partial permutations for the rest of its elements. Use Array.map() to combine the element with each partial permutation, then Array.reduce() to combine all permutations in one array. Base cases are for array length equal to 2 or 1.
const permutations = arr => arr.reduce((acc, item, i) =>
  acc.concat(
    permutations([...arr.slice(0, i), ...arr.slice(i+1)]).map(val => [item, ...val]);
  ), []);

// pull
// Mutates the original array to filter out the values specified.
// Use Array.filter() and Array.includes() to pull out the values that are not needed. Use Array.length = 0 to mutate the passed in an array by resetting it's length to zero and Array.push() to re-populate it with only the pulled values.
const pull = (arr, ...args) => {
  let argState = Array.isArray(args) ? args : args[0];
  let pulled = arr.filter(v => !args.include(v));
  // mutate the original array
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};

// pullAtIndex
// Mutates the original array to filter out the values at the specified indexes.
// Use Array.filter() and Array.includes() to pull out the values that are not needed. Use Array.length = 0 to mutate the passed in an array by resetting it's length to zero and Array.push() to re-populate it with only the pulled values. Use Array.push() to keep track of pulled values
const pullAtIndex = (arr, pullArr) => {
  const pulled = arr.filter((v, i) => !pullArr.include(i));
  // mutate the original array
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};

// pullAtValue
// Mutates the original array to filter out the values specified. Returns the removed elements.
// Use Array.filter() and Array.includes() to pull out the values that are not needed. Use Array.length = 0 to mutate the passed in an array by resetting it's length to zero and Array.push() to re-populate it with only the pulled values. Use Array.push() to keep track of pulled values
const pullAtValue = (arr, pullArr) => {
  let removed = [],
  pushToRemove = arr.forEach((v, i) => (pullArr.includes(v) ? removed.push(v) : v)),
  mutateTo = arr.filter((v, i) => !pullArr.includes(v));
  arr.length = 0;
  mutateTo.forEach(v => arr.push(v));
  return removed;
};

// pullBy
// Mutates the original array to filter out the values specified, based on a given iterator function.
// Check if the last argument provided in a function. Use Array.map() to apply the iterator function fn to all array elements. Use Array.filter() and Array.includes() to pull out the values that are not needed. Use Array.length = 0 to mutate the passed in an array by resetting it's length to zero and Array.push() to re-populate it with only the pulled values.
const pullBy = (arr, ...args) => {
  const length = args.length;
  let fn = length > 1 ? args[length - 1] : undefined;
  fn = typeof fn == 'function' ? (args.pop(), fn) : undefined;
  let argState = (Array.isArray(args[0]) ? args[0] : args).map(val => fn(val));
  let pulled = arr.filter((v, i) => !argState.includes(fn(v)));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};

// reducedFilter
// Filter an array of objects based on a condition while also filtering out unspecified keys.
// Use Array.filter() to filter the array based on the predicate fn so that it returns the objects for which the condition returned a truthy value. On the filtered array, use Array.map() to return the new object using Array.reduce() to filter out the keys which were not supplied as the keys argument.
const reducedFilter = (data, keys, fn) => data.filter(fn).map(el => keys.reduce((acc, key) => (acc[key] = el[key], acc), {}));

// reduceSuccessive
// Applies a function against an accumulator and each element in the array (from left to right), returning an array of successively reduced values.
// Use Array.reduce() to apply the given function to the given array, storing each new result.
const reduceSuccessive = (arr, fn, acc) => arr.reduce((res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i ,arr)), res), [acc]);

// reduceWhich
// Returns the minimum/maximum value of an array, after applying the provided function to set comparing rule.
// Use Array.reduce() in combination with the comparator function to get the appropriate element in the array. You can omit the second parameter, comparator, to use the default one that returns the minimum element in the array.
const reduceWhich = (arr, comp = (a, b) => a - b) => arr.reduce((a, b) => (comp(a ,b) >= 0 ? a : b));

// remove
// Removes elements from an array for which the given function returns false.
// Use Array.filter() to find array elements that return truthy values and Array.reduce() to remove elements using Array.splice(). The func is invoked with three arguments (value, index, array).
const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];

// sample
// Returns a random element from an array.
// Use Math.random() to generate a random number, multiply it by length and round it of to the nearest whole number using Math.floor(). This method also works with strings.
const sample = arr => arr[Math.floor(Math.random() * arr.length)];

// sampleSize
// Gets n random elements at unique keys from array up to the size of array.
// Shuffle the array using the Fisher-Yates algorithm. Use Array.slice() to get the first n elements. Omit the second argument, n to get only one element at random from the array.
const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};

// shuffle
// Randomizes the order of the values of an array, returning a new array.
// Uses the Fisher-Yates algorithm to reorder the elements of the array.
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

// similarity
// Returns an array of elements that appear in both arrays.
// Use Array.filter() to remove values that are not part of values, determined using Array.includes().
const similarity = (a, b) => {
  return a.filter(v => b.includes(v));
};

// sortedIndex
// Returns the lowest index at which value should be inserted into array in order to maintain its sort order.
// Check if the array is sorted in descending order (loosely). Use Array.findIndex() to find the appropriate index where the element should be inserted.
const sortedIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.findIndex(v => isDescending ? v <= n : v >= n);
  return index === -1 ? arr.length : index;
}

// sortedIndexBy
// Returns the lowest index at which value should be inserted into array in order to maintain its sort order, based on a provided iterator function.
// Check if the array is sorted in descending order (loosely). Use Array.findIndex() to find the appropriate index where the element should be inserted, based on the iterator function fn.
const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el => (isDescending ? val >= fn(el) : val <= fn(el)));
  return index === -1 ? arr.length : index;
}

// sortedLastIndex
// Returns the highest index at which value should be inserted into array in order to maintain its sort order.
// Check if the array is sorted in descending order (loosely). Use Array.reverse() and Array.findIndex() to find the appropriate last index where the element should be inserted.
const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.reverse().findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

// sortedLastIndexBy
// Returns the highest index at which value should be inserted into array in order to maintain its sort order, based on a provided iterator function.
// Check if the array is sorted in descending order (loosely). Use Array.map() to apply the iterator function to all elements of the array. Use Array.reverse() and Array.findIndex() to find the appropriate last index where the element should be inserted, based on the provided iterator function.
const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

// stableSort
// Performs stable sorting of an array, preserving the initial indexes of items when their values are the same. Does not mutate the original array, but returns a new array instead.
// Use Array.map() to pair each element of the input array with its corresponding index. Use Array.sort() and a compare function to sort the list, preserving their initial order if the items compared are equal. Use Array.map() to convert back to the initial array items
const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);

// symmetricDifference
// Returns the symmetric difference between two arrays.
// Create a Set from each array, then use Array.filter() on each of them to only keep values not contained in the other.
const symmetricDifference = (a, b) => {
  const A = new Set(a);
  const B = new Set(b);
  return [...a.filter(v => !B.has(v)), ...b.filter(v => !A.has(v))];
}

// symmetricDifferenceBy
// Returns the symmetric difference between two arrays, after applying the provided function to each array element of both.
// Create a Set by applying fn to each array's elements, then use Array.filter() on each of them to only keep values not contained in the other.
const symmetricDifferenceBy = (a, b, fn) => {
  const A = new Set(a.map(fn));
  const B = new Set((b.map(fn)));
  return [...a.filter(v => !B.has(fn(v))), ...b.filter(v => !A.has(fn(v)))];
};

// symmetricDifferenceWith
// Returns the symmetric difference between two arrays, using a provided function as a comparator.
// Use Array.filter() and Array.findIndex() to find the appropriate values.
const symmetricDifferenceWith => (a, b, comp) => [
  ...a.filter(x => b.findIndex(y => comp(x, y)) === -1),
  ...b.filter(x => a.findIndex(y => comp(x, y)) === -1),
];

// tail
// Returns all elements in an array except for the first one.
// Return Array.slice(1) if the array's length is more than 1, otherwise, return the whole array.
const tail = arr => arr.length > 1 ? arr.slice(1) : arr;

// take
// Returns an array with n elements removed from the beginning.
// Use Array.slice() to create a slice of the array with n elements taken from the beginning.
const take = (arr, n = 1) => arr.slice(0, n);

// takeRight
// Returns an array with n elements removed from the end.
// Use Array.slice() to create a slice of the array with n elements taken from the end.
const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);

// takeRightWhile
// Removes elements from the end of an array until the passed function returns true. Returns the removed elements.
// Loop through the array, using a for...of loop over Array.keys() until the returned value from the function is true. Return the removed elements, using Array.reverse() and Array.slice()
const takeRightWhile = (arr, fn) => {
  for (let i of arr.reverse.key())
    // arr.reverse will change the original arr value
    if (fn(arr[i])) return arr.slice(0, i);
  return arr;
}

// takeWhile
// Removes elements in an array until the passed function returns true. Returns the removed elements.
// Loop through the array, using a for...of loop over Array.keys() until the returned value from the function is true. Return the removed elements, using Array.slice()
const takeWhile = (arr, fn) => {
  for (let i of arr.keys())
    if (fn(arr[i])) return arr.slice(0, i);
  return arr;
};

// union
// Returns every element that exists in any of the two arrays once.
// Create a Set with all values of a and b and convert to an array.
const union = (a, b) => Array.from(new Set([...a, ...b]));

// unionBy
// Returns every element that exists in any of the two arrays once, after applying the provided function to each array element of both.
// Create a Set by applying all fn to all values of a. Create a Set from a and all elements in b whose value, after applying fn does not match a value in the previously created set. Return the last set converted to an array.
const unionBy = (a, b, fn) => {
  const A = new Set(a.map(fn));
  const B = new Set([...a, ...b.filter(x => !A.has(fn(x)))]);
  return Array.from(B);
};

// unionWith
// Returns every element that exists in any of the two arrays once, using a provided comparator function.
// Create a Set with all values of a and values in b for which the comparator finds no matches in a, using Array.findIndex().
const unionWith = (a, b, comp) => Array.from(new Set([...a, ...b.filter(x => a.findIndex(y => comp(x, y)) === -1)]));

// uniqueElements
// Returns all unique values of an array.
// Use ES6 Set and the ...rest operator to discard all duplicated values.
const uniqueElements = arr => Array.from(new Set(arr));
// stardard answer
// const uniqueElements = arr => [...new Set(arr)];

// unzip
// Creates an array of arrays, ungrouping the elements in an array produced by zip.
// Use Math.max.apply() to get the longest subarray in the array, Array.map() to make each element an array. Use Array.reduce() and Array.forEach() to map grouped values to individual arrays.
const unzip = arr =>
  arr.reduce((acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc), Array.from({
    length: Math.max(...arr.map(x => x.length)),
  }).map(x => [])
);

// unzipWith
// Creates an array of elements, ungrouping the elements in an array produced by zip and applying the provided function.
// Use Math.max.apply() to get the longest subarray in the array, Array.map() to make each element an array. Use Array.reduce() and Array.forEach() to map grouped values to individual arrays. Use Array.map() and the spread operator (...) to apply fn to each individual group of elements.
const unzipWith = (arr, fn) => unzip(arr).map(val => fn(...val));

// without
// Filters out the elements of an array, that have one of the specified values.
// Use Array.filter() to create an array excluding(using !Array.includes()) all given values.
// (For a snippet that mutates the original array see pull)
const without = (arr, ...args) => arr.filter(v => !args.include(v));

// xProd
// Creates a new array out of the two supplied by creating each possible pair from the arrays.
// Use Array.reduce(), Array.map() and Array.concat() to produce every possible pair from the elements of the two arrays and save them in an array.
const xProd = (a, b) => a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

// zip
// Creates an array of elements, grouped based on the position in the original arrays.
// Use Math.max.apply() to get the longest array in the arguments. Creates an array with that length as return value and use Array.from() with a map-function to create an array of grouped elements. If lengths of the argument-arrays vary, undefined is used where no value could be found.
const zip = (...arr) => {
  const maxLength = Math.max(...arr.map(x => x.length));
  return Array.from({length: maxLength}).map((_, i) => {
    return Array.from({length: arr.length}, (_, k) => arr[k][i]);
  });
};

// zipObject
// Given an array of valid property identifiers and an array of values, return an object associating the properties to the values.
// Since an object can have undefined values but not undefined property pointers, the array of properties is used to decide the structure of the resulting object using Array.reduce().
const zipObject = (props, values) => props.reduce((acc, prop, i) => (acc[prop] = values[i], acc), {});

// zipWith
// Creates an array of elements, grouped based on the position in the original arrays and using function as the last value to specify how grouped values should be combined.
// Check if the last argument provided is a function. Use Math.max() to get the longest array in the arguments. Creates an array with that length as return value and use Array.from() with a map-function to create an array of grouped elements. If lengths of the argument-arrays vary, undefined is used where no value could be found. The function is invoked with the elements of each group (...group).
const zipWith = (...arr, fn) => zip(...arr).map(val => fn(...val));
// standard answer
// const zipWith = (...array) => {
//   const fn = typeof array[array.length - 1] === 'function' ? array.pop() : undefined;
//   return Array.from(
//     { length: Math.max(...array.map(a => a.length)) },
//     (_, i) => (fn ? fn(...array.map(a => a[i])) : array.map(a => a[i]))
//   );
// };
