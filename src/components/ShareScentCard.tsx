import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { type OlfactoryProfile } from "@/lib/fragranceEngine";
import { toast } from "@/hooks/use-toast";

interface ShareScentCardProps {
  profile: OlfactoryProfile;
  onClose: () => void;
}

const ShareScentCard = ({ profile, onClose }: ShareScentCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true });
      const link = document.createElement("a");
      link.download = `OZARA-${profile.scentName.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      console.error("Failed to generate image");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="flex flex-col items-center gap-6"
        onClick={e => e.stopPropagation()}
      >
        {/* The shareable card */}
        <div
          ref={cardRef}
          className="w-[380px] rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(160deg, hsl(0,0%,6%) 0%, hsl(0,0%,10%) 40%, hsl(40,20%,12%) 100%)" }}
        >
          {/* Top accent bar */}
          <div className="h-1 w-full gradient-gold" />

          <div className="p-8 flex flex-col items-center text-center">
            {/* Logo */}
            <p className="text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: "hsl(40, 60%, 50%)" }}>
              OZARA ID
            </p>
            <p className="text-[9px] tracking-[0.2em] uppercase mb-6" style={{ color: "hsl(40, 10%, 50%)" }}>
              Fragrância Viva
            </p>

            {/* Decorative ring */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{
                background: `radial-gradient(circle, ${profile.color}22 0%, transparent 70%)`,
                border: `1px solid ${profile.color}44`,
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${profile.color}44 0%, transparent 70%)`,
                  border: `1px solid ${profile.color}66`,
                }}
              >
                <div className="w-6 h-6 rounded-full" style={{ background: profile.color }} />
              </div>
            </div>

            {/* Scent name */}
            <h2
              className="text-2xl font-serif mb-2"
              style={{ color: "hsl(40, 60%, 70%)" }}
            >
              {profile.scentName}
            </h2>
            <p className="text-xs leading-relaxed max-w-[280px] mb-6" style={{ color: "hsl(40, 10%, 55%)" }}>
              {profile.description}
            </p>

            {/* Notes */}
            <div className="w-full space-y-3 mb-6">
              {[
                { label: "Top", notes: profile.topNotes },
                { label: "Heart", notes: profile.heartNotes },
                { label: "Base", notes: profile.baseNotes },
              ].map(group => (
                <div key={group.label} className="flex items-center gap-3">
                  <span className="text-[9px] tracking-[0.15em] uppercase w-10 text-right flex-shrink-0" style={{ color: "hsl(40, 10%, 40%)" }}>
                    {group.label}
                  </span>
                  <div className="h-px flex-1" style={{ background: "hsl(40, 10%, 18%)" }} />
                  <span className="text-xs" style={{ color: "hsl(40, 20%, 65%)" }}>
                    {group.notes.map(n => n.name).join(" · ")}
                  </span>
                </div>
              ))}
            </div>

            {/* Intensity */}
            <div className="flex items-center gap-3 w-full">
              <span className="text-[9px] tracking-[0.15em] uppercase" style={{ color: "hsl(40, 10%, 40%)" }}>
                Intensity
              </span>
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "hsl(40, 10%, 15%)" }}>
                <div
                  className="h-full rounded-full gradient-gold"
                  style={{ width: `${profile.intensity}%` }}
                />
              </div>
              <span className="text-xs font-medium" style={{ color: "hsl(40, 60%, 50%)" }}>
                {profile.intensity}%
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 flex items-center justify-between" style={{ borderTop: "1px solid hsl(40, 10%, 15%)" }}>
            <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: "hsl(40, 10%, 35%)" }}>
              Your Olfactory Identity
            </span>
            <span className="text-[8px] tracking-[0.2em] uppercase" style={{ color: "hsl(40, 10%, 35%)" }}>
              ozara.id
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-6 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase gradient-gold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {downloading ? "Generating…" : "Download Image"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase glass-card text-muted-foreground hover:text-foreground transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShareScentCard;
