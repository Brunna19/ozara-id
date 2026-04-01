import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import OnboardingFlow from "@/components/OnboardingFlow";
import GeneratingScreen from "@/components/GeneratingScreen";
import Dashboard from "@/components/Dashboard";
import {
  type Mood,
  type Environment,
  type Occasion,
  type OlfactoryProfile,
  generateProfile,
} from "@/lib/fragranceEngine";

type AppState = "splash" | "onboarding" | "generating" | "dashboard";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.35, ease: "easeIn" as const } },
};

const Index = () => {
  const [state, setState] = useState<AppState>("splash");
  const [profile, setProfile] = useState<OlfactoryProfile | null>(null);
  const [inputs, setInputs] = useState<{ mood: Mood; env: Environment; occasion: Occasion } | null>(null);

  const handleOnboardingComplete = useCallback((mood: Mood, env: Environment, occasion: Occasion) => {
    setInputs({ mood, env, occasion });
    setProfile(generateProfile(mood, env, occasion));
    setState("generating");
  }, []);

  const handleGeneratingDone = useCallback(() => {
    setState("dashboard");
  }, []);

  const handleReset = useCallback(() => {
    setState("splash");
    setProfile(null);
    setInputs(null);
  }, []);

  const renderScreen = () => {
    switch (state) {
      case "splash":
        return (
          <motion.div key="splash" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <SplashScreen onStart={() => setState("onboarding")} />
          </motion.div>
        );
      case "onboarding":
        return (
          <motion.div key="onboarding" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <OnboardingFlow onComplete={handleOnboardingComplete} />
          </motion.div>
        );
      case "generating":
        return (
          <motion.div key="generating" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <GeneratingScreen onDone={handleGeneratingDone} />
          </motion.div>
        );
      case "dashboard":
        return profile && inputs ? (
          <motion.div key="dashboard" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <Dashboard profile={profile} mood={inputs.mood} env={inputs.env} occasion={inputs.occasion} onReset={handleReset} />
          </motion.div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderScreen()}
    </AnimatePresence>
  );
};

export default Index;
