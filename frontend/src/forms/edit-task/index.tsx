"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TaskValidationData, taskValidationSchema } from "@/lib/validations/task";
import { TaskServiceClient } from "@/services/task/client";
import { TasksType } from "@/types/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface EditTaskFormProps {
  readonly task: TasksType;
  readonly onTaskUpdated: (updatedTask: TasksType) => void;
  readonly onCancel: () => void;
}

export function EditTaskForm({ task, onTaskUpdated, onCancel }: EditTaskFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TaskValidationData>({
    resolver: zodResolver(taskValidationSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });

  // Atualiza os valores do formulário quando a task muda
  useEffect(() => {
    form.reset({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  }, [task, form]);

  const onSubmit = async (formData: TaskValidationData) => {
    setIsLoading(true);
    try {
      const response = await TaskServiceClient.update(task, formData);
      toast.success("Tarefa atualizada com sucesso!");
      onTaskUpdated(response.data);
    } catch {
      toast.error("Erro ao atualizar tarefa. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            disabled={isLoading}
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Título da tarefa</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título da tarefa" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a descrição da tarefa" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Status da tarefa</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PENDING" id="pending" />
                      <Label htmlFor="pending">Pendente</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="IN_PROGRESS" id="in-progress" />
                      <Label htmlFor="in-progress">Em andamento</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="COMPLETED" id="completed" />
                      <Label htmlFor="completed">Concluída</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 cursor-pointer"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 cursor-pointer" disabled={isLoading}>
              {isLoading ? "Atualizando..." : "Atualizar tarefa"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
