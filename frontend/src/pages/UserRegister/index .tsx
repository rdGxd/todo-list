import { RegisterForm } from "@/forms/create";

export function UserRegister() {
  return (
    <div className="text-center flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">Crie sua conta</h1>
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
