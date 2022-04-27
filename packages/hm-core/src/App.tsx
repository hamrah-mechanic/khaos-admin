import AuthContext from './auth/AuthContext';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store/store';
interface AppTypes {
  authFunctions: AuthFunctions;
}
type AuthFunctions = {
  login: () => void;
  logout: () => void;
};
function App({ login, children, refreshAccess }: any) {
  return (
    <Provider store={store}>
      <AuthContext refreshAccess={refreshAccess} value={login}>
        {children}
      </AuthContext>
    </Provider>
  );
}

export default App;
