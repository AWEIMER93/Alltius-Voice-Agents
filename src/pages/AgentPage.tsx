
import React, { Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AgentDetails from "../components/agents/AgentDetails";
import { getAgentById } from "../data/agents";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
      <p className="text-slate-700 mb-6">There was an error loading the agent details.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-purple-600 text-white rounded-md"
      >
        Try again
      </button>
    </div>
  );
}

const AgentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const agent = id ? getAgentById(id) : undefined;

  if (!agent) {
    return <Navigate to="/not-found" />;
  }

  return (
    <Layout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading agent details...</div>}>
          <AgentDetails agent={agent} />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
};

export default AgentPage;
