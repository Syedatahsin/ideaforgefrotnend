"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Search, Briefcase, Cpu, Lightbulb, 
  CheckCircle2, Rocket, Shield, Zap, Plus
} from 'lucide-react';

const AboutSection = () => {
  const categories = [
    { name: "Web Development", icon: Code2 },
    { name: "Research", icon: Search },
    { name: "Business", icon: Briefcase },
    { name: "Technology", icon: Cpu },
    { name: "Innovation", icon: Lightbulb },
    { name: "Many More", icon: Plus },
  ];

  const features = [
    "Publish free or premium ideas",
    "Explore expert insights from others",
    "Vote, comment, and interact",
    "Save favorites for later",
    "Unlock premium resources",
    "Build a public creator profile"
  ];

  return (
    <section className="relative py-20 px-6 overflow-hidden transition-colors duration-300 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-sky-400/10 dark:bg-sky-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 dark:bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sky-600 dark:text-sky-400 font-bold tracking-widest uppercase text-sm mb-4"
          >
            About IdeaForge
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight"
          >
            Turn Knowledge into <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">Impact.</span>
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
          >
            Our platform is a modern community-driven space where people can share, discover, and monetize valuable ideas across multiple fields.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-sky-400 dark:hover:border-sky-500 transition-colors group"
            >
              <cat.icon className="w-8 h-8 mb-3 text-sky-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">{cat.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Offers & Mission */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-sky-50 to-white dark:from-slate-900 dark:to-slate-950 border border-sky-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Zap className="text-sky-500" /> What We Offer
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-6 items-center p-6">
              <div className="h-12 w-1 bg-sky-500 rounded-full" />
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white italic">Our Mission</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  To create a trusted ecosystem where creators share knowledge and communities grow through innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Why Choose Us */}
          <div className="grid gap-6">
            <div className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
              <div className="flex gap-4">
                <div className="p-3 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Scalable & Premium</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    A marketplace built for high-quality, exclusive content with secure monetization.
                  </p>
                </div>
              </div>
            </div>

            <div className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
              <div className="flex gap-4">
                <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Role-Based Integrity</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Quality control through moderation and community feedback mechanisms.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function AboutPage() {
  return <AboutSection />;
}
