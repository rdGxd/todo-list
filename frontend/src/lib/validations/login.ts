import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.email({ message: "Email deve ter um formato válido." }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres.",
  }),
});

export type LoginFormData = z.infer<typeof loginValidationSchema>;
