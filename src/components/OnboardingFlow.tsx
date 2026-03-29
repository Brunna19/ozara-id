import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Mood, Environment, Occasion } from "@/lib/fragranceEngine";

interface OnboardingFlowProps {
  onComplete: (mood: Mood, env: Environment, occasion: Occasion) => void;
}

type Step = "mood" | "environment" | "occasion";

const moodOptions: { value: Mood; label: string; emoji: string; desc: string }[] = [
  { value: "happy", label: "Happy", emoji: "☀️", desc: "Joyful & energized" },
  { value: "stressed", label: "Stressed", emoji: "🌊", desc: "Need calm & balance" },
  { value: "confident", label: "Confident", emoji: "🔥", desc: "Bold & powerful" },
];

const envOptions: { value: Environment; label: string; emoji: string; desc: string }[] = [
  { value: "hot", label: "Hot", emoji: "🌡️", desc: "Warm climate" },
  { value: "cold", label: "Cold", emoji: "❄️", desc: "Cool atmosphere" },
  { value: "mild", label: "Mild", emoji: "🍃", desc: "Temperate balance" },
];

const occasionOptions: { value: Occasion; label: string; emoji: string; desc: string }[] = [
  { value: "work", label: "Work", emoji: "💼", desc: "Professional setting" },
  { value: "party", label: "Party", emoji: "✨", desc: "Social & festive" },
  { value: "casual", label: "Casual", emoji: "🌿", desc: "Relaxed everyday" },
];

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState<Step>("mood");
  const [mood, setMood] = useState<Mood | null>(null);
  const [env, setEnv] = useState<Environment | null>(null);

  const stepIndex = step === "mood" ? 0 : step === "environment" ? 1 : 2;

  const handleSelect = (value: string) => {
    if (step === "mood") {
      setMood(value as Mood);
      setTimeout(() => setStep("environment"), 400);
    } else if (step === "environment") {
      setEnv(value as Environment);
      setTimeout(() => setStep("occasion"), 400);
    } else {
      onComplete(mood!, env!, value as Occasion);
    }
  };

  const options = step === "mood" ? moodOptions : step === "environment" ? envOptions : occasionOptions;
  const title = step === "mood" ? "How are you feeling?" : step === "environment" ? "What's your climate?" : "What's the occasion?";
  const subtitle = step === "mood" ? "Your emotional state shapes the soul of your fragrance" : step === "environment" ? "Temperature influences scent performance and note selection" : "Context defines how your fragrance tells your story";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-12 justify-center">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${i <= stepIndex ? "bg-primary scale-125" : "bg-muted"}`} />
              {i < 2 && <div className={`w-8 h-px transition-all duration-500 ${i < stepIndex ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 font-sans">
                Step {stepIndex + 1} of 3
              </p>
              <h2 className="text-3xl md:text-4xl font-serif mb-3">{title}</h2>
              <p className="text-muted-foreground font-sans text-sm">{subtitle}</p>
            </div>

            <div className="grid gap-4">
              {options.map(opt => (
                <motion.button
                  key={opt.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(opt.value)}
                  className="glass-card rounded-xl p-6 flex items-center gap-5 text-left transition-all hover:border-primary/40 group"
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <div>
                    <div className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                      {opt.label}
                    </div>
                    <div className="text-sm text-muted-foreground font-sans">{opt.desc}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingFlow;
