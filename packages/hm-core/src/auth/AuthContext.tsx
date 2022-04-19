import React, { createContext, useState, useEffect } from "react";
import { User } from "../types";
import { authenticate, extractUserFromCookie ,removeAuthTokens} from "./authUtilities";

interface AuthContextType {
  user?: User | undefined;
  login:(tokens:{refreshToken:string,accessToken:string})=>void;
  logout?:(cb?:()=>void)=>void;

}
export const AuthContext = createContext<AuthContextType>({login:()=>console.log('loggedIn')});

const AuthProvider = (props: any) => {
  const { children } = props;

  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    const extractedUser = extractUserFromCookie() as User;
    if (user) setUser(extractedUser);
  }, []);

  const login = (tokens:{refreshToken:string,accessToken:string})=>{
    authenticate(tokens)
  }
  const logout = ():void=>{
    setUser(undefined);
    removeAuthTokens();
  }
  return (
    <AuthContext.Provider
      value={{
        user: user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
