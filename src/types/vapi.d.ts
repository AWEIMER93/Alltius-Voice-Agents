
import Vapi from "@vapi-ai/web";

declare global {
  interface Window {
    Vapi: typeof Vapi;
  }
}

export {};
