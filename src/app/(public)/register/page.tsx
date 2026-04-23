import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white dark:bg-slate-950 px-6 py-20 relative overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-sky-400/10 dark:bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <RegisterForm className="z-10" />
    </div>
  );
}
