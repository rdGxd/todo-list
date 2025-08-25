import { z } from "zod";

export const createValidationSchema = z.object({
  name: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.email({ message: "Email deve ter um formato válido." }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres.",
  }),
});

export type AccountCreateData = z.infer<typeof createValidationSchema>;
