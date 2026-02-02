import { useRef } from "react";

export const useStepLock = () => {
  const lockRef = useRef(false);

  const tryLock = () => {
    if (lockRef.current) return false;
    lockRef.current = true;
    return true;
  };

  const unlock = () => {
    lockRef.current = false;
  };

  return {
    tryLock,
    unlock,
    isLocked: lockRef,
  };
};
