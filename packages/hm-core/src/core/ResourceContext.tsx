import { createContext, ReactElement } from 'react';

interface ResourceProviderProps {
  children: ReactElement;
  value?: any;
}

export const ResorceContext = createContext<any>(null);

export const ResourceProvider: React.FC<ResourceProviderProps> = ({ children, value }) => {
  if (value) {
    return <ResorceContext.Provider value={value}>{children}</ResorceContext.Provider>;
  } else {
    return children;
  }
};
