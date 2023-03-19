import React, { createContext, useState, useContext, useEffect } from "react";
import axios, { setToken } from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { CurrentUser, LoginModel } from "../types/Auth";

type AuthContextData = {
  authData?: CurrentUser & { exp: number };
  userData?: CurrentUser;
  loading: boolean;
  signIn(userData: LoginModel): void;
  signOut(): void;
  reloadSession(): void;
};

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: any) => {
  const [authData, setAuthData] = useState<CurrentUser & { exp: number }>();
  const [userData, setUserData] = useState<CurrentUser>();

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    loadStorageData();
    verifySession();
  }, []);

  async function verifySession() {
    if (Date.now() / 1000 < authData?.exp!) {
      await signOut();
    }
  }
  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      const userDataSerialized = await AsyncStorage.getItem("@UserData");
      if (authDataSerialized) {
        const _authData = JSON.parse(authDataSerialized);
        const decoded: any = jwt_decode(_authData.token);
        _authData.exp = decoded.exp;
        setToken(_authData.token);
        setAuthData(_authData);
      }
      if (userDataSerialized) {
        const _userData = JSON.parse(userDataSerialized);
        setUserData(_userData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (userData: LoginModel) => {
    const { data: _authData } = await axios.post(`/api/auth/login`, userData);

    const decoded: any = jwt_decode(_authData.token);
    _authData.exp = decoded.exp;
    setAuthData(_authData);
    setUserData(_authData);
    setToken(_authData.token);
    AsyncStorage.setItem("@UserData", JSON.stringify(_authData));
    AsyncStorage.setItem("@AuthData", JSON.stringify(_authData));
  };

  const reloadSession = async () => {
    const { data } = await axios.get(`/api/users/me`);

    const { token, exp } = authData!;
    const currentData = {
      user: data!,
      token,
      exp,
    };

    setAuthData(currentData);
    setUserData(currentData);
    setToken(currentData.token);
    AsyncStorage.setItem("@UserData", JSON.stringify(currentData));
    AsyncStorage.setItem("@AuthData", JSON.stringify(currentData));
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@AuthData");
    await AsyncStorage.removeItem("@UserData");
    setAuthData(undefined);
    setUserData(undefined);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ authData, userData, loading, signIn, signOut, reloadSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
export { AuthContext, AuthProvider, useAuth };
