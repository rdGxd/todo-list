import { TaskValidationData } from "@/lib/validations/task";
import instance from "../axios/config";
import { UserServiceClient } from "../user/client";

export const TaskServiceClient = {
  create: async (dataTask: TaskValidationData) => {
    const { accessToken } = UserServiceClient.getTokens();
    const response = await instance.post("/task", dataTask, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  },

  getAll: async () => {
    const { accessToken } = UserServiceClient.getTokens();
    const response = await instance.get("/task", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  },
};
