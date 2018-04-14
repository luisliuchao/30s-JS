// attempt
// Attempts to invoke a function with the provided arguments, returning either the result or the caught error object.
// Use a try... catch block to return either the result of the function or an appropriate error.
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch(e) (
    return e instanceof Error ? e : new Error(e);
  )
};

// bind
// Creates a function that invokes fn with a given context, optionally adding any additional supplied parameters to the beginning of the arguments.
// Return a function that uses Function.apply() to apply the given context to fn. Use Array.concat() to prepend any additional supplied parameters to the arguments.
const bind = (fn, context, ...args) => {
  return () => fn.apply(context, args.concat(...arguments));
};

// bindKey
// Creates a function that invokes the method at a given key of an object, optionally adding any additional supplied parameters to the beginning of the arguments.
// Return a function that uses Function.apply() to bind context[fn] to context. Use Array.concat() to prepend any additional supplied parameters to the arguments.
const bindKey = (context, fn, ...args) => () => context[fn].apply(context, args.concat(...arguments));

// chainAsync
// Chains asynchronous functions.
// Loop through an array of functions containing asynchronous events, calling next when each asynchronous event has completed.
const chainAsync = fns => {
  let curr = 0;
  const next = () => fn[curr++](next);
  next();
};

// compose
// Performs right-to-left function composition.
// Use Array.reduce() to perform right-to-left function composition. The last (rightmost) function can accept one or more arguments; the remaining functions must be unary.
const compose = (...fns) => fns.reduce((f, g) => (...args) =>  f(g(...args)));

// composeRight
// Performs left-to-right function composition.
// Use Array.reduce() to perform left-to-right function composition. The first (leftmost) function can accept one or more arguments; the remaining functions must be unary.
const composeRight = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

// converge
// Accepts a converging function and a list of branching functions and returns a function that applies each branching function to the arguments and the results of the branching functions are passed as arguments to the converging function.
// Use Array.map() and Function.apply() to apply each function to the given arguments. Use the spread operator (...) to call coverger with the results of all other functions.
const converge = (converger, fns) => (...args) => converger(...fns.map(fn => fn.apply(null, args)));

// curry
// Curries a function.
// Use recursion. If the number of provided arguments (args) is sufficient, call the passed function fn. Otherwise, return a curried function fn that expects the rest of the arguments. If you want to curry a function that accepts a variable number of arguments (a variadic function, e.g. Math.min()), you can optionally pass the number of arguments to the second parameter arity.
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

// debounce
// Creates a debounced function that delays invoking the provided function until at least ms milliseconds have elapsed since the last time it was invoked.
// Each time the debounced function is invoked, clear the current pending timeout with clearTimeout() and use setTimeout() to create a new timeout that delays invoking the function until at least ms milliseconds has elapsed. Use Function.apply() to apply the this context to the function and provide the necessary arguments. Omit the second argument, ms, to set the timeout at a default of 0 ms.
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// defer
// Defers invoking a function until the current call stack has cleared.
// Use setTimeout() with a timeout of 1ms to add a new event to the browser event queue and allow the rendering engine to complete its work. Use the spread (...) operator to supply the function with an arbitrary number of arguments.
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);

// delay
// Invokes the provided function after wait milliseconds.
// Use setTimeout() to delay execution of fn. Use the spread (...) operator to supply the function with an arbitrary number of arguments.
const delay = (fn, ms, ...args) => setTimeout(() => fn(...args), ms);
// standard answer
const deplay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);

// functionName
// Logs the name of a function.
// Use console.debug() and the name property of the passed method to log the method's name to the debug channel of the console.
const functionName = fn => (console.debug(fn.name), fn);

// hz
// Returns the number of times a function executed per second. hz is the unit for hertz, the unit of frequency defined as one cycle per second.
// Use performance.now() to get the difference in milliseconds before and after the iteration loop to calculate the time elapsed executing the function iterations times. Return the number of cycles per second by converting milliseconds to seconds and dividing it by the time elapsed. Omit the second argument, iterations, to use the default of 100 iterations.
const hz = (fn, iterations = 100) => {
  const before = performance.now();
  for(let i = 0; i < iterations; i++) fn()
  return 1000 * iterations / (performance.now() - before);
};

// memoize
// Returns the memoized (cached) function.
// Create an empty cache by instantiating a new Map object. Return a function which takes a single argument to be supplied to the memoized function by first checking if the function's output for that specific input value is already cached, or store and return it if not. The function keyword must be used in order to allow the memoized function to have its this context changed if necessary. Allow access to the cache by setting it as a property on the returned function.
const memorize = fn => {
  const cache = new Map();
  const cached = function(val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  }
  cached.cache = cache;
  return cached;
};


// negate
// Negates a predicate function.
// Take a predicate function and apply the not operator (!) to it with its arguments.
const negate = fn => (...args) => !fn(...args);

// once
// Ensures a function is called only once.
// Utilizing a closure, use a flag, called, and set it to true once the function is called for the first time, preventing it from being called again. In order to allow the function to have its this context changed (such as in an event listener), the function keyword must be used, and the supplied function must have the context applied. Allow the function to be supplied with an arbitrary number of arguments using the rest/spread (...) operator.
const once = fn => {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    fn.apply(this, ...args);
  };
};

// partial
// Creates a function that invokes fn with partials prepended to the arguments it receives.
// Use the spread operator (...) to prepend partials to the list of arguments of fn.
const partial = (fn, ...partials) => (...args) => fn(...partials, ...args);

// partialRight
// Creates a function that invokes fn with partials appended to the arguments it receives.
// Use the spread operator (...) to append partials to the list of arguments of fn.
const partialRight = (fn, ...partials) => (...args) =>fn(...args, ...partials);

// runPromisesInSeries
// Runs an array of promises in series.
// Use Array.reduce() to create a promise chain, where each promise returns the next promise when resolved.
const runPromiseInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());

// sleep
// Delays the execution of an asynchronous function.
// Delay executing part of an async function, by putting it to sleep, returning a Promise
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// throttle
// Creates a throttled function that only invokes the provided function at most once per every wait milliseconds
// Use setTimeout() and clearTimeout() to throttle the given method, fn. Use Function.apply() to apply the this context to the function and provide the necessary arguments. Use Date.now() to keep track of the last time the throttled function was invoked. Omit the second argument, wait, to set the timeout at a default of 0 ms.
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, wait - (Date.now() - lastTime));
    }
  };
};
