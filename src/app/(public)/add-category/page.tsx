import { CreateCategoryForm } from "@/components/ui/create-category-form";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AddCategoryPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white dark:bg-slate-950 px-6 py-20 relative overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-sky-400/10 dark:bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-all">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <CreateCategoryForm />
      </div>
    </div>
  );
}
