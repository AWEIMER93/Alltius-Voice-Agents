
import React from "react";
import { agentsList } from "../../data/agents";
import AgentCard from "./AgentCard";
import { motion } from "framer-motion";

const AgentsGrid: React.FC = () => {
  return (
    <section id="agents" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Voice Agents Gallery</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Select an agent below to experience interactive demos tailored for different business needs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agentsList.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsGrid;
