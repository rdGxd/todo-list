import { loginValidationSchema } from "@/lib/validations/login";
import { describe, expect, it } from "vitest";

describe("Login Validation Schema", () => {
  it("should validate correct login data", () => {
    const validData = {
      email: "user@example.com",
      password: "password123",
    };

    const result = loginValidationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe("email validation", () => {
    it("should accept valid email addresses", () => {
      const validEmails = [
        "user@example.com",
        "test.email@domain.co.uk",
        "user+tag@example.org",
        "123@numbers.com",
        "a@b.co",
      ];

      validEmails.forEach((email) => {
        const validData = {
          email,
          password: "password123",
        };

        const result = loginValidationSchema.safeParse(validData);
        expect(result.success).toBe(true);
      });
    });

    it("should reject invalid email formats", () => {
      const invalidEmails = [
        "notanemail",
        "@example.com",
        "user@",
        "user.name",
        "user@domain",
        "user space@example.com",
        "",
      ];

      invalidEmails.forEach((email) => {
        const invalidData = {
          email,
          password: "password123",
        };

        const result = loginValidationSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].path).toEqual(["email"]);
          expect(result.error.issues[0].message).toBe("Email deve ter um formato válido.");
        }
      });
    });

    it("should reject empty email", () => {
      const invalidData = {
        email: "",
        password: "password123",
      };

      const result = loginValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["email"]);
        expect(result.error.issues[0].message).toBe("Email deve ter um formato válido.");
      }
    });
  });

  describe("password validation", () => {
    it("should accept password with minimum length", () => {
      const validData = {
        email: "user@example.com",
        password: "123456",
      };

      const result = loginValidationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should accept long passwords", () => {
      const validData = {
        email: "user@example.com",
        password: "a".repeat(100),
      };

      const result = loginValidationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject password shorter than 6 characters", () => {
      const shortPasswords = ["", "1", "12", "123", "1234", "12345"];

      shortPasswords.forEach((password) => {
        const invalidData = {
          email: "user@example.com",
          password,
        };

        const result = loginValidationSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].path).toEqual(["password"]);
          expect(result.error.issues[0].message).toBe("Senha deve ter pelo menos 6 caracteres.");
        }
      });
    });

    it("should accept passwords with special characters", () => {
      const validData = {
        email: "user@example.com",
        password: "P@ssw0rd!",
      };

      const result = loginValidationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should accept passwords with spaces", () => {
      const validData = {
        email: "user@example.com",
        password: "my password",
      };

      const result = loginValidationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  it("should reject missing required fields", () => {
    const invalidData = {};

    const result = loginValidationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(2);
      expect(result.error.issues.some((issue) => issue.path.includes("email"))).toBe(true);
      expect(result.error.issues.some((issue) => issue.path.includes("password"))).toBe(true);
    }
  });

  it("should handle multiple validation errors", () => {
    const invalidData = {
      email: "invalid-email",
      password: "123",
    };

    const result = loginValidationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(2);
      expect(
        result.error.issues.some((issue) => issue.path.includes("email") && issue.message.includes("formato válido")),
      ).toBe(true);
      expect(
        result.error.issues.some((issue) => issue.path.includes("password") && issue.message.includes("pelo menos 6")),
      ).toBe(true);
    }
  });
});
