
import React from "react";
import { AgentDetailsProps } from "../../types/agent";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import VapiPlayer from "./VapiPlayer";

const AgentDetails: React.FC<AgentDetailsProps> = ({ agent }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      <Link
        to="/"
        className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 transition-colors duration-300"
      >
        <ArrowLeft size={16} className="mr-1" />
        <span>Back to gallery</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="rounded-full overflow-hidden w-20 h-20 mr-4 border-2 border-purple-300 shadow-md">
              <img 
                src={agent.image} 
                alt={`${agent.name}, ${agent.role}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${agent.name}&background=6d28d9&color=fff&size=128`;
                }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{agent.name}</h1>
              <p className="text-purple-600 font-medium">{agent.role}</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl mb-6 border border-purple-100">
            <h2 className="text-xl font-semibold mb-3 text-slate-800">About this Agent</h2>
            <p className="text-slate-600 mb-4">{agent.description}</p>
            <p className="text-slate-600">
              This interactive demo showcases how {agent.name} can assist with {agent.role.toLowerCase()} tasks, providing instant, conversational support for your customers.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl border border-purple-100">
            <h2 className="text-xl font-semibold mb-3 text-slate-800">How to use</h2>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start">
                <span className="mr-2 text-purple-500 font-bold">1.</span>
                <span>Click the "Start Conversation" button to begin.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-500 font-bold">2.</span>
                <span>When the microphone is active, speak clearly to {agent.name}.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-500 font-bold">3.</span>
                <span>Watch the sound waves as {agent.name} responds to your questions.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-500 font-bold">4.</span>
                <span>Click "Stop Conversation" when you're finished.</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="sticky top-24"
        >
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Live Demo</h2>
          <VapiPlayer assistantId={agent.id} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AgentDetails;
