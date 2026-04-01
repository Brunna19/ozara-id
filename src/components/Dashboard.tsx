import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FragranceBottle from "./FragranceBottle";
import ShareScentCard from "./ShareScentCard";
import {
  type OlfactoryProfile,
  type Mood,
  type Environment,
  type Occasion,
  type TimeOfDay,
  getAdaptiveScent,
  generateInsights,
  evolutionData,
} from "@/lib/fragranceEngine";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface DashboardProps {
  profile: OlfactoryProfile;
  mood: Mood;
  env: Environment;
  occasion: Occasion;
  onReset: () => void;
}

const timeLabels: { value: TimeOfDay; label: string; icon: string }[] = [
  { value: "morning", label: "Morning", icon: "🌅" },
  { value: "afternoon", label: "Afternoon", icon: "☀️" },
  { value: "night", label: "Night", icon: "🌙" },
];

const Dashboard = ({ profile, mood, env, occasion, onReset }: DashboardProps) => {
  const [activeTime, setActiveTime] = useState<TimeOfDay>("afternoon");
  const [activeTab, setActiveTab] = useState<"scent" | "evolution" | "insights" | "adaptive" | "sustainability">("scent");
  const [showShare, setShowShare] = useState(false);
  const adaptiveScent = getAdaptiveScent(profile, activeTime);
  const insights = generateInsights(mood, env, occasion, profile);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const tabs = [
    { id: "scent" as const, label: "Your Scent" },
    { id: "evolution" as const, label: "Evolution" },
    { id: "adaptive" as const, label: "Adaptive" },
    { id: "insights" as const, label: "AI Insights" },
    { id: "sustainability" as const, label: "Sustainability" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-serif gradient-gold-text">OZARA</h1>
            <span className="text-xs text-muted-foreground tracking-wider">ID</span>
          </div>
          <button onClick={onReset} className="text-xs text-muted-foreground hover:text-primary transition-colors font-sans tracking-wider uppercase">
            New Profile
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border/30 px-6 overflow-x-auto">
        <div className="max-w-5xl mx-auto flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs font-sans tracking-wider uppercase whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === "scent" && (
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            {/* Hero Card */}
            <motion.div variants={item} className="glass-card rounded-2xl p-8 glow-gold relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-20" style={{ background: profile.color }} />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2 font-sans">Your Olfactory Identity</p>
                  <h2 className="text-4xl md:text-5xl font-serif mb-3 gradient-gold-text">{profile.scentName}</h2>
                  <p className="text-muted-foreground font-sans max-w-lg leading-relaxed">{profile.description}</p>

                  <div className="mt-6 flex items-center gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground font-sans mb-1">Intensity</p>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${profile.intensity}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full gradient-gold rounded-full"
                          />
                        </div>
                        <span className="text-sm font-sans text-primary">{profile.intensity}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <FragranceBottle color={profile.color} intensity={profile.intensity} />
              </div>
            </motion.div>

            {/* Notes Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Top Notes", notes: profile.topNotes, desc: "First impression · 15 min" },
                { label: "Heart Notes", notes: profile.heartNotes, desc: "Core character · 2-4 hrs" },
                { label: "Base Notes", notes: profile.baseNotes, desc: "Lasting memory · 6+ hrs" },
              ].map((group, gi) => (
                <motion.div key={gi} variants={item} className="glass-card rounded-xl p-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1 font-sans">{group.label}</p>
                  <p className="text-[10px] text-muted-foreground/50 font-sans mb-4">{group.desc}</p>
                  {group.notes.map((note, ni) => (
                    <div key={ni} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                      <span className="font-sans text-sm text-foreground">{note.name}</span>
                      <span className="text-xs text-muted-foreground font-sans capitalize">{note.category}</span>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "evolution" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif mb-2">Scent Evolution</h2>
              <p className="text-sm text-muted-foreground font-sans">How your fragrance profile adapts throughout the week</p>
            </div>
            <div className="glass-card rounded-xl p-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={evolutionData}>
                  <defs>
                    <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(40, 60%, 50%)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(40, 60%, 50%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(40, 50%, 70%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(40, 50%, 70%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(40, 50%, 30%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(40, 50%, 30%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="hsl(40, 10%, 30%)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(40, 10%, 30%)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: "hsl(0, 0%, 7%)", border: "1px solid hsl(40, 10%, 18%)", borderRadius: "8px", fontSize: "12px" }}
                    labelStyle={{ color: "hsl(40, 60%, 50%)" }}
                  />
                  <Area type="monotone" dataKey="top" stroke="hsl(40, 60%, 50%)" fill="url(#topGrad)" strokeWidth={2} name="Top Notes" />
                  <Area type="monotone" dataKey="heart" stroke="hsl(40, 50%, 70%)" fill="url(#heartGrad)" strokeWidth={2} name="Heart Notes" />
                  <Area type="monotone" dataKey="base" stroke="hsl(40, 50%, 30%)" fill="url(#baseGrad)" strokeWidth={2} name="Base Notes" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {activeTab === "adaptive" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif mb-2">Adaptive Fragrance</h2>
              <p className="text-sm text-muted-foreground font-sans">Your scent intelligently shifts throughout the day</p>
            </div>

            <div className="flex gap-2 mb-6">
              {timeLabels.map(t => (
                <button
                  key={t.value}
                  onClick={() => setActiveTime(t.value)}
                  className={`flex-1 glass-card rounded-xl p-4 text-center transition-all ${
                    activeTime === t.value ? "border-primary/50 glow-gold" : ""
                  }`}
                >
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <div className="text-xs font-sans tracking-wider uppercase text-muted-foreground">{t.label}</div>
                </button>
              ))}
            </div>

            <div className="glass-card rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-primary-foreground text-sm">
                  {adaptiveScent.intensity}%
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-sans">Intensity Level</p>
                  <p className="font-serif text-foreground">{activeTime.charAt(0).toUpperCase() + activeTime.slice(1)} Profile</p>
                </div>
              </div>
              <p className="text-muted-foreground font-sans text-sm mb-6">{adaptiveScent.description}</p>
              <div className="flex flex-wrap gap-2">
                {adaptiveScent.notes.map((note, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-xs font-sans bg-muted text-muted-foreground border border-border/50">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "insights" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif mb-2">AI Insights</h2>
              <p className="text-sm text-muted-foreground font-sans">Understanding the science behind your scent</p>
            </div>
            <div className="space-y-4">
              {insights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="glass-card rounded-xl p-6 flex gap-4"
                >
                  <div className="w-8 h-8 rounded-full gradient-gold flex-shrink-0 flex items-center justify-center text-primary-foreground text-xs font-sans font-semibold">
                    {i + 1}
                  </div>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed">{insight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "sustainability" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif mb-2">Sustainability</h2>
              <p className="text-sm text-muted-foreground font-sans">Luxury that respects our planet</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: "♻️",
                  title: "Smart Refill System",
                  desc: "Our patented OZARA Pod system reduces packaging waste by 87%. Simply return your depleted pod and receive a freshly calibrated refill.",
                },
                {
                  icon: "🌱",
                  title: "Ethically Sourced",
                  desc: "Every ingredient is traceable to its origin. We partner with sustainable farms and fair-trade cooperatives worldwide.",
                },
                {
                  icon: "📦",
                  title: "Zero-Waste Packaging",
                  desc: "Packaging crafted from recycled ocean plastics and biodegradable materials. Beautiful outside and in.",
                },
                {
                  icon: "🧬",
                  title: "Bio-Identical Molecules",
                  desc: "Lab-created alternatives to rare natural ingredients protect endangered species while maintaining olfactory excellence.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-serif text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="glass-card rounded-xl p-8 text-center shimmer">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 font-sans">Our Commitment</p>
              <p className="text-2xl font-serif gradient-gold-text mb-2">Carbon Neutral by 2026</p>
              <p className="text-sm text-muted-foreground font-sans max-w-md mx-auto">
                Every OZARA ID fragrance offsets 120% of its carbon footprint through verified reforestation programs.
              </p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
