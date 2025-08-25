import { ModeToggle } from "@/components/darkmode/mode-toggle";
import { LoginPage } from "@/pages/login";

export default function Home() {
  return (
    <div className="">
      <ModeToggle />
      <LoginPage />
    </div>
  );
}
