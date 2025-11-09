import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoopiAvatar } from "@/components/LoopiAvatar";
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OasisCalm() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos por defecto
  const [isMuted, setIsMuted] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const mindfulnessPhrases = [
    "Respira profundo. Estás haciendo un gran trabajo.",
    "Este momento es para ti. Permítete descansar.",
    "No hay prisa. Tu mente merece este espacio.",
    "Cada respiración te acerca al equilibrio.",
    "Eres capaz de lograr lo que te propones.",
    "Está bien tomar un break. Volverás más fuerte.",
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    // Cambia la frase cada 15 segundos
    const phraseTimer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % mindfulnessPhrases.length);
    }, 15000);

    return () => clearInterval(phraseTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimeLeft(300);
  };

  const setPresetTime = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 relative overflow-hidden">
      {/* Fondo animado suave */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-calm/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto p-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 text-foreground/70 hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>

        <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
          {/* Avatar de Loopi respirando */}
          <div className="relative">
            <div 
              className={`absolute inset-0 bg-gradient-calm rounded-full blur-3xl transition-opacity duration-1000 ${
                isPlaying ? 'opacity-40 animate-pulse' : 'opacity-20'
              }`}
              style={{ animationDuration: '4s' }}
            />
            <LoopiAvatar 
              mood="calm" 
              size="xl" 
              animate={isPlaying}
              className={isPlaying ? "animate-pulse" : ""}
            />
          </div>

          {/* Timer */}
          <Card className="p-12 bg-background/80 backdrop-blur-lg border-primary/20 text-center">
            <div className="space-y-6">
              <h2 className="text-6xl font-bold bg-gradient-calm bg-clip-text text-transparent">
                {formatTime(timeLeft)}
              </h2>
              
              {/* Controles */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={handlePlayPause}
                  className="bg-gradient-calm hover:shadow-loopi w-16 h-16 rounded-full"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleReset}
                  className="border-primary/50 hover:bg-primary/10 w-16 h-16 rounded-full"
                >
                  <RotateCcw className="h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsMuted(!isMuted)}
                  className="border-primary/50 hover:bg-primary/10 w-16 h-16 rounded-full"
                >
                  {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </Button>
              </div>

              {/* Presets de tiempo */}
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPresetTime(3)}
                  className="border-accent/50"
                >
                  3 min
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPresetTime(5)}
                  className="border-accent/50"
                >
                  5 min
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPresetTime(10)}
                  className="border-accent/50"
                >
                  10 min
                </Button>
              </div>
            </div>
          </Card>

          {/* Frase motivacional */}
          <Card className="p-8 bg-background/60 backdrop-blur-lg border-accent/20 max-w-2xl">
            <p className="text-2xl text-center font-medium text-foreground/90 italic transition-all duration-1000">
              "{mindfulnessPhrases[currentPhrase]}"
            </p>
          </Card>

          {/* Sonidos ambientales */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="outline" size="sm" className="border-primary/30 bg-background/50">
              🌊 Olas
            </Button>
            <Button variant="outline" size="sm" className="border-primary/30 bg-background/50">
              🌲 Bosque
            </Button>
            <Button variant="outline" size="sm" className="border-primary/30 bg-background/50">
              🌧️ Lluvia
            </Button>
            <Button variant="outline" size="sm" className="border-primary/30 bg-background/50">
              🔥 Fogata
            </Button>
            <Button variant="outline" size="sm" className="border-primary/30 bg-background/50">
              🎵 Binaural
            </Button>
          </div>

          {/* Acciones finales */}
          <div className="flex gap-4 pt-8">
            <Button
              size="lg"
              onClick={() => navigate("/")}
              className="bg-gradient-loopi hover:shadow-loopi"
            >
              Volver al trabajo
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                if (confirm("¿Seguro que quieres cerrar tu sesión?")) {
                  alert("¡Descansa bien! Nos vemos mañana 😊");
                }
              }}
              className="border-accent/50 hover:bg-accent/10"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
