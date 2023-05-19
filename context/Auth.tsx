import React, { createContext, useState, useContext, useEffect } from "react";
import axios, { setToken } from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { CreateUser, CurrentUser, LoginModel, UpdateUser } from "../types/Auth";

type AuthContextData = {
  userData?: CurrentUser & { exp: number };
  loading: boolean;
  signIn(userData: LoginModel): void;
  signOut(): void;
  registerUser(user: CreateUser): void;
  reloadSession(): void;
  updateUser(user: UpdateUser): void;
};

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<CurrentUser & { exp: number }>();

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
    if (Date.now() / 1000 < userData?.exp!) {
      await signOut();
    }
  }
  async function loadStorageData(): Promise<void> {
    try {
      const userDataSerialized = await AsyncStorage.getItem("@UserData");
      if (userDataSerialized) {
        const _userData = JSON.parse(userDataSerialized);
        const decoded: any = jwt_decode(_userData.token);
        _userData.exp = decoded.exp;
        setToken(_userData.token);
        setUserData(_userData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (userData: LoginModel) => {
    const { data: _userData } = await axios.post(`/api/auth/login`, userData);

    const decoded: any = jwt_decode(_userData.token);
    _userData.exp = decoded.exp;
    setUserData(_userData);

    setToken(_userData.token);
    AsyncStorage.setItem("@UserData", JSON.stringify(_userData));
  };

  const registerUser = async (user: CreateUser) => {
    try {
      const { data: _userData } = await axios.post(`/api/auth/register`, user);

      const decoded: any = jwt_decode(_userData.token);
      _userData.exp = decoded.exp;
      setUserData(_userData);
      setToken(_userData.token);
      AsyncStorage.setItem("@UserData", JSON.stringify(_userData));
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (user: UpdateUser) => {
    const { data } = await axios.put(`/api/user`, user);

    const { token, exp } = userData!;
    const currentData = {
      user: data!,
      token,
      exp,
    };

    setUserData(currentData);
    setToken(currentData.token);
    AsyncStorage.setItem("@UserData", JSON.stringify(currentData));
  };

  const reloadSession = async () => {
    const { data } = await axios.get(`/api/users/me`);

    const { token, exp } = userData!;
    const currentData = {
      user: data!,
      token,
      exp,
    };

    setUserData(currentData);
    setToken(currentData.token);
    AsyncStorage.setItem("@UserData", JSON.stringify(currentData));
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@AuthData");
    await AsyncStorage.removeItem("@UserData");
    setUserData(undefined);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        loading,
        signIn,
        signOut,
        reloadSession,
        registerUser,
        updateUser,
      }}
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
