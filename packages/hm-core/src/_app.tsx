import AuthContext from './auth/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Routing from './Routing/Router';

interface KhaosTypes {
  authFunctions: AuthFunctions;
}

type AuthFunctions = {
  login: () => void;
  logout: () => void;
};

function Khaos({ login, children, refreshAccess, dataProvider }: any) {
  return (
    <Provider store={store}>
      <AuthContext refreshAccess={refreshAccess} dataProvider={dataProvider}>
        <Routing login={login}>{children}</Routing>
      </AuthContext>
    </Provider>
  );
}

export default Khaos;
