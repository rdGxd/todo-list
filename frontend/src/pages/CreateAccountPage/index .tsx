import { ModeToggle } from "@/components/themes/mode-toggle";
import { RegisterForm } from "@/forms/create";
import Link from "next/link";

export function UserCreation() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-center items-center gap-4 p-4 ">
        <ModeToggle />
        <h1 className=" text-center text-2xl font-bold">Crie sua conta</h1>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <RegisterForm />
        <span className="mt-4">
          Já possui uma conta?{" "}
          <Link href="/login" className=" text-blue-500 hover:text-blue-800 underline">
            Entre agora!
          </Link>
        </span>
      </div>
    </div>
  );
}
