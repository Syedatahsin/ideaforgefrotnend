"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles, Info, Mail, UserPlus, LogIn,
  Lightbulb, Search, ChevronDown, Rocket,
  Zap, Brain, Target
} from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const CATEGORIES = [
  { name: "Tech Ventures", icon: <Zap className="w-4 h-4 text-yellow-400" /> },
  { name: "Creative Arts", icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
  { name: "AI & ML", icon: <Brain className="w-4 h-4 text-blue-400" /> },
  { name: "Sustainability", icon: <Target className="w-4 h-4 text-green-400" /> },
]

export default function HomeNavbar() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [placeholder, setPlaceholder] = React.useState("")
  const fullText = "What kind of idea do you want to choose?"

  // Typing animation effect
  React.useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setPlaceholder(fullText.slice(0, i))
      i++
      if (i > fullText.length) i = 0
    }, 100)
    return () => clearInterval(interval)
  }, [])

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
          {/* Animated Searchbar with Dropdown */}
          <div className="relative group max-w-md w-full">
            <div
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-sky-500/50 cursor-pointer transition-all duration-300"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <div className="text-slate-600 dark:text-zinc-400 text-sm overflow-hidden whitespace-nowrap border-r-2 border-sky-500 pr-1 animate-pulse min-w-[20px]">
                {placeholder || " "}
              </div>
              <ChevronDown className={cn("w-4 h-4 text-slate-500 transition-transform ml-auto", isSearchOpen && "rotate-180")} />
            </div>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 right-0 mt-3 p-2 bg-white dark:bg-zinc-900/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50"
                >
                  <div className="p-2 text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest px-4">Categories</div>
                  {CATEGORIES.map((cat) => (
                    <button key={cat.name} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-700 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-white group">
                      {cat.icon}
                      <span className="text-sm font-medium">{cat.name}</span>
                      <Rocket className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 text-sky-500 transition-all" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavigationMenu className="hidden xl:flex">
            <NavigationMenuList className="gap-1">
              <NavItem href="/about" icon={<Info className="w-4 h-4 text-sky-500" />}>About</NavItem>
              <NavItem href="/contact" icon={<Mail className="w-4 h-4 text-indigo-500" />}>Contact Us</NavItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <Button variant="ghost" className="text-slate-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-full hidden sm:flex">
            <LogIn className="w-4 h-4 mr-2" /> Login
          </Button>
          <Button className="relative overflow-hidden rounded-full bg-sky-600 text-white font-bold hover:bg-sky-700 transition-all duration-300 shadow-md hover:shadow-sky-500/40">
            SIGNUP
          </Button>
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