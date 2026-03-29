import { useState, useCallback } from "react";
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

  if (state === "splash") return <SplashScreen onStart={() => setState("onboarding")} />;
  if (state === "onboarding") return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  if (state === "generating") return <GeneratingScreen onDone={handleGeneratingDone} />;
  if (state === "dashboard" && profile && inputs) {
    return <Dashboard profile={profile} mood={inputs.mood} env={inputs.env} occasion={inputs.occasion} onReset={handleReset} />;
  }

  return null;
};

export default Index;
