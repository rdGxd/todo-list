import { LoginForm } from "@/forms/login";

export function UserLogin() {
  return (
    <div className="text-center flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">Entre com sua conta</h1>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
