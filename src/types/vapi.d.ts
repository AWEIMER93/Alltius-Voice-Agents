
interface VapiInstance {
  start: (assistantId: string) => void;
}

interface VapiConstructor {
  new (apiKey: string): VapiInstance;
}

declare global {
  interface Window {
    Vapi: VapiConstructor;
  }
}

export {};
