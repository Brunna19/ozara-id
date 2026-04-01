import { motion } from "framer-motion";

interface FragranceBottleProps {
  color: string;
  intensity: number;
}

const FragranceBottle = ({ color, intensity }: FragranceBottleProps) => {
  const fillHeight = 55 + (intensity / 100) * 30;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative w-36 h-52 md:w-44 md:h-64 flex-shrink-0"
    >
      {/* Glow behind bottle */}
      <div
        className="absolute inset-0 rounded-full blur-[60px] opacity-30"
        style={{ background: color }}
      />

      <svg
        viewBox="0 0 160 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-2xl"
      >
        <defs>
          {/* Bottle body gradient */}
          <linearGradient id="bottleBody" x1="40" y1="60" x2="120" y2="220">
            <stop offset="0%" stopColor="hsl(40, 20%, 18%)" />
            <stop offset="50%" stopColor="hsl(40, 15%, 12%)" />
            <stop offset="100%" stopColor="hsl(40, 10%, 8%)" />
          </linearGradient>

          {/* Glass highlight */}
          <linearGradient id="glassHighlight" x1="50" y1="60" x2="110" y2="60">
            <stop offset="0%" stopColor="hsl(40, 30%, 40%)" stopOpacity="0.4" />
            <stop offset="40%" stopColor="hsl(40, 30%, 30%)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(40, 30%, 20%)" stopOpacity="0" />
          </linearGradient>

          {/* Liquid gradient */}
          <linearGradient id="liquidFill" x1="80" y1="100" x2="80" y2="210">
            <stop offset="0%" stopColor={color} stopOpacity="0.7" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>

          {/* Cap gradient */}
          <linearGradient id="capGrad" x1="65" y1="20" x2="95" y2="55">
            <stop offset="0%" stopColor="hsl(40, 50%, 55%)" />
            <stop offset="50%" stopColor="hsl(40, 40%, 40%)" />
            <stop offset="100%" stopColor="hsl(40, 30%, 25%)" />
          </linearGradient>

          {/* Clip for liquid */}
          <clipPath id="bottleClip">
            <rect x="48" y="65" width="64" height="145" rx="8" />
          </clipPath>
        </defs>

        {/* Cap */}
        <rect x="62" y="18" width="36" height="38" rx="4" fill="url(#capGrad)" />
        <rect x="66" y="22" width="4" height="30" rx="1" fill="hsl(40, 50%, 60%)" opacity="0.3" />

        {/* Neck */}
        <rect x="70" y="54" width="20" height="14" rx="2" fill="url(#bottleBody)" />

        {/* Bottle body */}
        <rect x="48" y="65" width="64" height="145" rx="8" fill="url(#bottleBody)" />

        {/* Liquid */}
        <g clipPath="url(#bottleClip)">
          <motion.rect
            x="48"
            width="64"
            rx="4"
            fill="url(#liquidFill)"
            initial={{ y: 210, height: 0 }}
            animate={{ y: 210 - fillHeight, height: fillHeight }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />
          {/* Liquid surface shine */}
          <motion.ellipse
            cx="80"
            rx="28"
            ry="3"
            fill={color}
            opacity="0.25"
            initial={{ cy: 210 }}
            animate={{ cy: 210 - fillHeight }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />
        </g>

        {/* Glass highlight stripe */}
        <rect x="52" y="68" width="12" height="136" rx="6" fill="url(#glassHighlight)" />

        {/* Bottom edge highlight */}
        <line x1="52" y1="208" x2="108" y2="208" stroke="hsl(40, 30%, 25%)" strokeWidth="0.5" opacity="0.5" />

        {/* Label area */}
        <rect x="58" y="130" width="44" height="28" rx="2" fill="hsl(40, 20%, 14%)" stroke="hsl(40, 40%, 35%)" strokeWidth="0.5" opacity="0.7" />
        <text x="80" y="146" textAnchor="middle" fontSize="6" fill="hsl(40, 50%, 55%)" fontFamily="serif" letterSpacing="2">
          OZARA
        </text>
        <text x="80" y="154" textAnchor="middle" fontSize="3.5" fill="hsl(40, 30%, 45%)" fontFamily="sans-serif" letterSpacing="3">
          ID
        </text>
      </svg>

      {/* Sparkle particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ background: color, left: `${30 + i * 25}%`, top: `${20 + i * 15}%` }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5], y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
};

export default FragranceBottle;
