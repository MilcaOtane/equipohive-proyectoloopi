import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LoopiAvatar } from "@/components/LoopiAvatar";
import { ArrowLeft, Eye, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FocusMonitor() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [focusTime, setFocusTime] = useState(0);
  const [currentSite, setCurrentSite] = useState(t("focus.working"));
  const [isDistracted, setIsDistracted] = useState(false);
  const [showIntervention, setShowIntervention] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFocusTime((prev) => prev + 1);
      
      // Simula detección de distracción después de 30 segundos
      if (focusTime > 30 && !showIntervention) {
        setIsDistracted(true);
        setCurrentSite("YouTube");
        setShowIntervention(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [focusTime, showIntervention]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleContinueWorking = () => {
    setShowIntervention(false);
    setIsDistracted(false);
    setCurrentSite(t("focus.working"));
    setFocusTime(0);
  };

  const handleTakeBreak = () => {
    navigate("/oasis-calm");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-8">
      <LanguageSelector />
      <div className="container max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("focus.back")}
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-loopi bg-clip-text text-transparent">
            {t("focus.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("focus.subtitle")}
          </p>
        </div>

        {/* Estado actual */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-card to-primary/5 border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <LoopiAvatar 
                mood={isDistracted ? "alert" : "happy"} 
                size="lg" 
                animate={true}
              />
              <div>
                <h2 className="text-2xl font-bold">
                  {isDistracted ? t("focus.distracted") : t("focus.doing.well")}
                </h2>
                <p className="text-muted-foreground">
                  {isDistracted ? t("focus.changed.activity") : t("focus.keep.focus")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">{t("focus.time.label")}</p>
              <p className="text-4xl font-bold bg-gradient-loopi bg-clip-text text-transparent">
                {formatTime(focusTime)}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-background/50">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium">{t("focus.current.activity")}</p>
              </div>
              <p className="text-lg font-bold">{currentSite}</p>
            </Card>

            <Card className="p-4 bg-background/50">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-secondary" />
                <p className="text-sm font-medium">{t("focus.sessions.today")}</p>
              </div>
              <p className="text-lg font-bold">{t("focus.sessions.count")}</p>
            </Card>

            <Card className="p-4 bg-background/50">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-accent" />
                <p className="text-sm font-medium">{t("focus.level")}</p>
              </div>
              <Progress value={isDistracted ? 40 : 85} className="h-2 mb-2" />
              <p className="text-lg font-bold">
                {isDistracted ? t("focus.level.medium") : t("focus.level.high")}
              </p>
            </Card>
          </div>
        </Card>

        {/* Intervención empática */}
        {showIntervention && (
          <Card className="p-8 border-accent/50 bg-gradient-to-br from-accent/10 to-primary/10 animate-fade-in">
            <div className="flex flex-col items-center text-center space-y-6">
              <LoopiAvatar mood="calm" size="xl" animate={true} />
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  {t("focus.intervention.title", { site: currentSite })}
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  {t("focus.intervention.subtitle")}
                </p>
                <p className="text-xl font-medium">
                  {t("focus.intervention.question")}
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={handleContinueWorking}
                  className="bg-gradient-loopi hover:shadow-loopi"
                >
                  {t("focus.back.to.work")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleTakeBreak}
                  className="border-accent/50 hover:bg-accent/10"
                >
                  {t("focus.take.break")}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Información adicional */}
        <Card className="p-6 mt-8 bg-gradient-to-br from-secondary/10 to-background border-secondary/20">
          <h3 className="text-xl font-bold mb-4">{t("focus.how.it.works")}</h3>
          <div className="space-y-3 text-muted-foreground">
            <p>{t("focus.detection")}</p>
            <p>{t("focus.questions")}</p>
            <p>{t("focus.autonomy")}</p>
            <p>{t("focus.learn")}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
