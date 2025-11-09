import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LoopiAvatar } from "@/components/LoopiAvatar";
import { ArrowLeft, Trophy, Star, Target, Sparkles, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  points: number;
  completed: boolean;
  icon: any;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: any;
}

export default function Challenges() {
  const navigate = useNavigate();
  const [totalPoints, setTotalPoints] = useState(120);
  
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Enfoque matutino",
      description: "Mantén el foco 30 minutos seguidos",
      progress: 25,
      total: 30,
      points: 10,
      completed: false,
      icon: Target,
    },
    {
      id: "2",
      title: "Cerrar conscientemente",
      description: "Cierra una app distractora por decisión propia",
      progress: 2,
      total: 3,
      points: 5,
      completed: false,
      icon: Sparkles,
    },
    {
      id: "3",
      title: "Semana enfocada",
      description: "Completa 5 sesiones de foco esta semana",
      progress: 3,
      total: 5,
      points: 25,
      completed: false,
      icon: Trophy,
    },
  ]);

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "1",
      name: "Primer Paso",
      description: "Completaste tu primera sesión de foco",
      unlocked: true,
      icon: "🎯",
    },
    {
      id: "2",
      name: "Constancia",
      description: "3 días seguidos de buenos hábitos",
      unlocked: true,
      icon: "🔥",
    },
    {
      id: "3",
      name: "Maestro del Enfoque",
      description: "100 horas de foco acumuladas",
      unlocked: false,
      icon: "👑",
    },
    {
      id: "4",
      name: "Equilibrio",
      description: "Tomaste breaks conscientes 10 veces",
      unlocked: false,
      icon: "⚖️",
    },
  ]);

  const rewards = [
    {
      id: "1",
      name: "15% OFF en Starbucks",
      points: 100,
      icon: "☕",
      available: true,
    },
    {
      id: "2",
      name: "20% OFF en Amazon",
      points: 150,
      icon: "🛍️",
      available: false,
    },
    {
      id: "3",
      name: "1 mes Premium gratis",
      points: 200,
      icon: "⭐",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-8">
      <div className="container max-w-6xl mx-auto">
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
            Loop Retos
          </h1>
          <p className="text-xl text-muted-foreground">
            Cada buen hábito cuenta y se celebra
          </p>
        </div>

        {/* Puntos totales y avatar */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-card to-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <LoopiAvatar mood="excited" size="xl" animate={true} />
              <div>
                <h2 className="text-3xl font-bold mb-2">¡Vas increíble! 🎉</h2>
                <p className="text-muted-foreground">Sigue así y desbloquea más recompensas</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-6 w-6 text-yellow-500" />
                <span className="text-5xl font-bold bg-gradient-loopi bg-clip-text text-transparent">
                  {totalPoints}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">puntos Loop</p>
            </div>
          </div>
        </Card>

        {/* Retos activos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="h-6 w-6" />
            Retos Activos
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              const progressPercent = (challenge.progress / challenge.total) * 100;
              
              return (
                <Card key={challenge.id} className="p-6 hover:shadow-loopi transition-all duration-300 border-primary/20 bg-gradient-to-br from-card to-accent/5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-loopi flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-gradient-loopi text-white">
                      +{challenge.points} pts
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                  <div className="space-y-2">
                    <Progress value={progressPercent} className="h-2" />
                    <p className="text-sm text-muted-foreground text-right">
                      {challenge.progress} / {challenge.total}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Insignias */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Tus Insignias
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <Card 
                key={badge.id} 
                className={`p-6 text-center transition-all duration-300 ${
                  badge.unlocked 
                    ? "border-primary/20 bg-gradient-to-br from-card to-primary/10 hover:shadow-loopi" 
                    : "opacity-50 grayscale"
                }`}
              >
                <div className="text-5xl mb-3">{badge.icon}</div>
                <h3 className="font-bold mb-1">{badge.name}</h3>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
                {badge.unlocked && (
                  <Badge className="mt-3 bg-gradient-loopi text-white">
                    Desbloqueada
                  </Badge>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Recompensas reales */}
        <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Gift className="h-6 w-6" />
            Recompensas Reales
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <Card 
                key={reward.id}
                className={`p-6 text-center ${
                  reward.available 
                    ? "border-accent/50 bg-gradient-to-br from-card to-accent/10" 
                    : "opacity-70"
                }`}
              >
                <div className="text-6xl mb-4">{reward.icon}</div>
                <h3 className="font-bold text-lg mb-2">{reward.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-bold">{reward.points} puntos</span>
                </div>
                <Button
                  disabled={!reward.available}
                  className={reward.available ? "bg-gradient-loopi hover:shadow-loopi w-full" : "w-full"}
                >
                  {reward.available ? "Canjear" : "Bloqueado"}
                </Button>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6 text-sm">
            💡 Gana más puntos completando retos y manteniendo buenos hábitos
          </p>
        </Card>
      </div>
    </div>
  );
}
