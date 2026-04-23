"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Rocket } from "lucide-react";
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

export function RegisterForm(props: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Forging your account...");

      try {
        const res = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
        });

        if (res?.error) {
          toast.error(res.error.message || "Registration failed", { id: toastId });
          return;
        }

        toast.success("Account created! Please verify your email.", { id: toastId });
        router.push("/login");

      } catch (err) {
        toast.error("Something went wrong during registration", { id: toastId });
      }
    },
  });

  return (
    <Card
      {...props}
      className="w-full max-w-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-all duration-300 shadow-2xl rounded-[2.5rem] overflow-hidden"
    >
      <CardHeader className="space-y-1 pb-8">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-sky-600 p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white dark:bg-slate-950">
              <Rocket className="w-6 h-6 text-sky-500" />
            </div>
          </div>
        </div>
        <CardTitle className="text-3xl font-black italic uppercase tracking-tighter text-center">
          JOIN <span className="text-sky-500">FORGE</span>
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400 text-center text-sm font-medium">
          Start your innovation journey today
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form
          id="register-form"
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* NAME */}
            <form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel className="ml-1">Full Name</FieldLabel>
                  <Input
                    placeholder="John Doe"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>

            {/* EMAIL */}
            <form.Field name="email">
              {(field) => (
                <Field>
                  <FieldLabel className="ml-1">Email Address</FieldLabel>
                  <Input
                    type="email"
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
                  <FieldLabel className="ml-1">Password</FieldLabel>
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
          form="register-form" 
          type="submit" 
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 dark:shadow-none border-none transition-all active:scale-95"
        >
          Create Account
        </Button>
        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
          Already have an account? <Link href="/login" className="text-sky-500 font-bold hover:underline">Sign in</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
