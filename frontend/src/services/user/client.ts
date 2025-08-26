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
    const response = await instance.post("/auth/login", dataLogin);
    UserServiceClient.setTokens(response.data.accessToken, response.data.refreshToken);
    return response;
  },

  register: async (dataRegister: RegisterFormData) => {
    const response = await instance.post("/users", dataRegister);
    return response;
  },
};
