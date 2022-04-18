import React, { createContext, useState, useEffect } from "react";


interface AuthContextType {
  user?: any;
}
const AuthContext = createContext({});

const AuthProvider = (props:any) => {
  const { children } = props;

  const [contextState, setContextState] = useState({
      authorize: false,
      checkAuth: false,
      backdrop: false,
      error: false,
      success: false,
  });
  useEffect(() => {
  console.log('check auth')
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  return (
    <AuthContext.Provider
        value={{
            authorize: contextState.authorize,
        }}
    >
        {children}
    </AuthContext.Provider>
);
}
export default AuthProvider;
//https://github.com/mbozkaya/react-authentication-with-context-api/blob/main/src/contexts/AuthContext.js