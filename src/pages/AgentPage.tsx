
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AgentDetails from "../components/agents/AgentDetails";
import { getAgentById } from "../data/agents";

const AgentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const agent = id ? getAgentById(id) : undefined;

  if (!agent) {
    return <Navigate to="/not-found" />;
  }

  return (
    <Layout>
      <AgentDetails agent={agent} />
    </Layout>
  );
};

export default AgentPage;
