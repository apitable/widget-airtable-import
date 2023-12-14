import { createContext } from 'react';

export interface IContext {
  step: number;
  setStep: (step: number) => void;
}

export const Context = createContext({} as IContext);
