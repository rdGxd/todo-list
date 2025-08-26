"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormData, loginValidationSchema } from "@/lib/validations/login";
import { UserServiceClient } from "@/services/user/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: LoginFormData) => {
    const response = await UserServiceClient.login(formData);
    try {
      if (response.status === 201) {
        toast.success("Login bem-sucedido!");
      }
    } catch {
      toast.error("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col text-center">
      <FormProvider {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
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

          <Button type="submit" className="w-full cursor-pointer">
            Entrar
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
