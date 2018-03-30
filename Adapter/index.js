// ary
// Creates a function that accepts up to n arguments, ignoring any additional arguments.
const arr = (fn) => (...args) => fn(...args.slice(0, n));

// call
// Given a key and a set of arguments, call them when given a context. Primarily useful in composition.
// Use a closure to call a stored key with stored arguments.
const call = (key, ...args) => (context) => context[key](...args);

// collectInto
// Changes a function that accepts an array into a variadic function.
// Given a function, return a closure that collects all inputs into an array-accepting function.
const collectInto = fn => (args) => fn(...args);

// flip
// Flip takes a function as an argument, then makes the first argument the last.
// Return a closure that takes variadic inputs, and splices the last argument to make it the first argument before applying the rest.
const flip = fn => (first, ...last) => fn(...last, first);

// over
// Creates a function that invokes each provided function with the arguments it receives and returns the results.
// Use Array.map() and Function.apply() to apply each function to the given arguments.
const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args));

// overArgs
// Creates a function that invokes the provided function with its arguments transformed.
// Use Array.map() to apply transforms to args in combination with the spread operator (...) to pass the transformed arguments to fn.
const overArgs = (fn, transforms) => (...args) => fn.apply(null, args.map((val, i) => transforms[i](val)));

// pipeAsyncFunctions
// Performs left-to-right function composition for asynchronous functions.
// Use Array.reduce() with the spread operator (...) to perform left-to-right function composition using Promise.then(). The functions can return a combination of: simple values, Promise's, or they can be defined as async ones returning through await. All functions must be unary.
const pipeAsyncFunction = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

// promisify
// Converts an asynchronous function to return a promise.
// Use currying to return a function returning a Promise that calls the original function. Use the ...rest operator to pass in all the parameters.
const promisify = (fn) => (...args) =>
	new Promise(resolve, reject) {
		fn(...args, (err, result) => err ? reject(err) : resolve(result));
	};

// rearg
// Creates a function that invokes the provided function with its arguments arranged according to the specified indexes.
// Use Array.reduce() and Array.indexOf() to reorder arguments based on indexes in combination with the spread operator (...) to pass the transformed arguments to fn.
const rearg = (fn, indexes) => (...args) =>
  fn(
    ...args.reduce((acc, val, i) => (acc[indexes.indexOf(i)] = val, acc), Array.from({ length: indexes.length }))
  )

// spreadOver
// Takes a variadic function and returns a closure that accepts an array of arguments to map to the inputs of the function.
// Use closures and the spread operator (...) to map the array of arguments to the inputs of the function.
const spreadOver = fn => (args) => fn(...args);

// unary
// Creates a function that accepts up to one argument, ignoring any additional arguments.
// Call the provided function, fn, with just the first argument given.
const unary = fn => (val) => fn(val);

