
import React from "react";
import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import AgentsGrid from "../components/agents/AgentsGrid";
import { motion } from "framer-motion";

const Index: React.FC = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <AgentsGrid />
      </motion.div>
    </Layout>
  );
};

export default Index;
