export function // 为scroll刷新页面高度添加防抖
debounce(func, delay) {
  let timer = null;

  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
