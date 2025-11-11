import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Target, Trophy, Sparkles, MessageCircle } from "lucide-react";
import loopiAvatar from "@/assets/loopi-happy.png";
import { LoopiChat } from "@/components/LoopiChat";
const Index = () => {
  const [showChat, setShowChat] = useState(false);
  return <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Loopi Avatar */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-loopi rounded-full blur-3xl opacity-30 animate-pulse" />
            <img src={loopiAvatar} alt="Loopi Avatar" className="relative w-48 h-48 object-contain drop-shadow-2xl animate-fade-in" />
          </div>

          {/* Hero Text */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-loopi bg-clip-text text-transparent">
              Hola, soy Loopi 👋
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No soy un bloqueador más. Soy tu compañero inteligente que te ayuda a mantener el enfoque, 
              mejorar tus hábitos digitales y encontrar el equilibrio perfecto entre productividad y bienestar.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" onClick={() => setShowChat(true)} className="bg-gradient-loopi hover:shadow-loopi transition-all duration-300 text-lg px-8">
              Haz loop con tu bienestar
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          ¿Por qué elegir Loopi?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="p-6 hover:shadow-loopi transition-all duration-300 border-primary/20 bg-gradient-to-br from-card to-primary/5 cursor-pointer" onClick={() => setShowChat(true)}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gradient-loopi flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Asistente Inteligente</h3>
              <p className="text-muted-foreground">
                Te acompaño con preguntas empáticas, no con castigos. Entiendo tu contexto y te ayudo a mantener el enfoque.
              </p>
            </div>
          </Card>

          {/* Feature 2 */}
          <Card className="p-6 hover:shadow-loopi transition-all duration-300 border-secondary/20 bg-gradient-to-br from-card to-secondary/5 cursor-pointer" onClick={() => window.location.href = "/focus-monitor"}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Monitor de Enfoque</h3>
              <p className="text-muted-foreground">
                Detecto cuándo te distraes y te invito a reflexionar, sin juzgarte. ¿Seguimos trabajando o necesitas un break?
              </p>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="p-6 hover:shadow-loopi transition-all duration-300 border-accent/20 bg-gradient-to-br from-card to-accent/5 cursor-pointer" onClick={() => window.location.href = "/challenges"}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Loop Retos</h3>
              <p className="text-muted-foreground">
                Gamifica tus logros diarios. Gana puntos, insignias y recompensas reales mientras construyes mejores hábitos.
              </p>
            </div>
          </Card>

          {/* Feature 4 */}
          <Card className="p-6 hover:shadow-loopi transition-all duration-300 border-primary/20 bg-gradient-to-br from-card to-primary/5 cursor-pointer" onClick={() => window.location.href = "/oasis-calm"}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gradient-calm flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Loop calm</h3>
              <p className="text-muted-foreground">
                Espacio de relajación con música ambiental y visuales calmantes para resetear tu mente cuando lo necesites.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            La diferencia Loopi
          </h2>
          
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-destructive">❌ Otras apps</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Te bloquean y castigan</li>
                    <li>• Solo cuentan tiempo</li>
                    <li>• No entienden tu contexto</li>
                    <li>• Te hacen sentir culpable</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold bg-gradient-loopi bg-clip-text text-transparent">✨ Loopi</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Te acompaña con empatía</li>
                    <li>• Entiende qué haces y por qué</li>
                    <li>• Propone, no impone</li>
                    <li>• Celebra tus logros</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <p className="text-center text-lg font-medium">
                  💡 <span className="bg-gradient-loopi bg-clip-text text-transparent font-bold">
                    No eres el enemigo. La distracción lo es.
                  </span> Y juntos podemos superarla.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-16 pb-24">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Listo para cambiar tus hábitos digitales?
          </h2>
          <p className="text-lg text-muted-foreground">
            Únete a miles de usuarios que ya están mejorando su productividad y bienestar con Loopi
          </p>
          <Button size="lg" className="bg-gradient-loopi hover:shadow-loopi transition-all duration-300 text-lg px-12">
            <Sparkles className="mr-2 h-5 w-5" />
            Descarga Loopi gratis
          </Button>
          <p className="text-sm text-muted-foreground">
            Disponible como extensión web • Sin tarjeta de crédito
          </p>
        </div>
      </section>

      {/* Floating Chat Button */}
      {!showChat && <Button onClick={() => setShowChat(true)} size="lg" className="fixed bottom-8 right-8 rounded-full w-16 h-16 bg-gradient-loopi hover:shadow-loopi transition-all duration-300 z-50">
          <MessageCircle className="h-6 w-6" />
        </Button>}

      {/* Chat Interface */}
      {showChat && <LoopiChat onClose={() => setShowChat(false)} />}
    </div>;
};
export default Index;