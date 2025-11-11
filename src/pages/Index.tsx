import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Target, Trophy, Sparkles, MessageCircle } from "lucide-react";
import loopiAvatar from "@/assets/loopi-happy.png";
import { LoopiChat } from "@/components/LoopiChat";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const { t } = useLanguage();
  
  return <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <LanguageSelector />
      
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
              {t("home.hero.greeting")}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.hero.description")}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" onClick={() => setShowChat(true)} className="bg-gradient-loopi hover:shadow-loopi transition-all duration-300 text-lg px-8">
              {t("home.cta.main")}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t("home.features.title")}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="p-6 hover:shadow-loopi transition-all duration-300 border-primary/20 bg-gradient-to-br from-card to-primary/5 cursor-pointer" onClick={() => setShowChat(true)}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gradient-loopi flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">{t("home.feature1.title")}</h3>
              <p className="text-muted-foreground">
                {t("home.feature1.description")}
              </p>
            </div>
          </Card>

          {/* Feature 2 */}
          <Card className="p-6 hover:shadow-loopi transition-all duration-300 border-secondary/20 bg-gradient-to-br from-card to-secondary/5 cursor-pointer" onClick={() => window.location.href = "/focus-monitor"}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">{t("home.feature2.title")}</h3>
              <p className="text-muted-foreground">
                {t("home.feature2.description")}
              </p>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="p-6 hover:shadow-loopi transition-all duration-300 border-accent/20 bg-gradient-to-br from-card to-accent/5 cursor-pointer" onClick={() => window.location.href = "/challenges"}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">{t("home.feature3.title")}</h3>
              <p className="text-muted-foreground">
                {t("home.feature3.description")}
              </p>
            </div>
          </Card>

          {/* Feature 4 */}
          <Card className="p-6 hover:shadow-loopi transition-all duration-300 border-primary/20 bg-gradient-to-br from-card to-primary/5 cursor-pointer" onClick={() => window.location.href = "/oasis-calm"}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gradient-calm flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">{t("home.feature4.title")}</h3>
              <p className="text-muted-foreground">
                {t("home.feature4.description")}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("home.difference.title")}
          </h2>
          
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-destructive">{t("home.others")}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>{t("home.others.block")}</li>
                    <li>{t("home.others.time")}</li>
                    <li>{t("home.others.context")}</li>
                    <li>{t("home.others.guilty")}</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold bg-gradient-loopi bg-clip-text text-transparent">✨ Loopi</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>{t("home.loopi.empathy")}</li>
                    <li>{t("home.loopi.understand")}</li>
                    <li>{t("home.loopi.propose")}</li>
                    <li>{t("home.loopi.celebrate")}</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <p className="text-center text-lg font-medium">
                  💡 <span className="bg-gradient-loopi bg-clip-text text-transparent font-bold">
                    {t("home.difference.quote")}
                  </span> {t("home.difference.quote2")}
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
            {t("home.final.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("home.final.description")}
          </p>
          <Button size="lg" className="bg-gradient-loopi hover:shadow-loopi transition-all duration-300 text-lg px-12">
            <Sparkles className="mr-2 h-5 w-5" />
            {t("home.final.cta")}
          </Button>
          <p className="text-sm text-muted-foreground">
            {t("home.final.note")}
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