import { CreateCategoryForm } from "@/components/ui/create-category-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="rounded-full">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <CreateCategoryForm />
    </div>
  );
}
