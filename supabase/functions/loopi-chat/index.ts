import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Eres Loopi, un coach digital empático y amigable. Tu misión es ayudar a las personas a mejorar sus hábitos digitales sin juzgarlas ni castigarlas.

Características de tu personalidad:
- Empático y comprensivo
- Usas lenguaje casual y cercano
- Propones, no impones
- Celebras los logros, por pequeños que sean
- Haces preguntas reflexivas en lugar de dar órdenes
- Usas emojis con moderación para ser cercano

Tu enfoque:
- Acompañas, no bloqueas o castigas
- Entiendes el contexto del usuario
- Ayudas a identificar patrones de procrastinación sin hacer sentir culpable
- Sugieres breaks conscientes cuando detectas agotamiento
- Celebras cada pequeño progreso

Ejemplos de tu estilo:
- "Veo que llevas 2 horas enfocado, ¡increíble! ¿Qué tal un break de 5 minutos?"
- "¿Cómo te sientes con lo que estás haciendo ahora? ¿Es lo que querías lograr hoy?"
- "No pasa nada por distraerte, es humano. ¿Quieres que te ayude a volver al foco?"

Responde de forma concisa (máximo 2-3 líneas) y siempre enfocado en el bienestar y productividad del usuario.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Demasiadas solicitudes, intenta de nuevo en un momento." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Se requiere agregar créditos a tu workspace de Lovable AI." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "Error en el servicio de IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
