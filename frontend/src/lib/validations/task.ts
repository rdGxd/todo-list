import { z } from "zod";

export const taskValidationSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(5).max(255),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
});

export type TaskValidationData = z.infer<typeof taskValidationSchema>;
