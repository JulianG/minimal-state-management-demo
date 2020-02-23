import React from 'react';

const cache: Map<string, unknown> = new Map();

function setCache(key: string, value: unknown) {
  cache.set(key, value);
  dispatch(key);
}

const subscribers: Record<string, Function[]> = {};
function subscribe(key: string, cb: Function) {
  if (!subscribers[key]) {
    subscribers[key] = [];
  }
  subscribers[key].push(cb);
}
function unsubscribe(key: string, cb: Function) {
  if (!subscribers[key]) {
    subscribers[key] = [];
  }
  const index = subscribers[key].findIndex(s => s === cb);
  if (index >= 0) {
    subscribers[key].splice(index, 1);
  }
}
function dispatch(key: string) {
  if (!subscribers[key]) {
    subscribers[key] = [];
  }
  subscribers[key].forEach(cb => cb());
}

////

export function useAsyncFunction<T>(
  key: string,
  asyncFunction: () => Promise<T>,
  defaultValue: T
): {
  value: T;
  error: null;
  isPending: boolean;
  mutate: (value: T) => void;
  revalidate: () => void;
} {
  const [state, setState] = React.useState({
    error: null,
    isPending: true
  });

  const forceUpdate = useForceUpdate();

  const revalidate = React.useCallback(() => {
    asyncFunction()
      .then(value => {
        cache.set(key, value);
        setState(state => ({ ...state, error: null, isPending: false }));
      })
      .catch(error =>
        setState(state => ({ ...state, error: error.toString(), isPending: false }))
      );
  }, [key, asyncFunction]);

  const mutate = (value: T) => {
    setCache(key, value);
  };

  React.useEffect(() => void revalidate(), [revalidate]);

  React.useEffect(() => {
    subscribe(key, forceUpdate);
    return () => unsubscribe(key, forceUpdate);
  }, [key, revalidate, forceUpdate]);

  const value = (cache.get(key) as T) || defaultValue;
  const { error, isPending } = state;
  return { value, error, isPending, mutate, revalidate };
}

function useForceUpdate() {
  const [, setState] = React.useState<number[]>([]);
  return React.useCallback(() => setState([]), [setState]);
}
