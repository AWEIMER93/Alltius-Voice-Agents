
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VapiPlayerProps {
  assistantId: string;
}

const VapiPlayer: React.FC<VapiPlayerProps> = ({ assistantId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    // Load Vapi script
    const script = document.createElement("script");
    script.src = "https://cdn.vapi.ai/web-sdk@latest/dist/index.min.js";
    script.async = true;
    script.onload = () => initializeVapi();
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, [assistantId]);

  const initializeVapi = () => {
    if (window.Vapi) {
      try {
        setIsLoading(true);
        // Initialize with the API key and assistant ID
        const vapi = new window.Vapi("6efa9f73-a4ea-464e-9fa5-54a7a7eca4f3");
        
        // Use the assistantId from props
        vapi.start(assistantId);
        
        setIsPlayerReady(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing Vapi:", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative min-h-[400px] flex items-center justify-center rounded-xl glass-card p-6 shadow-soft">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-4 border-blue-400 border-t-transparent animate-spin mb-4"></div>
            <p className="text-slate-700">Loading voice agent...</p>
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
        {!isPlayerReady && !isLoading && (
          <div className="text-center text-slate-700">
            <p>Failed to load the voice agent. Please try again.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VapiPlayer;
