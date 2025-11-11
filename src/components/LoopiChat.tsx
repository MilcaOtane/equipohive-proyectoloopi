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
export const LoopiChat = ({
  onClose
}: LoopiChatProps) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: "1",
    text: "¡Hola! Soy Loopi 👋 Veo que quieres concentrarte más y procrastinar menos, ¿cierto? Vamos a lograrlo juntos.",
    sender: "loopi",
    mood: "happy",
    timestamp: new Date()
  }, {
    id: "2",
    text: "¿Cómo te sientes hoy?",
    sender: "loopi",
    mood: "calm",
    timestamp: new Date()
  }]);
  const [inputValue, setInputValue] = useState("");
  const [currentMood, setCurrentMood] = useState<LoopiMood>("calm");
  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");

    // Placeholder para respuesta mientras llega el stream
    const tempId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: tempId,
      text: "",
      sender: "loopi",
      mood: "calm",
      timestamp: new Date()
    }]);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/loopi-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text
          }))
        })
      });
      if (!response.ok || !response.body) {
        throw new Error("Error en la respuesta");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullResponse = "";
      let streamDone = false;
      while (!streamDone) {
        const {
          done,
          value
        } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, {
          stream: true
        });
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullResponse += content;
              setMessages(prev => prev.map(m => m.id === tempId ? {
                ...m,
                text: fullResponse,
                mood: "happy" as LoopiMood
              } : m));
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Determinar mood basado en la respuesta
      const mood: LoopiMood = fullResponse.includes("!") || fullResponse.includes("🎉") ? "excited" : fullResponse.includes("?") ? "calm" : "happy";
      setCurrentMood(mood);
      setMessages(prev => prev.map(m => m.id === tempId ? {
        ...m,
        mood
      } : m));
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => prev.filter(m => m.id !== tempId));
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "Lo siento, tuve un problema al responder. ¿Puedes intentar de nuevo?",
        sender: "loopi",
        mood: "sad",
        timestamp: new Date()
      }]);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  return <Card className="fixed bottom-4 right-4 w-96 h-[600px] flex flex-col shadow-loopi border-primary/20 bg-background/95 backdrop-blur-lg z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-loopi">
        <div className="flex items-center gap-3">
          <LoopiAvatar mood={currentMood} size="sm" animate={false} />
          <div>
            <h3 className="font-bold text-white">Loopi</h3>
            <p className="text-xs text-white/80">Tu asistente digital</p>
          </div>
        </div>
        {onClose && <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(message => <div key={message.id} className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "loopi" && <LoopiAvatar mood={message.mood} size="sm" animate={false} />}
              <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${message.sender === "user" ? "bg-gradient-loopi text-white" : "bg-muted text-foreground"}`}>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>)}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Escribe tu mensaje..." className="flex-1" />
          <Button onClick={handleSend} size="icon" className="bg-gradient-loopi hover:shadow-loopi" disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>;
};