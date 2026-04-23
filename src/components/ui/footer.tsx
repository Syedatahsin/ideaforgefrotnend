"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Lightbulb, Github, Linkedin, Mail, 
  ArrowUpRight, Globe, Code2, Zap,
  Twitter, Instagram, Facebook
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Explore Ideas", href: "/ideas" },
        { name: "How it Works", href: "/about" },
        { name: "Contact Us", href: "/contact" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ]
    }
  ]

  const socialLinks = [
    { icon: <Globe className="w-5 h-5" />, href: "https://www.linkedin.com/in/syeda-anika-tahsin/", name: "LinkedIn" },
    { icon: <Code2 className="w-5 h-5" />, href: "https://github.com/Syedatahsin", name: "GitHub" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:anikasyeda82@gmail.com", name: "Email" },
  ]

  return (
    <footer className="relative bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300 overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-sky-400/5 dark:bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-400/5 dark:bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo and About Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-sky-600 p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-slate-950">
                  <Lightbulb className="w-5 h-5 text-sky-500 group-hover:text-sky-600 transition-colors" />
                </div>
              </div>
              <span className="text-slate-900 dark:text-white font-black tracking-tighter text-2xl uppercase">
                IDEAFORGE
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              The premier platform for creators and innovators to share, explore, and monetize brilliant ideas across the globe. Forge your brilliance with us.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white transition-colors flex items-center group gap-1"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 dark:text-slate-500 text-sm font-medium">
            © {currentYear} <span className="text-sky-500 font-bold">IDEAFORGE</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-8 text-sm">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-500">
              <Zap className="w-4 h-4 text-sky-500" /> Powered by <span className="text-slate-900 dark:text-white font-bold">Anika</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
