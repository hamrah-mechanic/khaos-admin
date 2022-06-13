import { createContext } from 'react';

export interface GlobalContextType {
  root: string;
  logo: string;
}

const GlobalContext = createContext<GlobalContextType>({
  root: '',
  logo: '',
});

export default GlobalContext;
