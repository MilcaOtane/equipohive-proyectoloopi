import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoopiAvatar, LoopiMood } from "@/components/LoopiAvatar";
import { Send, X } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "loopi";
  mood?: LoopiMood;
  timestamp: Date;
}

interface LoopiChatProps {
  onClose?: () => void;
}

export const LoopiChat = ({ onClose }: LoopiChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy Loopi 👋 Veo que quieres concentrarte más y procrastinar menos, ¿cierto? Vamos a lograrlo juntos.",
      sender: "loopi",
      mood: "happy",
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "¿Cómo te sientes hoy?",
      sender: "loopi",
      mood: "calm",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentMood, setCurrentMood] = useState<LoopiMood>("calm");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulated response (aquí se integrará con Lovable AI)
    setTimeout(() => {
      const responses = [
        { text: "Genial, ¡vamos a trabajar en eso juntos! 💪", mood: "excited" as LoopiMood },
        { text: "Entiendo cómo te sientes. Estoy aquí para ayudarte.", mood: "calm" as LoopiMood },
        { text: "¡Excelente actitud! Eso es lo que me gusta escuchar 🎉", mood: "happy" as LoopiMood },
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setCurrentMood(randomResponse.mood);
      
      const loopiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse.text,
        sender: "loopi",
        mood: randomResponse.mood,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, loopiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] flex flex-col shadow-loopi border-primary/20 bg-background/95 backdrop-blur-lg z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-loopi">
        <div className="flex items-center gap-3">
          <LoopiAvatar mood={currentMood} size="sm" animate={false} />
          <div>
            <h3 className="font-bold text-white">Loopi</h3>
            <p className="text-xs text-white/80">Tu coach digital</p>
          </div>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "loopi" && (
                <LoopiAvatar mood={message.mood} size="sm" animate={false} />
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-gradient-loopi text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-gradient-loopi hover:shadow-loopi"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
