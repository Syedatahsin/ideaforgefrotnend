"use client";

import { useState, useEffect } from "react";
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
import { Loader2, Rocket, Lightbulb, DollarSign, Tags } from "lucide-react";

export function CreateIdeaForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => {
        if (data.success) setCategories(data.data);
      })
      .catch(() => console.error("Error fetching categories"));
  }, []);

  const form = useForm({
    defaultValues: {
      title: "",
      categoryId: "",
      problemStatement: "",
      solution: "",
      description: "",
      price: 0,
      tags: [] as string[],
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        // Send as credentials true if using cookies, or add auth header
        const response = await fetch("http://localhost:5000/api/ideas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Idea created successfully!");
          router.push("/ideas"); // Redirect to public feed
        } else {
          toast.error(data.message || "Failed to create idea");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2.5rem] overflow-hidden">
      <CardHeader className="space-y-1 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black tracking-tight">Forge a New Idea</CardTitle>
            <CardDescription>Share your brilliance with the world and spark innovation.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <form.Field name="title">
            {(field) => (
              <div className="space-y-2 md:col-span-2">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Idea Title</FieldLabel>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. AI-Powered Personal Finance Assistant"
                  className="rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-12"
                />
              </div>
            )}
          </form.Field>

          {/* Category */}
          <form.Field name="categoryId">
            {(field) => (
              <div className="space-y-2">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Category</FieldLabel>
                <select
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="flex h-12 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-all"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          {/* Price */}
          <form.Field name="price">
            {(field) => (
              <div className="space-y-2">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Estimated Price ($)</FieldLabel>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  <Input
                    type="number"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="pl-10 rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-12"
                  />
                </div>
              </div>
            )}
          </form.Field>

          {/* Problem Statement */}
          <form.Field name="problemStatement">
            {(field) => (
              <div className="space-y-2 md:col-span-2">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">The Problem</FieldLabel>
                <Textarea
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="What pain point does this idea address?"
                  className="rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 min-h-[80px] resize-none"
                />
              </div>
            )}
          </form.Field>

          {/* Solution */}
          <form.Field name="solution">
            {(field) => (
              <div className="space-y-2 md:col-span-2">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">The Solution</FieldLabel>
                <Textarea
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="How does your idea solve the problem?"
                  className="rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 min-h-[80px] resize-none"
                />
              </div>
            )}
          </form.Field>

          {/* Full Description */}
          <form.Field name="description">
            {(field) => (
              <div className="space-y-2 md:col-span-2">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Description</FieldLabel>
                <Textarea
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Provide deep details about your vision..."
                  className="rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 min-h-[150px] resize-none"
                />
              </div>
            )}
          </form.Field>

          {/* Tags */}
          <form.Field name="tags">
            {(field) => (
              <div className="space-y-2 md:col-span-2">
                <FieldLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Tags (comma separated)</FieldLabel>
                <div className="relative">
                  <Tags className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  <Input
                    name={field.name}
                    value={field.state.value.join(", ")}
                    onChange={(e) => field.handleChange(e.target.value.split(",").map(t => t.trim()))}
                    placeholder="e.g. web, saas, mobile"
                    className="pl-10 rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-12"
                  />
                </div>
              </div>
            )}
          </form.Field>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="md:col-span-2 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] mt-4"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Rocket className="w-5 h-5 mr-2" />
            )}
            Forge Idea
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
