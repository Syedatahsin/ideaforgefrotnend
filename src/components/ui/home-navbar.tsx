"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Sparkles, Info, Mail, LogIn,
  Lightbulb, Search, Rocket,
  Zap, Brain, Target, ArrowUpRight
} from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"



export default function HomeNavbar() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [categories, setCategories] = React.useState<{ id: string; name: string; slug: string }[]>([])
  const [placeholder, setPlaceholder] = React.useState("")
  const fullText = "Search all ideas..."

  // Fetch Categories
  React.useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => {
        if (data.success) setCategories(data.data)
      })
      .catch(err => console.error("Error fetching categories:", err))
  }, [])

  // Typing animation effect
  React.useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setPlaceholder(fullText.slice(0, i))
      i++
      if (i > fullText.length) i = 0
    }, 150)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/ideas?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <header className="w-full px-4 py-8 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-visible">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-7xl px-4 py-2 flex items-center justify-between rounded-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-sm"
      >

        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 shrink-0">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-sky-600 p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-slate-950">
              <Lightbulb className="w-5 h-5 text-sky-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
            </div>
            <div className="absolute inset-0 -z-10 bg-sky-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-slate-900 dark:text-white font-black tracking-tighter text-xl uppercase hidden lg:block">
            IDEAFORGE
          </span>
        </Link>

        {/* Center: Search & Nav Links */}
        <div className="flex items-center gap-4 flex-1 justify-center px-8">
          {/* Functional Searchbar (INDEPENDENT) */}
          <form onSubmit={handleSearch} className="relative group max-w-md w-full">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus-within:border-sky-500/50 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all duration-300">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white w-full placeholder:text-slate-400"
              />
              <Button 
                type="submit" 
                size="sm" 
                className="h-8 w-8 rounded-full bg-sky-500 hover:bg-sky-600 text-white p-0 flex items-center justify-center transition-all active:scale-90 shadow-sm shadow-sky-500/20"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <NavigationMenu className="hidden xl:flex">
            <NavigationMenuList className="gap-1">
              
              {/* Ideas Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-slate-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 rounded-full flex items-center gap-2 px-5 cursor-pointer">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium tracking-wide text-[12px] uppercase">Ideas</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[220px] p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50">
                  <div className="p-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">Browse Categories</div>
                  <div className="grid gap-1">
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <Link 
                          key={cat.id} 
                          href={`/ideas?categoryId=${cat.id}`}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-700 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-white group"
                        >
                          <Rocket className="w-3.5 h-3.5 text-sky-500 opacity-0 group-hover:opacity-100 transition-all" />
                          <span className="text-sm font-medium">{cat.name}</span>
                        </Link>
                      ))
                    ) : (
                      <p className="p-3 text-xs text-slate-500">Loading categories...</p>
                    )}
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                    <Link 
                      href="/ideas"
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-sky-600 font-bold"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-sm">View All Ideas</span>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavItem href="/about" icon={<Info className="w-4 h-4 text-sky-500" />}>About</NavItem>
              <NavItem href="/contact" icon={<Mail className="w-4 h-4 text-indigo-500" />}>Contact Us</NavItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" className="text-slate-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-full hidden sm:flex">
              <LogIn className="w-4 h-4 mr-2" /> Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="relative overflow-hidden rounded-full bg-sky-600 text-white font-bold hover:bg-sky-700 transition-all duration-300 shadow-md hover:shadow-sky-500/40">
              SIGNUP
            </Button>
          </Link>
        </div>
      </motion.nav>
    </header>
  )
}

function NavItem({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        render={<Link href={href} />}
        className={cn(
          navigationMenuTriggerStyle(),
          "bg-transparent text-slate-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 rounded-full flex items-center gap-2 px-5 cursor-pointer"
        )}
      >
        {icon}
        <span className="font-medium tracking-wide text-[12px] uppercase">
          {children}
        </span>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}