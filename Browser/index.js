// arrayToHtmlList
// Converts the given array elements into <li> tags and appends them to the list of the given id.
// Use Array.map() and document.querySelector() to create a list of html tags.
const arryToHtmlList = (arr, listId) =>
  arr.map(item => (document.querySelector(`#${listId}`).innerHTML += `<li>${item}</li>`));

// bottomVisible
// Returns true if the bottom of the page is visible, false otherwise.
// Use scrollY, scrollHeight and clientHeight to determine if the bottom of the page is visible.
const bottomVisible = () => window.scrollY + document.documentElement.clientHeight >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);

// copyToClipboard
// Copy a string to the clipboard. Only works as a result of user action (i.e. inside a click event listener).
// Create a new <textarea> element, fill it with the supplied data and add it to the HTML document. Use Selection.getRangeAt()to store the selected range (if any). Use document.execCommand('copy') to copy to the clipboard. Remove the <textarea> element from the HTML document. Finally, use Selection().addRange() to recover the original selected range (if any).
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.append(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.executeCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRange();
    document.getSelection().addRange(selected);
  }
}

// createElement
// Creates an element from a string (without appending it to the document). If the given string contains multiple elements, only the first one will be returned.
// Use document.createElement() to create a new element. Set its innerHTML to the string supplied as the argument. Use ParentNode.firstElementChild to return the element version of the string.
const createElement = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
}

// createEventHub
// Creates a pub/sub (publish–subscribe) event hub with emit, on, and off methods.
// Use Object.create(null) to create an empty hub object that does not inherit properties from Object.prototype. For emit, resolve the array of handlers based on the event argument and then run each one with Array.forEach() by passing in the data as an argument. For on, create an array for the event if it does not yet exist, then use Array.push() to add the handler to the array. For off, use Array.findIndex() to find the index of the handler in the event array and remove it using Array.splice().
const createEventHub = () => ({
  hub: Object.create(null),
  on: (event, handler) => {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handlerl);
  },
  emit: (event, data) => {
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  off: (event, handler) => {
    const i = (this.hub[event] || []).findIndex(handler);
    if (i > -1) this.hub[event].splice(i, 1);
  }
});

// currentURL
// Returns the current URL.
// Use window.location.href to get current URL.
const currentURL = () => window.location.href;

// detectDeviceType
// Detects wether the website is being opened in a mobile device or a desktop/laptop.
// Use a regular expression to test the navigator.userAgent property to figure out if the device is a mobile device or a desktop/laptop.
const detectDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

// elementIsVisibleInViewport
// Returns true if the element specified is visible in the viewport, false otherwise.
// Use Element.getBoundingClientRect() and the window.inner(Width|Height) values to determine if a given element is visible in the viewport. Omit the second argument to determine if the element is entirely visible, or specify true to determine if it is partially visible.
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const {top, right, bottom, left} = el.getBoundingClientRect();
  const {innerHeight, innerWidth} = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
      ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >=0 && right <= innerWidth && bottom <= innerHeight && left >= 0;
};

// getScrollPosition
// Returns the scroll position of the current page.
// Use pageXOffset and pageYOffset if they are defined, otherwise scrollLeft and scrollTop. You can omit el to use a default value of window.
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

// getStyle
// Returns the value of a CSS rule for the specified element.
// Use Window.getComputedStyle() to get the value of the CSS rule for the specified element.
const getStyle = (el, ruleName) => window.getComputedStyle(el)[ruleName];

// hasClass
// Returns true if the element has the specified class, false otherwise.
// Use element.classList.contains() to check if the element has the specified class.
const hasClass = (el, className) => el.classList.contains(className);

// hashBrowser
// Creates a hash for a value using the SHA-256 algorithm. Returns a promise.
// Use the SubtleCrypto API to create a hash for the given value.
const hashBrowser = val =>
  crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(val)).then(h => {
    let hexes = [],
      view = new DataView(h);
    for (let i = 0; i < view.byteLength; i += 4)
      hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
    return hexes.join('');
  });

