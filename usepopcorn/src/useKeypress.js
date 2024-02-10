import { useEffect } from "react";

export function useKeypress(key, callback) {
  useEffect(() => {
    const eventHandler = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    };

    document.addEventListener("keydown", eventHandler);

    return () => {
      document.removeEventListener("keydown", eventHandler);
    };
  }, [callback, key]);
}
