
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/" 
              className="flex items-center"
            >
              <img 
                src="https://cdn.prod.website-files.com/634e9d5d7cb8f75cf4b28166/64d3781e337c540557333a5d_Alltius_Navbar%20Logo_Large_For%20White%20BG.webp" 
                alt="Alltius" 
                className="h-10 mr-3"
              />
              <span className="text-lg font-semibold text-slate-800 ml-2">Voice Agents</span>
            </Link>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ul className="flex items-center space-x-8">
              <li>
                <Link 
                  to="/" 
                  className="text-slate-700 hover:text-purple-600 transition-colors underline-animation"
                >
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="#agents" 
                  className="text-slate-700 hover:text-purple-600 transition-colors underline-animation"
                >
                  Agents
                </a>
              </li>
            </ul>
          </motion.nav>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="https://cdn.prod.website-files.com/634e9d5d7cb8f75cf4b28166/64d3781e337c540557333a5d_Alltius_Navbar%20Logo_Large_For%20White%20BG.webp" 
              alt="Alltius" 
              className="h-8"
            />
          </div>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Alltius. All rights reserved.</p>
          <p className="text-xs text-slate-400 mt-2">Voice agents powered by Vapi</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
