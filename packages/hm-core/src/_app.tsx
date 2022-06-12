import React from 'react';
import AuthProvider from './auth/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Routing from './Routing/Router';
import GlobalContext from './store/GlobalContext';

const Khaos = ({ login, children, loginRequest, refreshRequest, appConfig }) => {
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
