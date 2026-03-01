import { useRef } from "react";

export function useInputRefs() {
  const refs = useRef({});

  const setRef = (key) => (el) => {
    refs.current[key] = el;
  };

  const focusNextInput = (key) => {
    const input = refs.current[key];
    if (input && input.focus) {
      input.focus();
    }
  };

  return { setRef, focusNextInput };
}