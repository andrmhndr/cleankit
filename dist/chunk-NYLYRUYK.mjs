// src/global/debounce/debounce.ts
function debounce(func, wait) {
  let timeoutId = null;
  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

export {
  debounce
};