// hide
// Hides all the elements specified.
// Use the spread operator (...) and Array.forEach() to apply display: none to each element specified.<Paste>
const hide = (...el) => [...el].forEach(e => e.style.display = 'none');

// httpsRedirect
// Redirects the page to HTTPS if its currently in HTTP. Also, pressing the back button doesn't take it back to the HTTP page as its replaced in the history.
// Use location.protocol to get the protocol currently being used. If it's not HTTPS, use location.replace() to replace the existing page with the HTTPS version of the page. Use location.href to get the full address, split it with String.split() and remove the protocol part of the URL.
const httspRedirect = () => {
  if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.split('//')[1]}`);
  }
}

// observeMutations
// Returns a new MutationObserver and runs the provided callback for each mutation on the specified element.
// Use a MutationObserver to observe mutations on the given element. Use Array.forEach() to run the callback for each mutation that is observed. Omit the third argument, options, to use the default options (all true).
const observeMutations = (element, callback, options) => {
  const observer = new MutationObserver(mutations => mutations.forEach(callback));
  observer.observe(
    element,
    {
      childList: true,
      attributes: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true,
      subtree: true,
      ...options,
    }
  );
  return observer;
};

// off
// Removes an event listener from an element.
// Use EventTarget.removeEventListener() to remove an event listener from an element. Omit the fourth argument opts to use false or specify it based on the options used when the event listener was added.
const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts);

// on
// Adds an event listener to an element with the ability to use event delegation.
// Use EventTarget.addEventListener() to add an event listener to an element. If there is a target property supplied to the options object, ensure the event target matches the target specified and then invoke the callback by supplying the correct this context. Returns a reference to the custom delegator function, in order to be possible to use with off. Omit opts to default to non-delegation behavior and event bubbling.
const on = (el, evt, fn, opts = {}) => {
  const delegatorFn = e => e.target.matches(opts.target) && fn.call(e.target, e);
  el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false);
  if (opts.target) return delegatorFn;
};

// onUserInputChange
// Run the callback whenever the user input type changes (mouse or touch). Useful for enabling/disabling code depending on the input device. This process is dynamic and works with hybrid devices (e.g. touchscreen laptops).
// Use two event listeners. Assume mouse input initially and bind a touchstart event listener to the document. On touchstart, add a mousemove event listener to listen for two consecutive mousemove events firing within 20ms, using performance.now(). Run the callback with the input type as an argument in either of these situations.
const onUserInputChange = callback => {
  let type = 'mouse';
  let lastTime = 0;
  const mousemoveHandler = () => {
    const now = performance.now();
    if (now - lastTime < 20)
      (type = 'mouse'), callback(type), document.removeEventListener('mousemove', mousemoveHandler);
    lastTime = now;
  };
  document.addEventListener('touchstart', () => {
    if (type === 'touch') return;
    (type = 'touch'), callback(type), document.addEventListener('mousemove', mousemoveHandler);
  });
};

// prefix
// property that the browser supports.
// StyleDeclaration object, otherwise return null. Use String.charAt() and String.toUpperCase() to capitalize the property, which will be appended to the vendor prefix string.
const prefix = prop => {
  const prefixProps = ['', 'webkit', 'moz', 'ms', '0'].map(prefix =>
    !prefix ? prop : `${prefix}${prop.charAt(0).toUpperCase()}${prop.slice(1)}`
  );
  return prefixProps.find(prop => typeof document.body.style[prop] !== undefined) || null;
};

// recordAnimationFrames
// Invokes the provided callback on each animation frame.
// Use recursion. Provided that running is true, continue invoking window.requestAnimationFrame() which invokes the provided callback. Return an object with two methods start and stop to allow manual control of the recording. Omit the second argument, autoStart, to implicitly call start when the function is invoked.
const recordAnimationFrames = (callback, autoStart = true) => {
  let running = true;
  let raf;
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFram(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) {
    start();
  }
  return {start, stop};
};
//  redirect
//  Redirects to a specified URL.
//  Use window.location.href or window.location.replace() to redirect to url. Pass a second argument to simulate a link click (true - default) or an HTTP redirect (false).
const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);
