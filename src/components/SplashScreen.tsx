import { motion } from "framer-motion";

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen = ({ onStart }: SplashScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-gold-dark/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-2 tracking-[0.4em] text-xs font-sans uppercase text-muted-foreground"
        >
          Introducing
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-serif font-bold gradient-gold-text mb-4">
          OZARA
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-primary/40" />
          <span className="text-sm tracking-[0.3em] uppercase font-sans text-primary/80">
            Fragrância Viva
          </span>
          <div className="h-px w-12 bg-primary/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-muted-foreground font-sans text-lg md:text-xl max-w-md mx-auto mb-12 leading-relaxed"
        >
          Your identity, decoded into scent.
          <br />
          <span className="text-foreground/60">AI-powered fragrance personalization.</span>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="gradient-gold px-10 py-4 rounded-full text-primary-foreground font-sans text-sm tracking-[0.2em] uppercase font-medium glow-gold transition-all"
        >
          Discover Your Scent
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 text-xs text-muted-foreground/50 tracking-wider uppercase"
        >
          ID · Intelligence · Design
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
