import { createContext, useContext } from 'react';
import type { HeroContextValue } from '../types';

export const HeroContext = createContext<HeroContextValue | null>(null);

export const useHeroContext = (): HeroContextValue => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error('useHeroContext must be used within HeroLayout');
  }
  return context;
};
