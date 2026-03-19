import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : initialValue;
    } catch (error) {
      console.error("localStorage読み込み失敗:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("localStorage保存失敗:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
