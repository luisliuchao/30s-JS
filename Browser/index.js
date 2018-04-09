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
