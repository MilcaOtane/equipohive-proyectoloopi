import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LoopiAvatar } from "@/components/LoopiAvatar";
import { ArrowLeft, Eye, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FocusMonitor() {
  const navigate = useNavigate();
  const [focusTime, setFocusTime] = useState(0);
  const [currentSite, setCurrentSite] = useState("Trabajando");
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
    setCurrentSite("Trabajando");
    setFocusTime(0);
  };

  const handleTakeBreak = () => {
    navigate("/oasis-calm");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-8">
      <div className="container max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-loopi bg-clip-text text-transparent">
            Monitor de Enfoque
          </h1>
          <p className="text-xl text-muted-foreground">
            Te acompaño para mantener tu atención sin juzgarte
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
                  {isDistracted ? "¿Todo bien?" : "¡Vas muy bien!"}
                </h2>
                <p className="text-muted-foreground">
                  {isDistracted ? "Noté que cambiaste de actividad" : "Mantén el enfoque"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Tiempo de enfoque</p>
              <p className="text-4xl font-bold bg-gradient-loopi bg-clip-text text-transparent">
                {formatTime(focusTime)}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-background/50">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium">Actividad actual</p>
              </div>
              <p className="text-lg font-bold">{currentSite}</p>
            </Card>

            <Card className="p-4 bg-background/50">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-secondary" />
                <p className="text-sm font-medium">Sesiones hoy</p>
              </div>
              <p className="text-lg font-bold">3 sesiones</p>
            </Card>

            <Card className="p-4 bg-background/50">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-accent" />
                <p className="text-sm font-medium">Nivel de foco</p>
              </div>
              <Progress value={isDistracted ? 40 : 85} className="h-2 mb-2" />
              <p className="text-lg font-bold">{isDistracted ? "Medio" : "Alto"}</p>
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
                  Te noto en {currentSite} hace un rato
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  No te juzgo, todos necesitamos breaks. Pero quiero preguntarte:
                </p>
                <p className="text-xl font-medium">
                  ¿Seguimos trabajando o necesitas un descanso consciente?
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={handleContinueWorking}
                  className="bg-gradient-loopi hover:shadow-loopi"
                >
                  Volver al trabajo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleTakeBreak}
                  className="border-accent/50 hover:bg-accent/10"
                >
                  Tomar un break
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Información adicional */}
        <Card className="p-6 mt-8 bg-gradient-to-br from-secondary/10 to-background border-secondary/20">
          <h3 className="text-xl font-bold mb-4">¿Cómo funciona?</h3>
          <div className="space-y-3 text-muted-foreground">
            <p>
              • <strong>Detección contextual:</strong> Identifico cuando cambias de actividad sin juzgarte
            </p>
            <p>
              • <strong>Preguntas empáticas:</strong> Te invito a reflexionar en lugar de bloquearte
            </p>
            <p>
              • <strong>Respeto tu autonomía:</strong> Tú decides si continúas o tomas un break
            </p>
            <p>
              • <strong>Aprendo de ti:</strong> Con el tiempo entiendo mejor tus patrones
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
