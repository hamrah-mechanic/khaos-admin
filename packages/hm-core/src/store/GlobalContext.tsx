import { createContext } from 'react';

export interface GlobalContextType {
  root: string;
  logo?: string;
  requireAuthentication?: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
  root: '',
  logo: '',
  requireAuthentication: true,
});

export default GlobalContext;
