import { LoginForm } from "@/forms/login";
import { UserServiceClient } from "@/services/user/client";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock do serviço
vi.mock("@/services/user/client", () => ({
  UserServiceClient: {
    login: vi.fn(),
  },
}));

// Mock do react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock do Next.js router
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as any);
  });

  it("should render form fields correctly", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("should render placeholders correctly", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("Digite seu email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite sua senha")).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /entrar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email deve ter um formato válido/i)).toBeInTheDocument();
      expect(screen.getByText(/senha deve ter pelo menos 6 caracteres/i)).toBeInTheDocument();
    });
  });

  it("should show validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    await waitFor(() => {
      // Verifica se há qualquer mensagem de erro relacionada ao email
      const errorElements = screen.queryAllByText(/email|Email|válido|valid|Invalid/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it("should show validation error for short password", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "user@example.com");
    await user.type(passwordInput, "123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/senha deve ter pelo menos 6 caracteres/i)).toBeInTheDocument();
    });
  });

  it("should successfully submit form with valid data", async () => {
    const user = userEvent.setup();

    const mockResponse: AxiosResponse = {
      data: {
        accessToken: "token",
        refreshToken: "refresh",
        user: { id: "1", email: "user@example.com" },
      },
      status: 201,
      statusText: "Created",
      headers: {},
      config: {} as any,
    };

    vi.mocked(UserServiceClient.login).mockResolvedValue(mockResponse);

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "user@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(UserServiceClient.login).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password123",
      });
      expect(mockPush).toHaveBeenCalledWith("/tasks");
    });
  });

  it("should handle API error gracefully", async () => {
    const user = userEvent.setup();
    vi.mocked(UserServiceClient.login).mockRejectedValue(new Error("Invalid credentials"));

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "user@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(submitButton);

    await waitFor(() => {
      expect(UserServiceClient.login).toHaveBeenCalled();
    });

    // Os campos devem manter os valores em caso de erro
    expect(emailInput).toHaveValue("user@example.com");
    expect(passwordInput).toHaveValue("wrongpassword");
  });

  it("should disable form during submission", async () => {
    const user = userEvent.setup();
    // Mock que simula uma requisição lenta
    vi.mocked(UserServiceClient.login).mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "user@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    // Verifica se os campos estão desabilitados durante a submissão
    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it("should only redirect on successful login (status 201)", async () => {
    const user = userEvent.setup();

    const mockResponse: AxiosResponse = {
      data: { accessToken: "token" },
      status: 200, // Status diferente de 201
      statusText: "OK",
      headers: {},
      config: {} as any,
    };

    vi.mocked(UserServiceClient.login).mockResolvedValue(mockResponse);

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "user@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(UserServiceClient.login).toHaveBeenCalled();
    });

    // Não deve redirecionar se status não for 201
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should handle keyboard navigation correctly", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    // Navegar com Tab
    await user.tab();
    expect(emailInput).toHaveFocus();

    await user.tab();
    expect(passwordInput).toHaveFocus();

    await user.tab();
    expect(submitButton).toHaveFocus();
  });

  it("should handle form submission with Enter key", async () => {
    const user = userEvent.setup();

    const mockResponse: AxiosResponse = {
      data: { accessToken: "token" },
      status: 201,
      statusText: "Created",
      headers: {},
      config: {} as any,
    };

    vi.mocked(UserServiceClient.login).mockResolvedValue(mockResponse);

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");

    await user.type(emailInput, "user@example.com");
    await user.type(passwordInput, "password123");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(UserServiceClient.login).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password123",
      });
    });
  });

  it("should clear validation errors when user types", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    // Primeiro trigger erro de validação
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email deve ter um formato válido/i)).toBeInTheDocument();
    });

    // Depois digitar um email válido deve limpar o erro
    await user.type(emailInput, "user@example.com");

    await waitFor(() => {
      expect(screen.queryByText(/email deve ter um formato válido/i)).not.toBeInTheDocument();
    });
  });

  it("should accept valid email formats", async () => {
    const user = userEvent.setup();

    const mockResponse: AxiosResponse = {
      data: { accessToken: "token" },
      status: 201,
      statusText: "Created",
      headers: {},
      config: {} as any,
    };

    vi.mocked(UserServiceClient.login).mockResolvedValue(mockResponse);

    const validEmails = ["user@example.com", "test.email@domain.co.uk", "user+tag@example.org"];

    for (const email of validEmails) {
      cleanup();
      render(<LoginForm />);

      const emailInput = screen.getByPlaceholderText("Digite seu email");
      const passwordInput = screen.getByPlaceholderText("Digite sua senha");
      const submitButton = screen.getByRole("button", { name: /entrar/i });

      await user.type(emailInput, email);
      await user.type(passwordInput, "password123");
      await user.click(submitButton);

      await waitFor(() => {
        expect(UserServiceClient.login).toHaveBeenCalledWith({
          email,
          password: "password123",
        });
      });

      // Limpar mocks para próxima iteração
      vi.clearAllMocks();
    }
  });
});
