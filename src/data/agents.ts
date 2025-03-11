
import { Agent } from "../types/agent";
import {
  Calculator,
  Car,
  Stethoscope,
  Home,
  Building,
  CreditCard,
} from "lucide-react";

export const agentsList: Agent[] = [
  {
    id: "ca826bca-ff48-4d38-83fc-916378950717",
    name: "Paul",
    role: "Auto Quote Agent",
    description: "Provides custom quotes for auto insurance with personalized options tailored to your needs.",
    color: "bg-blue-500",
    icon: "Car",
  },
  {
    id: "90d49ea2-987a-4c8b-ad61-bc4c4260d7a0",
    name: "Marcus",
    role: "FNOL Agent",
    description: "Handles First Notice of Loss reports for insurance claims with efficiency and empathy.",
    color: "bg-red-500",
    icon: "FileText",
  },
  {
    id: "9a9c7a75-00c5-4509-b219-20823a23ec4f",
    name: "Anthony",
    role: "Inbound Wealth Management Agent",
    description: "Assists with financial planning, investments, and wealth management solutions.",
    color: "bg-emerald-500",
    icon: "TrendingUp",
  },
  {
    id: "dee74b31-8eac-4e12-9bba-95d52447ecaf",
    name: "Nathan",
    role: "Health Care Collections Agent",
    description: "Manages healthcare billing, insurance claims, and collection processes with care.",
    color: "bg-violet-500",
    icon: "Stethoscope",
  },
  {
    id: "8b21ce94-2406-4d56-b537-9506ed89a6b4",
    name: "Michael",
    role: "Mortgage Servicing Agent",
    description: "Helps with mortgage questions, payments, and servicing needs for homeowners.",
    color: "bg-amber-500",
    icon: "Home",
  },
  {
    id: "09760261-896a-4eec-bc26-024e7a22d946",
    name: "Lauren",
    role: "Home Insurance Agent",
    description: "Provides guidance on home insurance policies, coverage options, and claims.",
    color: "bg-cyan-500",
    icon: "Building",
  },
];

export const getAgentById = (id: string): Agent | undefined => {
  return agentsList.find(agent => agent.id === id);
};

export const getAgentIcon = (iconName: string) => {
  switch (iconName) {
    case "Car":
      return Car;
    case "FileText":
      return Calculator;
    case "TrendingUp":
      return CreditCard;
    case "Stethoscope":
      return Stethoscope;
    case "Home":
      return Home;
    case "Building":
      return Building;
    default:
      return Building;
  }
};
