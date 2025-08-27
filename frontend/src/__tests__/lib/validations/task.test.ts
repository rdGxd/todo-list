import { taskValidationSchema } from "@/lib/validations/task";
import { describe, expect, it } from "vitest";

describe("Task Validation Schema", () => {
  it("should validate correct task data", () => {
    const validData = {
      title: "Valid Task Title",
      description: "Valid task description with enough characters",
    };

    const result = taskValidationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should accept optional status field", () => {
    const validData = {
      title: "Valid Task Title",
      description: "Valid task description with enough characters",
      status: "PENDING" as const,
    };

    const result = taskValidationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe("title validation", () => {
    it("should reject title that is too short", () => {
      const invalidData = {
        title: "A",
        description: "Valid description",
      };

      const result = taskValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["title"]);
        expect(result.error.issues[0].message).toContain(">=2 characters");
      }
    });

    it("should reject title that is too long", () => {
      const invalidData = {
        title: "A".repeat(101),
        description: "Valid description",
      };

      const result = taskValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["title"]);
        expect(result.error.issues[0].message).toContain("<=100 characters");
      }
    });

    it("should accept title with minimum length", () => {
      const validData = {
        title: "AB",
        description: "Valid description",
      };

      const result = taskValidationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should accept title with maximum length", () => {
      const validData = {
        title: "A".repeat(100),
        description: "Valid description",
      };

      const result = taskValidationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject empty title", () => {
      const invalidData = {
        title: "",
        description: "Valid description",
      };

      const result = taskValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("description validation", () => {
    it("should reject description that is too short", () => {
      const invalidData = {
        title: "Valid Title",
        description: "1234",
      };

      const result = taskValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["description"]);
        expect(result.error.issues[0].message).toContain(">=5 characters");
      }
    });

    it("should reject description that is too long", () => {
      const invalidData = {
        title: "Valid Title",
        description: "A".repeat(256),
      };

      const result = taskValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["description"]);
        expect(result.error.issues[0].message).toContain("<=255 characters");
      }
    });

    it("should accept description with minimum length", () => {
      const validData = {
        title: "Valid Title",
        description: "12345",
      };

      const result = taskValidationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should accept description with maximum length", () => {
      const validData = {
        title: "Valid Title",
        description: "A".repeat(255),
      };

      const result = taskValidationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject empty description", () => {
      const invalidData = {
        title: "Valid Title",
        description: "",
      };

      const result = taskValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("status validation", () => {
    it("should accept valid status values", () => {
      const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED"] as const;

      statuses.forEach((status) => {
        const validData = {
          title: "Valid Title",
          description: "Valid description",
          status,
        };

        const result = taskValidationSchema.safeParse(validData);
        expect(result.success).toBe(true);
      });
    });

    it("should reject invalid status value", () => {
      const invalidData = {
        title: "Valid Title",
        description: "Valid description",
        status: "INVALID_STATUS",
      };

      const result = taskValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["status"]);
      }
    });

    it("should work without status field", () => {
      const validData = {
        title: "Valid Title",
        description: "Valid description",
      };

      const result = taskValidationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  it("should reject missing required fields", () => {
    const invalidData = {};

    const result = taskValidationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(2);
      expect(result.error.issues.some((issue) => issue.path.includes("title"))).toBe(true);
      expect(result.error.issues.some((issue) => issue.path.includes("description"))).toBe(true);
    }
  });
});
