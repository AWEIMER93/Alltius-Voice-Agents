
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-12 md:pt-16 lg:px-8 lg:pt-20 xl:pt-28">
            <div className="text-center sm:text-center lg:text-center">
              <motion.h1
                className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="block">Voice AI Assistants</span>
                <span className="block mt-3 bg-gradient-to-r from-purple-600 to-violet-500 text-transparent bg-clip-text">
                  Powered by Alltius
                </span>
              </motion.h1>
              <motion.p
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Explore our collection of specialized voice agents designed for financial services. 
                Select an agent to experience interactive demos and see how Alltius can transform your customer experience.
              </motion.p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
                <motion.div
                  className="rounded-md shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <a
                    href="#agents"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:shadow-lg"
                  >
                    View Agents
                  </a>
                </motion.div>
                <motion.div
                  className="mt-3 sm:mt-0 sm:ml-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <a
                    href="https://alltius.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white border-purple-600 hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                  >
                    Learn More
                  </a>
                </motion.div>
              </div>
            </div>
          </main>
          <div className="flex justify-center mt-10 mb-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ 
                duration: 2, 
                delay: 1,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <ArrowDown className="text-purple-500 animate-bounce" size={32} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
