import { CreateIdeaForm } from "@/components/dashboard/create-idea-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewIdeaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/userr">
          <Button variant="ghost" size="sm" className="rounded-full">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to My Ideas
          </Button>
        </Link>
      </div>

      <CreateIdeaForm />
    </div>
  );
}
