import React, { ReactElement } from 'react';
import AuthProvider from './auth/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Routing from './Routing/Router';
import GlobalContext, { GlobalContextType } from './store/GlobalContext';
import { TokenType } from './types';

interface KhaosProps {
  login?: React.ReactNode;
  Home?: ReactElement;
  loginRequest?: (username: string, password: string) => Promise<TokenType>;
  refreshRequest?: () => Promise<TokenType>;
  appConfig: GlobalContextType;
  children: ReactElement | ReactElement[];
}

const Khaos: React.FC<KhaosProps> = ({ login, Home, children, loginRequest, refreshRequest, appConfig }) => {
  return (
    <Provider store={store}>
      <GlobalContext.Provider value={appConfig}>
        <AuthProvider loginRequest={loginRequest} refreshRequest={refreshRequest}>
          <Routing Home={Home} login={login}>
            {children}
          </Routing>
        </AuthProvider>
      </GlobalContext.Provider>
    </Provider>
  );
};

export default Khaos;
