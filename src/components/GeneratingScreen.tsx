import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GeneratingScreenProps {
  onDone: () => void;
}

const stages = [
  "Analyzing your emotional profile…",
  "Mapping environmental factors…",
  "Selecting molecular compositions…",
  "Crafting your olfactory identity…",
];

const GeneratingScreen = ({ onDone }: GeneratingScreenProps) => {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex(prev => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setTimeout(onDone, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 text-center"
      >
        <div className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto border border-primary/30 rounded-full flex items-center justify-center"
          >
            <div className="w-8 h-8 border border-primary/60 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-primary rounded-full" />
            </div>
          </motion.div>
        </div>

        <h2 className="text-2xl font-serif mb-6 gradient-gold-text">Generating Your Profile</h2>

        <div className="space-y-3">
          {stages.map((stage, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: i <= stageIndex ? 1 : 0.2, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`text-sm font-sans ${i <= stageIndex ? "text-foreground" : "text-muted-foreground/30"}`}
            >
              {i < stageIndex ? "✓" : i === stageIndex ? "◉" : "○"} {stage}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GeneratingScreen;
