
import React from "react";
import { motion } from "framer-motion";
import { Agent } from "../../types/agent";
import { Link } from "react-router-dom";

interface AgentCardProps {
  agent: Agent;
  index: number;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className="rounded-xl overflow-hidden glass-card p-6 agent-card-hover border border-purple-100"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 rounded-full overflow-hidden w-16 h-16 mx-auto">
          <img 
            src={agent.image} 
            alt={`${agent.name}, ${agent.role}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/150?text=' + agent.name.charAt(0);
            }}
          />
        </div>
        <h3 className="text-xl font-semibold mb-1 text-slate-900 text-center">{agent.name}</h3>
        <p className="text-sm font-medium text-purple-600 mb-2 text-center">{agent.role}</p>
        <p className="text-slate-600 text-sm flex-grow mb-4">{agent.description}</p>
        <Link
          to={`/agent/${agent.id}`}
          className="py-2 px-4 bg-white text-purple-600 border border-purple-200 rounded-md hover:bg-purple-50 transition-colors duration-300 text-sm text-center"
        >
          Try Demo
        </Link>
      </div>
    </motion.div>
  );
};

export default AgentCard;
