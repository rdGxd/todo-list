import { LoginFormData } from "@/lib/validations/login";
import { UserServiceClient } from "@/services/user/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/axios/config");
vi.mock("js-cookie");

describe("UserServiceClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getTokens", () => {
    it("deve retornar tokens dos cookies", async () => {
      const Cookies = await import("js-cookie");

      vi.mocked(Cookies.default.get)
        .mockReturnValueOnce("mock-access-token") // primeira chamada para accessToken
        .mockReturnValueOnce("mock-refresh-token"); // segunda chamada para refreshToken

      const result = UserServiceClient.getTokens();

      expect(Cookies.default.get).toHaveBeenCalledWith("accessToken");
      expect(Cookies.default.get).toHaveBeenCalledWith("refreshToken");
      expect(result).toEqual({
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      });
    });

    it("deve retornar tokens undefined quando não há tokens", async () => {
      const Cookies = await import("js-cookie");
      vi.mocked(Cookies.default.get).mockReturnValue(undefined as any);

      const result = UserServiceClient.getTokens();

      expect(result).toEqual({
        accessToken: undefined,
        refreshToken: undefined,
      });
    });
  });

  describe("setTokens", () => {
    it("deve definir tokens nos cookies", async () => {
      const Cookies = await import("js-cookie");

      UserServiceClient.setTokens("test-access-token", "test-refresh-token");

      expect(Cookies.default.set).toHaveBeenCalledWith("accessToken", "test-access-token");
      expect(Cookies.default.set).toHaveBeenCalledWith("refreshToken", "test-refresh-token");
      expect(Cookies.default.set).toHaveBeenCalledTimes(2);
    });
  });

  describe("login", () => {
    const validLoginData: LoginFormData = {
      email: "test@example.com",
      password: "password123",
    };

    it("deve fazer login com sucesso", async () => {
      const axiosConfig = await import("@/services/axios/config");

      const mockResponse = {
        data: { message: "Login successful" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      };

      vi.mocked(axiosConfig.default.post).mockResolvedValue(mockResponse);

      const result = await UserServiceClient.login(validLoginData);

      expect(axiosConfig.default.post).toHaveBeenCalledWith("/auth/login", validLoginData);
      expect(result).toEqual(mockResponse);
    });

    it("deve lançar erro quando login falha", async () => {
      const axiosConfig = await import("@/services/axios/config");
      const error = new Error("Invalid credentials");

      vi.mocked(axiosConfig.default.post).mockRejectedValue(error);

      await expect(UserServiceClient.login(validLoginData)).rejects.toThrow("Invalid credentials");
      expect(axiosConfig.default.post).toHaveBeenCalledWith("/auth/login", validLoginData);
    });
  });
});
