const debounce = (callback: (...args: any) => void, timeout: number) => {
  let timer: number;

  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};

export { debounce };
