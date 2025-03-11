
import React, { Suspense } from "react";
import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import AgentsGrid from "../components/agents/AgentsGrid";
import { motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
      <p className="text-slate-700 mb-6">There was an error loading the content.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-purple-600 text-white rounded-md"
      >
        Try again
      </button>
    </div>
  );
}

const Index: React.FC = () => {
  return (
    <Layout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading...</div>}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <AgentsGrid />
          </motion.div>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
};

export default Index;
