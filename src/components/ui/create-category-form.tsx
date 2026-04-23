"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./textarea";
import { FieldLabel } from "@/components/ui/field";
import { Loader2, Plus, Tag } from "lucide-react";

export function CreateCategoryForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        const response = await fetch("http://localhost:5000/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Category created successfully!");
          router.push("/admin/categories"); // Redirect to list
        } else {
          toast.error(data.message || "Failed to create category");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2rem] overflow-hidden">
      <CardHeader className="space-y-1 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black tracking-tight">Create Category</CardTitle>
            <CardDescription>Add a new category to organize ideas on the platform.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Category Name</FieldLabel>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    // Auto-generate slug
                    form.setFieldValue("slug", e.target.value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
                  }}
                  placeholder="e.g. Artificial Intelligence"
                  className="rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-12"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="slug">
            {(field) => (
              <div className="space-y-2">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Slug (URL identifier)</FieldLabel>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. artificial-intelligence"
                  className="rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-12 font-mono text-xs"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <div className="space-y-2">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Description</FieldLabel>
                <Textarea
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Describe what this category covers..."
                  className="rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 min-h-[120px] resize-none"
                />
              </div>
            )}
          </form.Field>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg shadow-lg shadow-sky-500/20 transition-all active:scale-[0.98]"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Plus className="w-5 h-5 mr-2" />
            )}
            Create Category
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
