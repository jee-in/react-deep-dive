import { useState } from "react";

function useCounter(initCount: number = 0) {
  const [counter, setCounter] = useState(initCount);

  function inc() {
    setCounter((prev) => prev + 1);
  }

  return { counter, inc };
}

interface counterProps {
  counter: number;
  inc: () => void;
}

export function Counter1({ counter, inc }: counterProps) {
  return (
    <>
      <h3>Counter1: {counter}</h3>
      <button onClick={inc}>+</button>
    </>
  );
}

export function Counter2({ counter, inc }: counterProps) {
  return (
    <>
      <h3>Counter2: {counter}</h3>
      <button onClick={inc}>+</button>
    </>
  );
}

export function Parent() {
  const { counter, inc } = useCounter();

  return (
    <>
      <Counter1 counter={counter} inc={inc} />
      <Counter2 counter={counter} inc={inc} />
    </>
  );
}
