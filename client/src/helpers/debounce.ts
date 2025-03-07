export const debounce = <T extends (...args: any) => any>(
  callback: T,
  timeout: number,
) => {
  let timer: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
