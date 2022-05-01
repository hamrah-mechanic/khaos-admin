import AuthContext from './auth/AuthContext';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing/Router';
interface KhaosTypes {
  authFunctions: AuthFunctions;
}
type AuthFunctions = {
  login: () => void;
  logout: () => void;
};
function Khaos({ login, children, refreshAccess }: any) {
  return (
    <Provider store={store}>
      <AuthContext refreshAccess={refreshAccess} value={login}>
        <Routing>{children}</Routing>
      </AuthContext>
    </Provider>
  );
}

export default Khaos;
