import React, { createContext, ReactElement } from 'react';

interface ResourceProviderProps {
  children: ReactElement;
  value?: unknown;
}

export const ResorceContext = createContext<unknown>(null);

export const ResourceProvider = ({ children, value }: ResourceProviderProps) => {
  if (value) {
    return <ResorceContext.Provider value={value}>{children}</ResorceContext.Provider>;
  } else {
    return children;
  }
};
