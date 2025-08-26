import { TaskValidationData } from "@/lib/validations/task";
import { TasksType } from "@/types/tasks";
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
    console.log(response);
    return response;
  },

  update: async (task: TasksType, dataTask: TaskValidationData) => {
    const { accessToken } = UserServiceClient.getTokens();
    const response = await instance.patch(`/task/${task.taskId}`, dataTask,{
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
