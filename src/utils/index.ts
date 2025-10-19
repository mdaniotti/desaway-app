export const sleep = (ms: number = 0): Promise<void> =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export const debounce = (
  func: () => void,
  delay: number,
  ref: React.RefObject<number | null>,
) => {
  if (ref.current) {
    clearTimeout(ref.current);
  }
  ref.current = setTimeout(func, delay);
};
