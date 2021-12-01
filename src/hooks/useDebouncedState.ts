import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useDebouncedState<T>(initialState: T, threshold = 500): [immediateValue: T, debouncedValue: T, setValue: Dispatch<SetStateAction<T>>, forceSetValue: Dispatch<SetStateAction<T>>] {
  const [immediateValue, setImmediateValue] = useState<T>(initialState);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(immediateValue);
    }, threshold);

    return () => {
      clearTimeout(timeout);
    }
  }, [immediateValue, threshold]);

  return [immediateValue, debouncedValue, setImmediateValue, setDebouncedValue];
}
