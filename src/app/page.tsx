"use client";

import { Button } from "./components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SignupForm from "./components/signup";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white bg-fixed bg-[linear-gradient(to_right,#8080800a_3px,transparent_1px),linear-gradient(to_bottom,#8080800a_3px,transparent_1px)] bg-[size:24px_24px] scroll-smooth">
        <nav className="mt-4 bg-[#f8f6f2] flex items-center gap-4 p-2 px-4 rounded-xl shadow-lg border border-brown/30 w-max mx-auto text-sm text-zinc-700 flex-wrap justify-center">
          <div className="text-2xl font-bold text-sky-600">mugen</div>
          <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <li>
              <a href="#features" className="hover:text-sky-600 transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-sky-600 transition-colors">
                About
              </a>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-4">
              <a href="#preregist" className="flex items-center">
                Log In
              </a>
            </Button>
            <Button size="sm">
              <a href="#preregist" className="flex items-center">Sign Up</a>
            </Button>
          </div>
        
        </nav>
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 py-20">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-serif font-extrabold tracking-tight leading-tight max-w-4xl"
          >
            UNCAGE YOUR MIND
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-xl md:text-2xl font-sans text-neutral-600 max-w-2xl"
          >
            A browser without tabs. An infinite canvas where your research, notes, and web pages live together.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-[#f8f6f2] bg-opacity-100 px-4 py-2 rounded-lg mt-10 text-xl md:text-1xl font-sans text-neutral-600 max-w-2xl"
          >
            Pre-register now and get 3 months of free access + lifetime discount!
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 w-full"
            id="#preregist"
          >
            <SignupForm />
          </motion.div>

          {/* Collage/Surreal Graphics */}
          {/* <div className="absolute top-10 left-10 w-32 h-32 bg-neutral-900 rounded-full mix-blend-multiply"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-400 rounded-full opacity-70 blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-tr from-yellow-200 to-pink-500 rotate-12 shadow-2xl"></div> */}
        </section>

      {/* Features Section */}
      <div id="features" className="relative">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="35%" y1="15%" x2="65%" y2="50%" stroke="lightgray" strokeWidth="4" />
          <circle cx="35%" cy="15%" r="10" stroke="skyblue" strokeWidth="4" fill="white" />
          

          <line x1="65%" y1="50%" x2="35%" y2="85%" stroke="lightgray" strokeWidth="4" />
          <circle cx="65%" cy="50%" r="10" stroke="skyblue" strokeWidth="4" fill="white" />
          <circle cx="35%" cy="85%" r="10" stroke="skyblue" strokeWidth="4" fill="white" />
        </svg> 
        <div>
        <section className="px-8 md:px-20 py-24 grid md:grid-cols-3 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h2 className="text-6xl font-serif font-bold mb-4 text-sky-700">Forget Tabs</h2>
            <p className="text-lg text-neutral-600">
              See the bigger picture. Open as many pages as you want, arrange them freely, and never lose context on a single infinite canvas.
            </p>
          </motion.div>
        </section>
        <section className="px-8 md:px-20 py-24 grid md:grid-cols-3 gap-16 text-sky-700">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:col-start-3"
          >
            <h2 className="text-6xl font-serif font-bold mb-4">Ideas, Linked</h2>
            <p className="text-lg text-neutral-600">
              Draw connections between tabs, notes, and concepts. Map your thought process like never before.
            </p>
          </motion.div>
        </section>
        <section className="text-left px-8 md:px-20 py-24 grid md:grid-cols-3 gap-16 text-sky-700">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col"
          >
            <h2 className="text-6xl font-serif font-bold mb-4">Minimalist, Yet Powerful</h2>
            <p className="text-lg text-neutral-600">
              A clean, editorial feel that gets out of the way and lets your research breathe.
            </p>
          </motion.div>
        </section>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-6xl font-serif font-extrabold tracking-tight leading-tight max-w-2xl"
        >
          ELEVATE YOUR CLARITY
        </motion.h1>

      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 w-full"
        >
          <SignupForm />
      </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-neutral-500 bg-white border-t border-neutral-200">
        <p className="text-sm">© 2025 Mugen Infinite Browser. All rights reserved.</p>
      </footer>
    </div>
  );
}
