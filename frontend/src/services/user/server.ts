// src/services/user/UserService.server.ts
import { RegisterFormData } from "@/lib/validations/create-account";
import { LoginFormData } from "@/lib/validations/login";
import { cookies } from "next/headers";
import instance from "../axios/config";

export const UserServiceServer = {
  setTokens: async (accessToken: string, refreshToken: string) => {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken);
    cookieStore.set("refreshToken", refreshToken);
  },

  getTokens: async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    return { accessToken, refreshToken };
  },

  login: async (dataLogin: LoginFormData) => {
    const response = await instance.post("/auth/login", dataLogin);
    UserServiceServer.setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data;
  },

  register: async (dataRegister: RegisterFormData) => {
    const response = await instance.post("/users", dataRegister);
    return response.data;
  },
};
