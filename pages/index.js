import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

function useLocalState(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    }

    return initial;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default function Home() {
  const [value, setValue] = useLocalState("memorable", "");

  return (
    <div className={styles.container}>
      <div>
        <label>Something Memorable</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
