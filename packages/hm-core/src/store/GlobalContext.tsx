import { createContext } from 'react';

export interface GlobalContextType {
  root: string;
  logo?: string;
  authenticate?: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
  root: '',
  logo: '',
  authenticate: false,
});

export default GlobalContext;
