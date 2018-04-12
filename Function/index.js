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

