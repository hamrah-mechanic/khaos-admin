import React, { ReactElement } from 'react';
import AuthProvider from './auth/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Routing from './Routing/Router';
import GlobalContext, { GlobalContextType } from './store/GlobalContext';

interface KhaosProps {
  login: React.ReactNode;
  loginRequest: (username: string, password: string) => void;
  refreshRequest: () => Promise<any>;
  appConfig: GlobalContextType;
  children: ReactElement;
}

const Khaos: React.FC<KhaosProps> = ({ login, children, loginRequest, refreshRequest, appConfig }) => {
  return (
    <Provider store={store}>
      <GlobalContext.Provider value={appConfig}>
        <AuthProvider loginRequest={loginRequest} refreshRequest={refreshRequest}>
          <Routing login={login}>{children}</Routing>
        </AuthProvider>
      </GlobalContext.Provider>
    </Provider>
  );
};

export default Khaos;
