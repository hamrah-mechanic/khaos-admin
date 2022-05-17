import AuthContext from './auth/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Routing from './Routing/Router';
import GlobalContext from './store/GlobalContext';

const Khaos = ({ login, children, refreshAccess, appConfig }) => {
  return (
    <Provider store={store}>
      <GlobalContext.Provider value={appConfig}>
        <AuthContext refreshAccess={refreshAccess}>
          <Routing login={login}>{children}</Routing>
        </AuthContext>
      </GlobalContext.Provider>
    </Provider>
  );
};

export default Khaos;
