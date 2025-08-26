"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TaskValidationData, taskValidationSchema } from "@/lib/validations/task";
import { TaskServiceClient } from "@/services/task/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function TaskForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TaskValidationData>({
    resolver: zodResolver(taskValidationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (formData: TaskValidationData) => {
    setIsLoading(true);
    try {
      await TaskServiceClient.create(formData);
      toast.success("Tarefa criada com sucesso!");
    } catch {
      toast.error("Erro ao criar tarefa. Tente novamente.");
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

          <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
            Criar tarefa
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
