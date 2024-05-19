import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import { RootStore } from "./RootStore";

export default class UserStore {
  rootStore: RootStore;

  user = {} as IUser;
  isAuth = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setAuth = (value: boolean) => {
    this.isAuth = value;
  };

  setUser = (user: IUser) => {
    this.user = user;
  };

  private setToken = (authResponse: AuthResponse | null) => {
    if (!authResponse) {
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } else {
      localStorage.setItem("token", authResponse.accessToken);
      this.setAuth(true);
      this.setUser(authResponse.user);
    }
  };

  login = async (email: string, password: string) => {
    this.rootStore.uiStore.setIsPosting(true);
    try {
      const response = await AuthService.login(email, password);
      this.setToken(response.data);
    } catch (e) {
      this.rootStore.uiStore.handlePostError(e);
    } finally {
      this.rootStore.uiStore.setIsPosting(false);
    }
  };

  registration = async (email: string, password: string) => {
    this.rootStore.uiStore.setIsPosting(true);
    try {
      const response = await AuthService.register(email, password);
      this.setToken(response.data);
    } catch (e) {
      this.rootStore.uiStore.handlePostError(e);
    } finally {
      this.rootStore.uiStore.setIsPosting(false);
    }
  };

  logout = async () => {
    try {
      await AuthService.logout();
      this.setToken(null);
      localStorage.removeItem("cart");
    } catch (err) {
      console.log(err);
    }
  };

  checkAuth = async () => {
    try {
      const url = `${API_URL}/auth/refresh`;
      const response = await axios.get<AuthResponse>(url, {
        withCredentials: true,
      });
      this.setToken(response.data);
    } catch (e) {
      console.log(e);
    }
  };
}
