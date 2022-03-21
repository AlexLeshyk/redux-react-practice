import { useCallback, useRef } from "react";

const useDebounce = (callback: (...args: unknown[]) => Promise<void>, delay: number) => {
  const timer = useRef<any>();

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};

export default useDebounce;
