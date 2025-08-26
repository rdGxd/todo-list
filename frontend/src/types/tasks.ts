export type TasksType = {
  createdAt: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  taskId: string;
  title: string;
  updatedAt: string;
  userId: string;
};
