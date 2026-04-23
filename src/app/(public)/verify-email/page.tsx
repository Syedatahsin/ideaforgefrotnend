"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Missing verification token.");
        return;
      }

      try {
        const { error } = await authClient.verifyEmail({
          query: { token }
        });

        if (error) {
          setStatus("error");
          setMessage(error.message || "Verification failed. The link might be expired.");
        } else {
          setStatus("success");
          setMessage("Your email has been successfully verified! You can now access your workspace.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again later.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white dark:bg-slate-950 px-6 py-20 relative overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-sky-400/10 dark:bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center"
      >
        <div className="flex justify-center mb-8">
          {status === "loading" && (
            <div className="relative">
              <Loader2 className="w-16 h-16 text-sky-500 animate-spin" />
              <Mail className="w-6 h-6 text-sky-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}
          {status === "success" && (
            <div className="bg-green-100 dark:bg-green-500/20 p-4 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          )}
          {status === "error" && (
            <div className="bg-red-100 dark:bg-red-500/20 p-4 rounded-full">
              <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
          )}
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-4 italic uppercase">
          {status === "loading" && "Verifying..."}
          {status === "success" && "Success!"}
          {status === "error" && "Verification Error"}
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed">
          {status === "loading" && "Please wait while we forge your verification..."}
          {message}
        </p>

        {status !== "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {status === "success" ? (
              <Link href="/login" className="block w-full">
                <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 dark:shadow-none border-none transition-all active:scale-95">
                  Sign In to Workspace
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/register" className="block w-full">
                  <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    Back to Registration
                  </Button>
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Link expired? <button className="text-sky-500 font-bold hover:underline">Resend verification email</button>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
