"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, Code2 } from 'lucide-react';

const ContactUs = () => {
  // Replace with your Web3Forms Access Key
  const API_KEY = "83e9e706-34b7-47df-84f8-6852909c63a0";

  return (
    <section className="relative py-20 px-6 bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto mt-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          
          {/* Left Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-full"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Get in Touch</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Have a question about IdeaForge? Send us a message and we'll get back to you shortly.
            </p>

            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6 flex-grow flex flex-col justify-between">
              <input type="hidden" name="access_key" value={API_KEY} />
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                    <input 
                      type="text" name="name" required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                    <input 
                      type="email" name="email" required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all dark:text-white"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                  <select name="subject" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all dark:text-white">
                    <option>General Inquiry</option>
                    <option>Idea Monetization</option>
                    <option>Technical Support</option>
                    <option>Business Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                  <textarea 
                    name="message" required rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all dark:text-white"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 mt-8 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold shadow-lg shadow-sky-200 dark:shadow-none transition-all flex items-center justify-center gap-2 group"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Right Side: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:pl-10 flex flex-col justify-center"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-sm font-bold mb-6">
              Contact Details
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Let's build something <span className="text-sky-500">great</span> together.
            </h2>
            
            <div className="space-y-8 mt-10">
              <ContactCard 
                icon={<Mail className="w-6 h-6" />}
                title="Email Us"
                detail="anikasyeda82@gmail.com"
                link="mailto:anikasyeda82@gmail.com"
                sub="Available 24/7 for support"
              />
              <ContactCard 
                icon={<Globe className="w-6 h-6" />}
                title="LinkedIn"
                detail="syeda-anika-tahsin"
                link="https://www.linkedin.com/in/syeda-anika-tahsin/"
                sub="Let's connect professionally"
              />
              <ContactCard 
                icon={<Code2 className="w-6 h-6" />}
                title="GitHub"
                detail="Syedatahsin"
                link="https://github.com/Syedatahsin"
                sub="Check out my latest projects"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ icon, title, detail, sub, link }: { icon: React.ReactNode, title: string, detail: string, sub: string, link: string }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="flex gap-5 group cursor-pointer">
    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-200 dark:shadow-none group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h4>
      <p className="text-sky-600 dark:text-sky-400 font-medium group-hover:underline">{detail}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{sub}</p>
    </div>
  </a>
);

export default function ContactPage() {
  return <ContactUs />;
}
