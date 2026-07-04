import { useEffect, useState } from 'react';

/** Same contract as useLocalStorage, backed by sessionStorage — used for
 *  state that should reset once the browser tab/session ends, such as
 *  the shop's active filter/sort selection. */
export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.sessionStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage unavailable — silently ignore
    }
  }, [key, value]);

  return [value, setValue] as const;
}
