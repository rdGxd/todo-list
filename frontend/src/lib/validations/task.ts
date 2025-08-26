import { z } from "zod";

export const taskValidationSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(5).max(255),
});

export type TaskValidationData = z.infer<typeof taskValidationSchema>;
