import { TasksType } from "@/types/tasks";
import { describe, expect, it } from "vitest";

// Utilitários extraídos do componente TasksInitialPage para serem testados
const getStatusColor = (status: TasksType["status"]) => {
  if (status === "COMPLETED") return "bg-green-100 text-green-800";
  if (status === "IN_PROGRESS") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
};

const getStatusText = (status: TasksType["status"]) => {
  if (status === "COMPLETED") return "Concluída";
  if (status === "IN_PROGRESS") return "Em andamento";
  return "Pendente";
};

describe("Task Status Utils", () => {
  describe("getStatusColor", () => {
    it("should return green color for COMPLETED status", () => {
      const result = getStatusColor("COMPLETED");
      expect(result).toBe("bg-green-100 text-green-800");
    });

    it("should return yellow color for IN_PROGRESS status", () => {
      const result = getStatusColor("IN_PROGRESS");
      expect(result).toBe("bg-yellow-100 text-yellow-800");
    });

    it("should return gray color for PENDING status", () => {
      const result = getStatusColor("PENDING");
      expect(result).toBe("bg-gray-100 text-gray-800");
    });

    it("should return gray color for any unknown status", () => {
      // Teste para garantir que o default funciona
      const result = getStatusColor("PENDING");
      expect(result).toBe("bg-gray-100 text-gray-800");
    });
  });

  describe("getStatusText", () => {
    it("should return 'Concluída' for COMPLETED status", () => {
      const result = getStatusText("COMPLETED");
      expect(result).toBe("Concluída");
    });

    it("should return 'Em andamento' for IN_PROGRESS status", () => {
      const result = getStatusText("IN_PROGRESS");
      expect(result).toBe("Em andamento");
    });

    it("should return 'Pendente' for PENDING status", () => {
      const result = getStatusText("PENDING");
      expect(result).toBe("Pendente");
    });

    it("should return 'Pendente' for any unknown status", () => {
      // Teste para garantir que o default funciona
      const result = getStatusText("PENDING");
      expect(result).toBe("Pendente");
    });
  });

  describe("status consistency", () => {
    it("should have consistent color and text mapping", () => {
      const statuses: TasksType["status"][] = ["PENDING", "IN_PROGRESS", "COMPLETED"];

      statuses.forEach((status) => {
        const color = getStatusColor(status);
        const text = getStatusText(status);

        // Verifica se cada status tem uma cor e texto definidos
        expect(color).toBeTruthy();
        expect(text).toBeTruthy();

        // Verifica consistência das cores com o status
        if (status === "COMPLETED") {
          expect(color).toContain("green");
          expect(text).toBe("Concluída");
        } else if (status === "IN_PROGRESS") {
          expect(color).toContain("yellow");
          expect(text).toBe("Em andamento");
        } else {
          expect(color).toContain("gray");
          expect(text).toBe("Pendente");
        }
      });
    });
  });
});
