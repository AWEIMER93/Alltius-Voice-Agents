
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Vapi from "@vapi-ai/web";
import { Mic, MicOff, Play, Square } from "lucide-react";

interface VapiPlayerProps {
  assistantId: string;
}

const VapiPlayer: React.FC<VapiPlayerProps> = ({ assistantId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const vapiRef = useRef<Vapi | null>(null);
  const [soundIntensity, setSoundIntensity] = useState<number[]>(Array(10).fill(5));

  useEffect(() => {
    // Reset state when component loads or assistantId changes
    setIsLoading(true);
    setError(null);
    setIsPlayerReady(false);
    setIsRunning(false);
    setIsSpeaking(false);
    
    try {
      console.log("Initializing Vapi with assistant ID:", assistantId);
      const apiKey = "6efa9f73-a4ea-464e-9fa5-54a7a7eca4f3";
      const vapi = new Vapi(apiKey);
      
      // Save the vapi instance to the ref but don't start it yet
      vapiRef.current = vapi;
      
      // Set loading state to false and player ready to true
      setIsPlayerReady(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error initializing Vapi:", error);
      setError("Error initializing the voice agent. Please try again later.");
      setIsLoading(false);
    }

    return () => {
      // Cleanup function
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (error) {
          console.error("Error stopping Vapi:", error);
        }
      }
      console.log("Cleaning up Vapi component");
    };
  }, [assistantId]);

  // Sound wave animation effect
  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setSoundIntensity(prev => 
          prev.map(() => Math.max(3, Math.floor(Math.random() * 20)))
        );
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      setSoundIntensity(Array(10).fill(5));
    }
  }, [isSpeaking]);

  // Add event listeners for Vapi's speaking events
  useEffect(() => {
    if (!vapiRef.current) return;
    
    const handleStartSpeaking = () => {
      console.log("Agent started speaking");
      setIsSpeaking(true);
    };
    
    const handleStopSpeaking = () => {
      console.log("Agent stopped speaking");
      setIsSpeaking(false);
    };
    
    // These are custom events we're listening for from Vapi
    document.addEventListener('vapi:start-speaking', handleStartSpeaking);
    document.addEventListener('vapi:stop-speaking', handleStopSpeaking);
    
    return () => {
      document.removeEventListener('vapi:start-speaking', handleStartSpeaking);
      document.removeEventListener('vapi:stop-speaking', handleStopSpeaking);
    };
  }, []);

  const startConversation = () => {
    if (!vapiRef.current) return;
    
    try {
      // Start the assistant with the provided ID
      vapiRef.current.start(assistantId);
      setIsRunning(true);
    } catch (error) {
      console.error("Error starting Vapi conversation:", error);
      setError("Error starting the conversation. Please try again later.");
    }
  };

  const stopConversation = () => {
    if (!vapiRef.current) return;
    
    try {
      vapiRef.current.stop();
      setIsRunning(false);
      setIsSpeaking(false);
    } catch (error) {
      console.error("Error stopping Vapi conversation:", error);
      setError("Error stopping the conversation. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-[400px] flex flex-col items-center justify-center rounded-xl glass-card p-6 shadow-soft">
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
        
        {/* Sound wave visualization */}
        {isRunning && (
          <div className="flex justify-center items-end h-24 my-6 gap-1">
            {soundIntensity.map((height, index) => (
              <motion.div
                key={index}
                className="bg-purple-500 w-2 rounded-full"
                initial={{ height: "20px" }}
                animate={{ 
                  height: isSpeaking ? `${height * 3}px` : "5px",
                  opacity: isSpeaking ? 1 : 0.5
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  damping: 20
                }}
              />
            ))}
          </div>
        )}
        
        {/* Control buttons */}
        <div className="flex justify-center mt-4 space-x-4">
          {!isRunning ? (
            <button
              onClick={startConversation}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
              disabled={!isPlayerReady}
            >
              <Play size={16} />
              <span>Start Conversation</span>
            </button>
          ) : (
            <button
              onClick={stopConversation}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <Square size={16} />
              <span>Stop Conversation</span>
            </button>
          )}
        </div>
        
        {/* Microphone status indicator */}
        {isRunning && (
          <div className="flex justify-center mt-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${isSpeaking ? "text-slate-700" : "text-purple-600"}`}>
              {isSpeaking ? (
                <>
                  <span>Agent is speaking</span>
                </>
              ) : (
                <>
                  <Mic size={14} className="animate-pulse" />
                  <span>Microphone active - go ahead and speak</span>
                </>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VapiPlayer;
