import { createContext, useContext } from 'react';

export const PageProgress = createContext();

export function usePageProgress() {
  return useContext(PageProgress);
}
