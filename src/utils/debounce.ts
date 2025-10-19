export function debounce(fn: (...args: any[]) => void, ms: number) {
  let timer: number;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), ms);
  };
}