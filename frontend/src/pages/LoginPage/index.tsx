import { ModeToggle } from "@/components/themes/mode-toggle";
import { LoginForm } from "@/forms/login";
import Link from "next/link";

export function UserLogin() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-center items-center gap-4 p-4 ">
        <ModeToggle />
        <h1 className=" text-center text-2xl font-bold">Entre com sua conta</h1>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <LoginForm />
        <span className="mt-4">
          Não possui uma conta?{" "}
          <Link href="/signup" className=" text-blue-500 hover:text-blue-800 underline">
            Crie uma
          </Link>
        </span>
      </div>
    </div>
  );
}
