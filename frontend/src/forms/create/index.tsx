"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormData, signupValidationSchema } from "@/lib/validations/create-account";
import { UserServiceClient } from "@/services/user/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await UserServiceClient.register(formData);
      if (response.status === 201) {
        toast.success("Cadastro bem-sucedido!");
      }
    } catch {
      toast.error("Erro ao fazer cadastro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col text-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            disabled={isLoading}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Senha</FormLabel>
                <FormControl>
                  <Input placeholder="Digite sua senha" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
            Criar conta
          </Button>
        </form>
      </Form>
    </div>
  );
}
