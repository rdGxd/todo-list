import { RegisterFormData } from "@/lib/validations/create-account";
import { LoginFormData } from "@/lib/validations/login";
import instance from "../axios/config";

export const UserService = {
  login: async (dataLogin: LoginFormData) => {
    const response = await instance.post("/login", dataLogin);
    return response.data;
  },

  register: async (dataRegister: RegisterFormData) => {
    const response = await instance.post("/register", dataRegister);
    return response.data;
  },
};
