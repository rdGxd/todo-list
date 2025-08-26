"use client";

import { TaskForm } from "@/forms/new-task";
import { TaskServiceClient } from "@/services/task/client";
import { TasksType } from "@/types/tasks";
import { useEffect, useState } from "react";

export default function TasksInitialPage() {
  const [tasks, setTasks] = useState<TasksType[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const getTasks = await TaskServiceClient.getAll();
      setTasks(getTasks.data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Formulário */}
      <div className="w-full sm:max-w-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Criar nova tarefa</h1>
        <TaskForm />
      </div>

      {/* Lista de tarefas */}
      <div className="flex-1 overflow-y-auto p-6 ">
        <div className="w-full sm:max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Minhas tarefas</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {tasks.map((task) => (
                <li key={task.taskId} className="bg-white text-gray-800 p-4 rounded shadow">
                  <h3 className="font-semibold">{task.title}</h3>
                  {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
