import { useEffect, useState } from 'react';

/** Mirrors a piece of state into localStorage so it survives reloads.
 *  Falls back gracefully if storage is unavailable (private mode, quota). */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage unavailable — silently ignore, state still works in-memory
    }
  }, [key, value]);

  return [value, setValue] as const;
}
