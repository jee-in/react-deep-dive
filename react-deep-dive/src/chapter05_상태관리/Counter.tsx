import { ChangeEvent, useCallback, useEffect } from "react";
import { createStore, useStoreSelector } from "./store";

const store = createStore({ count: 0, text: "hi" });

export function Counter1() {
  const counter = useStoreSelector(
    store,
    useCallback((state) => state.count, [])
  );

  function handleClick() {
    store.set((prev) => ({ ...prev, count: prev.count + 1 }));
  }

  useEffect(() => {
    console.log("Counter Rendered");
  });

  return (
    <>
      <h3>Counter1: {counter}</h3>
      <button onClick={handleClick}>+</button>
    </>
  );
}

const textSelector = (state: ReturnType<typeof store.get>) => state.text;

export function TextEditor() {
  const text = useStoreSelector(store, textSelector);

  useEffect(() => {
    console.log("TextEditor Rendered");
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    store.set((prev) => ({ ...prev, text: e.target.value }));
  }

  return (
    <>
      <h3>{text}</h3>
      <input value={text} onChange={handleChange}></input>
    </>
  );
}
