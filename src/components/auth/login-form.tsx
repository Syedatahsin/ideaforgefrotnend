"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Lightbulb } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm(props: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Session hydration guard and automatic redirect
  useEffect(() => {
    if (isPending) return; 
    if (!session?.user) return;

    const role = (session.user as any).role;

    if (role === "ADMIN") window.location.replace("/admin");
    else if (role === "TUTOR") window.location.replace("/teacher");
    else window.location.replace("/student");
  }, [session, isPending]);

  // Email login form logic
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Forging your session...");

      try {
        const res = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (res?.error) {
          toast.error(res.error.message || "Login failed", { id: toastId });
          return;
        }

        toast.success("Welcome back!", { id: toastId });

        // Hard navigation to ensure fresh layout/role loading
        const { data: currentSession } = await authClient.getSession();
        const activeRole = (currentSession?.user as any)?.role || (res?.data?.user as any)?.role;
        
        if (activeRole === "ADMIN") {
          window.location.href = "/admin";
        } else if (activeRole === "TUTOR") {
          window.location.href = "/teacher";
        } else {
          window.location.href = "/student";
        }

      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: window.location.origin + "/login", 
    });
  };

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-600 dark:text-slate-400">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-bold animate-pulse">Authenticating...</p>
      </div>
    );
  }

  return (
    <Card
      {...props}
      className="w-full max-w-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-all duration-300 shadow-2xl rounded-[2.5rem] overflow-hidden"
    >
      <CardHeader className="space-y-1 pb-8">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-sky-600 p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white dark:bg-slate-950">
              <Lightbulb className="w-6 h-6 text-sky-500" />
            </div>
          </div>
        </div>
        <CardTitle className="text-3xl font-black italic uppercase tracking-tighter text-center">
          IDEA<span className="text-sky-500">FORGE</span>
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400 text-center text-sm font-medium">
          Sign in to access your innovator dashboard
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <button
          onClick={handleGoogle}
          type="button"
          className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-[1.01] border border-slate-200 dark:border-slate-800 shadow-sm group"
        >
          <svg className="size-5 transition-transform group-hover:scale-110" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black">
            <span className="bg-white dark:bg-slate-950 px-4 text-slate-400 dark:text-slate-500">Or use email</span>
          </div>
        </div>

        <form
          id="login-form"
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* EMAIL */}
            <form.Field name="email">
              {(field) => (
                <Field>
                  <FieldLabel className="ml-1">Email Address</FieldLabel>
                  <Input
                    placeholder="name@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>

            {/* PASSWORD */}
            <form.Field name="password">
              {(field) => (
                <Field>
                  <div className="flex justify-between items-center ml-1">
                    <FieldLabel>Password</FieldLabel>
                    <Link href="/forgot-password" className="text-xs text-sky-500 hover:underline">
                      Forgot?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="pt-2 pb-10 flex flex-col gap-4">
        <Button 
          form="login-form" 
          type="submit" 
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 dark:shadow-none border-none transition-all active:scale-95"
        >
          Enter Workspace
        </Button>
        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
          Don't have an account? <Link href="/register" className="text-sky-500 font-bold hover:underline">Sign up for free</Link>
        </p>
      </CardFooter>
    </Card>
  );
}

// Simple internal Link for the form footer (if not imported from next/link)
import Link from "next/link";
