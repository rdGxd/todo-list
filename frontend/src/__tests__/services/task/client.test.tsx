import { TaskValidationData } from "@/lib/validations/task";
import { TaskServiceClient } from "@/services/task/client";
import { TasksType } from "@/types/tasks";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/axios/config");
vi.mock("@/services/user/client");

describe("TaskServiceClient", () => {
  const mockTask: TasksType = {
    taskId: "test-task-id",
    title: "Test Task",
    description: "Test Description",
    status: "PENDING",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    userId: "test-user-id",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    const taskData: TaskValidationData = {
      title: "New Task",
      description: "New Description",
      status: "PENDING",
    };

    it("deve criar uma nova task com sucesso", async () => {
      const { UserServiceClient } = await import("@/services/user/client");
      const axiosConfig = await import("@/services/axios/config");

      vi.mocked(UserServiceClient.getTokens).mockReturnValue({
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      });

      vi.mocked(axiosConfig.default.post).mockResolvedValue({
        data: mockTask,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });

      const result = await TaskServiceClient.create(taskData);

      expect(axiosConfig.default.post).toHaveBeenCalledWith("/task", taskData, {
        headers: {
          Authorization: "Bearer mock-access-token",
        },
      });
      expect(result.data).toEqual(mockTask);
    });
  });

  describe("getAll", () => {
    it("deve retornar todas as tasks com sucesso", async () => {
      const mockTasks = [mockTask];

      const { UserServiceClient } = await import("@/services/user/client");
      const axiosConfig = await import("@/services/axios/config");

      vi.mocked(UserServiceClient.getTokens).mockReturnValue({
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      });

      vi.mocked(axiosConfig.default.get).mockResolvedValue({
        data: mockTasks,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });

      const result = await TaskServiceClient.getAll();

      expect(axiosConfig.default.get).toHaveBeenCalledWith("/task", {
        headers: {
          Authorization: "Bearer mock-access-token",
        },
      });
      expect(result.data).toEqual(mockTasks);
    });
  });
});
