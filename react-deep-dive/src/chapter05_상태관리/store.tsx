import { useEffect, useState } from "react";

type Initializer<T> = T extends any ? T | ((prev: T) => T) : never;

type Store<State> = {
  get: () => State;
  set: (action: Initializer<State>) => State;
  subscribe: (callback: () => void) => () => void;
};

export const createStore = <State extends unknown>(
  initialState: Initializer<State>
): Store<State> => {
  let state =
    typeof initialState !== "function" ? initialState : initialState();

  // 상태 변경 시 호출될 콜백 함수들 관리
  const callbacks = new Set<() => void>();

  const get = () => state;
  const set = (nextState: State | ((prev: State) => State)) => {
    state =
      typeof nextState === "function"
        ? (nextState as (prev: State) => State)(state)
        : nextState;

    callbacks.forEach((callback) => callback());

    return state;
  };

  const subscribe = (callback: () => void) => {
    callbacks.add(callback);

    return () => {
      callbacks.delete(callback);
    };
  };
  return { get, set, subscribe };
};

export const useStore = <State extends unknown>(store: Store<State>) => {
  const [state, setState] = useState<State>(() => store.get());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.get());
    });
    return unsubscribe;
  }, [store]);

  return [state, store.set] as const;
};

export const useStoreSelector = <State extends unknown, Value extends unknown>(
  store: Store<State>,
  selector: (state: State) => Value
) => {
  const [state, setState] = useState(() => selector(store.get()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const value = selector(store.get());
      setState(value);
    });

    return unsubscribe;
  }, [store, selector]);

  return state;
};
