import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-lg border border-border/50 rounded-full p-1">
      <Languages className="h-4 w-4 ml-2 text-muted-foreground" />
      <Button
        variant={language === "es" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("es")}
        className={language === "es" ? "bg-gradient-loopi text-white rounded-full" : "rounded-full"}
      >
        ES
      </Button>
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={language === "en" ? "bg-gradient-loopi text-white rounded-full" : "rounded-full"}
      >
        EN
      </Button>
    </div>
  );
};
