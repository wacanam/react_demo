import { createContext, useContext } from 'react';

export const LockScreenContext = createContext();

export function useLockScreen() {
  return useContext(LockScreenContext);
}