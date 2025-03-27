import { Plane } from "lucide-react";
import { motion } from "framer-motion";

export default function MovingPlane() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-blue-100 overflow-hidden">
      
      {/* Smoke Trail */}
      <div className="absolute top-1/3 left-23% w-64 h-24 border-t-4 border-purple-500 rounded-full animate-smoke"></div>

      {/* Plane */}
      <motion.div
        className="absolute w-12 h-12 text-blue-600 animate-plane"
      >
        <Plane size={40} />
      </motion.div>

      {/* Flight Details (Appearing One by One) */}
      <div className="text-center mt-32 space-y-2">
        <motion.h3 className="text-red-500 font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          3:15 PM
        </motion.h3>
        
        <motion.h3 className="text-green-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          Hyderabad
        </motion.h3>

        <motion.h3 className="font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
          To
        </motion.h3>

        <motion.h3 className="text-amber-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}>
          Delhi
        </motion.h3>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes moveInSemicircle {
            0% { transform: translateX(-50%) rotate(0deg) translateY(0); }
            50% { transform: translateX(50%) rotate(180deg) translateY(-150px); }
            100% { transform: translateX(-50%) rotate(360deg) translateY(0); }
          }

          @keyframes fadeSmoke {
            0% { opacity: 0.8; transform: translateX(-20px); }
            50% { opacity: 0.4; transform: translateX(0px); }
            100% { opacity: 0; transform: translateX(20px); }
          }

          .animate-plane {
            animation: moveInSemicircle 4s ease-in-out infinite;
          }

          .animate-smoke {
            animation: fadeSmoke 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
