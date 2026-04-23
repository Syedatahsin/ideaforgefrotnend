"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, Rocket, Zap, 
  Clock, ArrowUpRight, User, 
  Lightbulb, Sparkles, Brain, Target
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  user: {
    name: string;
    image?: string;
  };
  category: {
    name: string;
  };
  slug: string;
}

function IdeasContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const url = new URL("http://localhost:5000/api/ideas");
        
        // If there's a query, we search across ALL categories as requested
        if (query) {
          url.searchParams.append("searchTerm", query);
          setActiveTab("all"); // Reset tab to 'all' for global search
        } else if (categoryId) {
          url.searchParams.append("categoryId", categoryId);
          setActiveTab(categoryId);
        }
        
        const response = await fetch(url.toString());
        const data = await response.json();
        if (data.success) {
          setIdeas(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [query, categoryId]);

  const filteredIdeas = activeTab === "all" || query 
    ? ideas 
    : ideas.filter(idea => 
        idea.category.name.toLowerCase().includes(activeTab.toLowerCase()) || 
        idea.categoryId === activeTab
      );

  return (
    <div className="max-w-7xl mx-auto py-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sky-500 font-bold tracking-widest uppercase text-xs"
          >
            <Sparkles className="w-4 h-4" />
            {query ? "Search Results" : "Discover Brilliance"}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white"
          >
            {query ? `Results for "${query}"` : <>Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 italic">Innovations</span></>}
          </motion.h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl text-lg font-medium">
            {query 
              ? `We found ${ideas.length} ideas matching your search across all categories.`
              : "Browse through the latest ideas forged by creators worldwide. Find your next inspiration or investment."
            }
          </p>
        </div>

        {!query && (
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
              {["all", "Tech", "AI", "Design"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab 
                      ? "bg-white dark:bg-slate-800 text-sky-500 shadow-md" 
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid Section */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[400px] rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 animate-pulse border border-slate-200 dark:border-slate-800" />
          ))}
        </div>
      ) : filteredIdeas.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredIdeas.map((idea, index) => (
              <IdeaCard key={idea.id} idea={idea} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-40 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 dark:bg-slate-800 mb-6">
            <Search className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No ideas found</h3>
          <p className="text-slate-500 dark:text-slate-400">
            We couldn&apos;t find any ideas matching &quot;{query}&quot;. Try a different keyword.
          </p>
        </div>
      )}
    </div>
  );
}

function IdeaCard({ idea, index }: { idea: Idea, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 flex flex-col"
    >
      {/* Decorative Gradient Top */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <span className="px-4 py-1.5 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-sky-100 dark:border-sky-500/20">
            {idea.category.name}
          </span>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <Clock className="w-3.5 h-3.5" />
            {new Date(idea.createdAt).toLocaleDateString()}
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-sky-500 transition-colors">
          {idea.title}
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 font-medium leading-relaxed flex-1">
          {idea.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {idea.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-bold text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
              #{tag}
            </span>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                {idea.user.name}
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Creator</p>
            </div>
          </div>

          <Link href={`/ideas/${idea.slug}`}>
            <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:bg-sky-500 flex items-center justify-center transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function IdeasPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 px-6 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <IdeasContent />
      </Suspense>
    </div>
  );
}
