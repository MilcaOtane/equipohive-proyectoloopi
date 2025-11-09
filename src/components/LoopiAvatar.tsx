import { useState, useEffect } from "react";
import loopiCalm from "@/assets/loopi-calm.png";
import loopiHappy from "@/assets/loopi-happy.png";
import loopiExcited from "@/assets/loopi-excited.png";
import loopiAlert from "@/assets/loopi-alert.png";
import loopiSad from "@/assets/loopi-sad.png";
import loopiStressed from "@/assets/loopi-stressed.png";

export type LoopiMood = "calm" | "happy" | "excited" | "alert" | "sad" | "stressed";

interface LoopiAvatarProps {
  mood?: LoopiMood;
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  className?: string;
}

const moodImages: Record<LoopiMood, string> = {
  calm: loopiCalm,
  happy: loopiHappy,
  excited: loopiExcited,
  alert: loopiAlert,
  sad: loopiSad,
  stressed: loopiStressed,
};

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

export const LoopiAvatar = ({ 
  mood = "calm", 
  size = "md", 
  animate = true,
  className = "" 
}: LoopiAvatarProps) => {
  const [currentMood, setCurrentMood] = useState<LoopiMood>(mood);

  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  return (
    <div className={`relative ${className}`}>
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 bg-gradient-loopi rounded-full blur-2xl opacity-20 ${
          animate ? "animate-pulse" : ""
        }`} 
      />
      
      {/* Avatar image */}
      <img
        src={moodImages[currentMood]}
        alt={`Loopi ${currentMood}`}
        className={`relative ${sizeClasses[size]} object-contain drop-shadow-2xl ${
          animate ? "transition-all duration-500 hover:scale-110" : ""
        }`}
      />
    </div>
  );
};
