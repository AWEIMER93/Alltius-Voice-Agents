
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VapiPlayerProps {
  assistantId: string;
}

const VapiPlayer: React.FC<VapiPlayerProps> = ({ assistantId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Vapi script
    const loadScript = () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const script = document.createElement("script");
        script.src = "https://cdn.vapi.ai/web-sdk@latest/dist/index.min.js";
        script.async = true;
        script.defer = true;
        script.onload = () => initializeVapi();
        script.onerror = () => {
          setError("Failed to load Vapi script. Please check your internet connection and try again.");
          setIsLoading(false);
        };
        document.body.appendChild(script);
        
        return () => {
          // Cleanup
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        };
      } catch (err) {
        console.error("Error creating script:", err);
        setError("Something went wrong while loading the voice agent.");
        setIsLoading(false);
      }
    };
    
    loadScript();
  }, [assistantId]);

  const initializeVapi = () => {
    if (window.Vapi) {
      try {
        // Initialize with the API key and assistant ID
        const vapi = new window.Vapi("6efa9f73-a4ea-464e-9fa5-54a7a7eca4f3");
        
        // Use the assistantId from props
        vapi.start(assistantId);
        
        setIsPlayerReady(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing Vapi:", error);
        setError("Error initializing the voice agent. Please try again later.");
        setIsLoading(false);
      }
    } else {
      console.error("Vapi is not available");
      setError("Voice agent service is not available. Please try again later.");
      setIsLoading(false);
    }
  };

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
