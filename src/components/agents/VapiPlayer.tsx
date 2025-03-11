
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Vapi from "@vapi-ai/web";

interface VapiPlayerProps {
  assistantId: string;
}

const VapiPlayer: React.FC<VapiPlayerProps> = ({ assistantId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when component loads or assistantId changes
    setIsLoading(true);
    setError(null);
    setIsPlayerReady(false);
    
    try {
      console.log("Initializing Vapi with assistant ID:", assistantId);
      const apiKey = "6efa9f73-a4ea-464e-9fa5-54a7a7eca4f3";
      const vapi = new Vapi(apiKey);
      
      // Start the assistant with the provided ID
      vapi.start(assistantId);
      
      // Set loading state to false and player ready to true
      setIsPlayerReady(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error initializing Vapi:", error);
      setError("Error initializing the voice agent. Please try again later.");
      setIsLoading(false);
    }

    return () => {
      // Cleanup function if needed
      console.log("Cleaning up Vapi component");
    };
  }, [assistantId]);

  return (
    <div className="relative min-h-[400px] flex items-center justify-center rounded-xl glass-card p-6 shadow-soft">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mb-4"></div>
            <p className="text-slate-700">Loading voice agent...</p>
          </div>
        </div>
      )}
      
      {error && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl z-10">
          <div className="flex flex-col items-center p-6 max-w-md text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-slate-700 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlayerReady ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div id="vapi-ai"></div>
      </motion.div>
    </div>
  );
};

export default VapiPlayer;
