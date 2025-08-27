import { CreateTaskForm } from "@/forms/new-task";
import { TaskServiceClient } from "@/services/task/client";
import { TasksType } from "@/types/tasks";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AxiosResponse } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock do serviço
vi.mock("@/services/task/client", () => ({
  TaskServiceClient: {
    create: vi.fn(),
  },
}));

// Mock do react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("CreateTaskForm", () => {
  const mockOnTaskCreated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render form fields correctly", () => {
    render(<CreateTaskForm />);

    expect(screen.getByLabelText(/título da tarefa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /criar tarefa/i })).toBeInTheDocument();
  });

  it("should render placeholders correctly", () => {
    render(<CreateTaskForm />);

    expect(screen.getByPlaceholderText("Digite o título da tarefa")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite a descrição da tarefa")).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    const user = userEvent.setup();
    render(<CreateTaskForm />);

    const submitButton = screen.getByRole("button", { name: /criar tarefa/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/>=2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/>=5 characters/i)).toBeInTheDocument();
    });
  });

  it("should successfully submit form with valid data", async () => {
    const user = userEvent.setup();
    const mockTask: TasksType = {
      taskId: "1",
      title: "Test Task",
      description: "Test Description",
      status: "PENDING",
      userId: "user123",
      createdAt: "2025-08-27T10:00:00Z",
      updatedAt: "2025-08-27T10:00:00Z",
    };

    const mockResponse: AxiosResponse = {
      data: mockTask,
      status: 201,
      statusText: "Created",
      headers: {},
      config: {} as any,
    };

    vi.mocked(TaskServiceClient.create).mockResolvedValue(mockResponse);

    render(<CreateTaskForm onTaskCreated={mockOnTaskCreated} />);

    const titleInput = screen.getByPlaceholderText("Digite o título da tarefa");
    const descriptionInput = screen.getByPlaceholderText("Digite a descrição da tarefa");
    const submitButton = screen.getByRole("button", { name: /criar tarefa/i });

    await user.type(titleInput, "Test Task");
    await user.type(descriptionInput, "Test Description");
    await user.click(submitButton);

    await waitFor(() => {
      expect(TaskServiceClient.create).toHaveBeenCalledWith({
        title: "Test Task",
        description: "Test Description",
      });
      expect(mockOnTaskCreated).toHaveBeenCalledWith(mockTask);
    });
  });

  it("should reset form after successful submission", async () => {
    const user = userEvent.setup();
    const mockResponse: AxiosResponse = {
      data: {
        taskId: "1",
        title: "Test Task",
        description: "Test Description",
        status: "PENDING" as const,
        userId: "user123",
        createdAt: "2025-08-27T10:00:00Z",
        updatedAt: "2025-08-27T10:00:00Z",
      },
      status: 201,
      statusText: "Created",
      headers: {},
      config: {} as any,
    };

    vi.mocked(TaskServiceClient.create).mockResolvedValue(mockResponse);

    render(<CreateTaskForm />);

    const titleInput = screen.getByPlaceholderText("Digite o título da tarefa");
    const descriptionInput = screen.getByPlaceholderText("Digite a descrição da tarefa");
    const submitButton = screen.getByRole("button", { name: /criar tarefa/i });

    await user.type(titleInput, "Test Task");
    await user.type(descriptionInput, "Test Description");
    await user.click(submitButton);

    await waitFor(() => {
      expect(titleInput).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
    });
  });

  it("should handle API error gracefully", async () => {
    const user = userEvent.setup();
    vi.mocked(TaskServiceClient.create).mockRejectedValue(new Error("API Error"));

    render(<CreateTaskForm />);

    const titleInput = screen.getByPlaceholderText("Digite o título da tarefa");
    const descriptionInput = screen.getByPlaceholderText("Digite a descrição da tarefa");
    const submitButton = screen.getByRole("button", { name: /criar tarefa/i });

    await user.type(titleInput, "Test Task");
    await user.type(descriptionInput, "Test Description");
    await user.click(submitButton);

    await waitFor(() => {
      expect(TaskServiceClient.create).toHaveBeenCalled();
    });

    // O formulário não deve ser resetado em caso de erro
    expect(titleInput).toHaveValue("Test Task");
    expect(descriptionInput).toHaveValue("Test Description");
  });

  it("should disable form during submission", async () => {
    const user = userEvent.setup();
    // Mock que simula uma requisição lenta
    vi.mocked(TaskServiceClient.create).mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));

    render(<CreateTaskForm />);

    const titleInput = screen.getByPlaceholderText("Digite o título da tarefa");
    const descriptionInput = screen.getByPlaceholderText("Digite a descrição da tarefa");
    const submitButton = screen.getByRole("button", { name: /criar tarefa/i });

    await user.type(titleInput, "Test Task");
    await user.type(descriptionInput, "Test Description");
    await user.click(submitButton);

    // Verifica se os campos estão desabilitados durante a submissão
    expect(titleInput).toBeDisabled();
    expect(descriptionInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});
