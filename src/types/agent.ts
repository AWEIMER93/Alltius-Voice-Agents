
export type Agent = {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  icon: string;
  image: string; // Added image property
};

export type AgentDetailsProps = {
  agent: Agent;
};
