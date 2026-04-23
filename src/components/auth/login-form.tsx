"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

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
  const { data: session, isPending } = authClient.useSession();

  // Session hydration guard and automatic redirect
  useEffect(() => {
    if (isPending) return; 
    if (!session?.user) return;

    // Type casting to handle custom role field in session user
    const user = session.user as { role?: string };
    const role = user.role;

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
        
        const sessionUser = currentSession?.user as { role?: string } | undefined;
        const resUser = res?.data?.user as { role?: string } | undefined;
        const activeRole = sessionUser?.role || resUser?.role;
        
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
          Don&apos;t have an account? <Link href="/register" className="text-sky-500 font-bold hover:underline">Sign up for free</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
