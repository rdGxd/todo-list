import { RegisterFormData } from "@/lib/validations/create-account";
import { LoginFormData } from "@/lib/validations/login";
import Cookies from "js-cookie";
import instance from "../axios/config";

export const UserServiceClient = {
  setTokens: (accessToken: string, refreshToken: string) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
  },

  getTokens: () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    return { accessToken, refreshToken };
  },

  login: async (dataLogin: LoginFormData) => {
    const { data } = await instance.post("/auth/login", dataLogin);
    UserServiceClient.setTokens(data.accessToken, data.refreshToken);
    return data;
  },

  register: async (dataRegister: RegisterFormData) => {
    const { data } = await instance.post("/users", dataRegister);
    return data;
  },
};
