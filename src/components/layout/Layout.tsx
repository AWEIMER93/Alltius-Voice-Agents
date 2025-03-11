
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/" 
              className="text-2xl font-semibold text-slate-900 tracking-tight flex items-center"
            >
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Voice</span>
              <span className="ml-1 text-slate-800">Agents</span>
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
                  className="text-slate-700 hover:text-blue-600 transition-colors underline-animation"
                >
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="#agents" 
                  className="text-slate-700 hover:text-blue-600 transition-colors underline-animation"
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
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Voice Agent Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
