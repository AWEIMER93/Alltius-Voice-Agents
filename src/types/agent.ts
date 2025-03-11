
export type Agent = {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  icon: string;
};

export type AgentDetailsProps = {
  agent: Agent;
};
