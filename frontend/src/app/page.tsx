import { UserLogin } from "@/pages/UserLogin";
import { UserRegister } from "@/pages/UserRegister/index ";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Login Section */}
        <section className="flex flex-col">
          <UserLogin />
        </section>

        {/* Separator Line */}
        <div className="lg:hidden flex items-center justify-center">
          <div className="w-full h-px bg-border"></div>
        </div>

        {/* Register Section */}
        <section className="flex flex-col relative">
          {/* Vertical line for desktop */}
          <div className="hidden lg:block absolute -left-6 top-0 bottom-0 w-px bg-border"></div>
          <UserRegister />
        </section>
      </div>
    </main>
  );
}
