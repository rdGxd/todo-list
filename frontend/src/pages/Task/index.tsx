"use client";

import { Button } from "@/components/ui/button";
import { EditTaskForm } from "@/forms/edit-task";
import { CreateTaskForm } from "@/forms/new-task";
import { TaskServiceClient } from "@/services/task/client";
import { TasksType } from "@/types/tasks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TasksInitialPage() {
  const [tasks, setTasks] = useState<TasksType[]>([]);
  const [editingTask, setEditingTask] = useState<TasksType | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const getTasks = await TaskServiceClient.getAll();
      setTasks(getTasks.data);
    };
    fetchTasks();
  }, []);

  const handleTaskUpdated = (updatedTask: TasksType) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.taskId === updatedTask.taskId ? updatedTask : task)));
    setEditingTask(null);
  };

  const handleTaskCreated = (newTask: TasksType) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleEditTask = (task: TasksType) => {
    setEditingTask(task);
  };

  const handleDeleteTask = async (task: TasksType) => {
    if (confirm("Tem certeza que deseja remover a tarefa?")) {
      try {
        await TaskServiceClient.remove(task);
        // Atualiza a lista removendo a task deletada
        setTasks((prevTasks) => prevTasks.filter((t) => t.taskId !== task.taskId));
        // Se a task sendo editada foi deletada, cancela a edição
        if (editingTask?.taskId === task.taskId) {
          setEditingTask(null);
        }
        toast.success("Tarefa removida com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar task:", error);
        toast.error("Erro ao deletar a tarefa. Tente novamente.");
      }
    }
  };

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

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Formulário */}
      <div className="w-full sm:max-w-lg mx-auto p-6">
        {editingTask ? (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Editar tarefa</h1>
            <EditTaskForm task={editingTask} onTaskUpdated={handleTaskUpdated} onCancel={handleCancelEdit} />
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Criar nova tarefa</h1>
            <CreateTaskForm onTaskCreated={handleTaskCreated} />
          </div>
        )}
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
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold flex-1">{task.title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditTask(task)}
                      className="ml-2 cursor-pointer bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTask(task)}
                      className="ml-2 bg-red-500 border-red-500  hover:bg-red-600 hover:border-red-600 cursor-pointer "
                    >
                      Apagar
                    </Button>
                  </div>
                  {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        task.status,
                      )}`}
                    >
                      {getStatusText(task.status)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
