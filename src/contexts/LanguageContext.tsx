import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translations = {
  // Home page
  "home.hero.greeting": {
    es: "Hola, soy Loopi 👋",
    en: "Hi, I'm Loopi 👋",
  },
  "home.hero.description": {
    es: "No soy un bloqueador más. Soy tu compañero inteligente que te ayuda a mantener el enfoque, mejorar tus hábitos digitales y encontrar el equilibrio perfecto entre productividad y bienestar.",
    en: "I'm not just another blocker. I'm your intelligent companion that helps you stay focused, improve your digital habits, and find the perfect balance between productivity and wellbeing.",
  },
  "home.cta.main": {
    es: "Haz loop con tu bienestar",
    en: "Loop with your wellbeing",
  },
  "home.features.title": {
    es: "¿Por qué elegir Loopi?",
    en: "Why choose Loopi?",
  },
  "home.feature1.title": {
    es: "Asistente Inteligente",
    en: "Intelligent Assistant",
  },
  "home.feature1.description": {
    es: "Te acompaño con preguntas empáticas, no con castigos. Entiendo tu contexto y te ayudo a mantener el enfoque.",
    en: "I accompany you with empathetic questions, not punishments. I understand your context and help you stay focused.",
  },
  "home.feature2.title": {
    es: "Monitor de Enfoque",
    en: "Focus Monitor",
  },
  "home.feature2.description": {
    es: "Detecto cuándo te distraes y te invito a reflexionar, sin juzgarte. ¿Seguimos trabajando o necesitas un break?",
    en: "I detect when you get distracted and invite you to reflect, without judging. Should we keep working or do you need a break?",
  },
  "home.feature3.title": {
    es: "Loop Retos",
    en: "Loop Challenges",
  },
  "home.feature3.description": {
    es: "Gamifica tus logros diarios. Gana puntos, insignias y recompensas reales mientras construyes mejores hábitos.",
    en: "Gamify your daily achievements. Earn points, badges, and real rewards while building better habits.",
  },
  "home.feature4.title": {
    es: "Loop calm",
    en: "Loop calm",
  },
  "home.feature4.description": {
    es: "Espacio de relajación con música ambiental y visuales calmantes para resetear tu mente cuando lo necesites.",
    en: "Relaxation space with ambient music and calming visuals to reset your mind whenever you need it.",
  },
  "home.difference.title": {
    es: "La diferencia Loopi",
    en: "The Loopi difference",
  },
  "home.others": {
    es: "❌ Otras apps",
    en: "❌ Other apps",
  },
  "home.others.block": {
    es: "• Te bloquean y castigan",
    en: "• They block and punish you",
  },
  "home.others.time": {
    es: "• Solo cuentan tiempo",
    en: "• They only count time",
  },
  "home.others.context": {
    es: "• No entienden tu contexto",
    en: "• They don't understand your context",
  },
  "home.others.guilty": {
    es: "• Te hacen sentir culpable",
    en: "• They make you feel guilty",
  },
  "home.loopi.empathy": {
    es: "• Te acompaña con empatía",
    en: "• Accompanies you with empathy",
  },
  "home.loopi.understand": {
    es: "• Entiende qué haces y por qué",
    en: "• Understands what you do and why",
  },
  "home.loopi.propose": {
    es: "• Propone, no impone",
    en: "• Proposes, doesn't impose",
  },
  "home.loopi.celebrate": {
    es: "• Celebra tus logros",
    en: "• Celebrates your achievements",
  },
  "home.difference.quote": {
    es: "No eres el enemigo. La distracción lo es.",
    en: "You're not the enemy. Distraction is.",
  },
  "home.difference.quote2": {
    es: "Y juntos podemos superarla.",
    en: "And together we can overcome it.",
  },
  "home.final.title": {
    es: "Listo para cambiar tus hábitos digitales?",
    en: "Ready to change your digital habits?",
  },
  "home.final.description": {
    es: "Únete a miles de usuarios que ya están mejorando su productividad y bienestar con Loopi",
    en: "Join thousands of users who are already improving their productivity and wellbeing with Loopi",
  },
  "home.final.cta": {
    es: "Descarga Loopi gratis",
    en: "Download Loopi for free",
  },
  "home.final.note": {
    es: "Disponible como extensión web • Sin tarjeta de crédito",
    en: "Available as web extension • No credit card required",
  },
  
  // Chat
  "chat.title": {
    es: "Loopi",
    en: "Loopi",
  },
  "chat.subtitle": {
    es: "Tu asistente digital",
    en: "Your digital assistant",
  },
  "chat.placeholder": {
    es: "Escribe tu mensaje...",
    en: "Type your message...",
  },
  "chat.greeting1": {
    es: "¡Hola! Soy Loopi 👋 Veo que quieres concentrarte más y procrastinar menos, ¿cierto? Vamos a lograrlo juntos.",
    en: "Hi! I'm Loopi 👋 I see you want to focus more and procrastinate less, right? Let's achieve it together.",
  },
  "chat.greeting2": {
    es: "¿Cómo te sientes hoy?",
    en: "How are you feeling today?",
  },
  "chat.error": {
    es: "Lo siento, tuve un problema al responder. ¿Puedes intentar de nuevo?",
    en: "Sorry, I had a problem responding. Can you try again?",
  },
  
  // Focus Monitor
  "focus.title": {
    es: "Monitor de Enfoque",
    en: "Focus Monitor",
  },
  "focus.subtitle": {
    es: "Te acompaño para mantener tu atención sin juzgarte",
    en: "I'm here to help you maintain your attention without judging you",
  },
  "focus.back": {
    es: "Volver",
    en: "Back",
  },
  "focus.distracted": {
    es: "¿Todo bien?",
    en: "Everything okay?",
  },
  "focus.doing.well": {
    es: "¡Vas muy bien!",
    en: "You're doing great!",
  },
  "focus.keep.focus": {
    es: "Mantén el enfoque",
    en: "Keep focus",
  },
  "focus.changed.activity": {
    es: "Noté que cambiaste de actividad",
    en: "I noticed you changed activity",
  },
  "focus.time.label": {
    es: "Tiempo de enfoque",
    en: "Focus time",
  },
  "focus.current.activity": {
    es: "Actividad actual",
    en: "Current activity",
  },
  "focus.sessions.today": {
    es: "Sesiones hoy",
    en: "Sessions today",
  },
  "focus.sessions.count": {
    es: "3 sesiones",
    en: "3 sessions",
  },
  "focus.level": {
    es: "Nivel de foco",
    en: "Focus level",
  },
  "focus.level.medium": {
    es: "Medio",
    en: "Medium",
  },
  "focus.level.high": {
    es: "Alto",
    en: "High",
  },
  "focus.working": {
    es: "Trabajando",
    en: "Working",
  },
  "focus.intervention.title": {
    es: "Te noto en {site} hace un rato",
    en: "I've noticed you're on {site} for a while",
  },
  "focus.intervention.subtitle": {
    es: "No te juzgo, todos necesitamos breaks. Pero quiero preguntarte:",
    en: "I don't judge you, we all need breaks. But I want to ask you:",
  },
  "focus.intervention.question": {
    es: "¿Seguimos trabajando o necesitas un descanso consciente?",
    en: "Should we keep working or do you need a conscious break?",
  },
  "focus.back.to.work": {
    es: "Volver al trabajo",
    en: "Back to work",
  },
  "focus.take.break": {
    es: "Tomar un break",
    en: "Take a break",
  },
  "focus.how.it.works": {
    es: "¿Cómo funciona?",
    en: "How does it work?",
  },
  "focus.detection": {
    es: "• Detección contextual: Identifico cuando cambias de actividad sin juzgarte",
    en: "• Contextual detection: I identify when you change activity without judging you",
  },
  "focus.questions": {
    es: "• Preguntas empáticas: Te invito a reflexionar en lugar de bloquearte",
    en: "• Empathetic questions: I invite you to reflect instead of blocking you",
  },
  "focus.autonomy": {
    es: "• Respeto tu autonomía: Tú decides si continúas o tomas un break",
    en: "• Respect your autonomy: You decide whether to continue or take a break",
  },
  "focus.learn": {
    es: "• Aprendo de ti: Con el tiempo entiendo mejor tus patrones",
    en: "• I learn from you: Over time I understand your patterns better",
  },
  
  // Challenges
  "challenges.title": {
    es: "Loop Retos",
    en: "Loop Challenges",
  },
  "challenges.subtitle": {
    es: "Cada buen hábito cuenta y se celebra",
    en: "Every good habit counts and is celebrated",
  },
  "challenges.amazing": {
    es: "¡Vas increíble! 🎉",
    en: "You're amazing! 🎉",
  },
  "challenges.keep.going": {
    es: "Sigue así y desbloquea más recompensas",
    en: "Keep it up and unlock more rewards",
  },
  "challenges.coins": {
    es: "Loop monedas",
    en: "Loop coins",
  },
  "challenges.active": {
    es: "Retos Activos",
    en: "Active Challenges",
  },
  "challenges.morning.focus": {
    es: "Enfoque matutino",
    en: "Morning focus",
  },
  "challenges.morning.description": {
    es: "Mantén el foco 30 minutos seguidos",
    en: "Stay focused for 30 minutes straight",
  },
  "challenges.close.consciously": {
    es: "Cerrar conscientemente",
    en: "Close consciously",
  },
  "challenges.close.description": {
    es: "Cierra una app distractora por decisión propia",
    en: "Close a distracting app by your own decision",
  },
  "challenges.focused.week": {
    es: "Semana enfocada",
    en: "Focused week",
  },
  "challenges.week.description": {
    es: "Completa 5 sesiones de foco esta semana",
    en: "Complete 5 focus sessions this week",
  },
  "challenges.badges": {
    es: "Tus Insignias",
    en: "Your Badges",
  },
  "challenges.badge.first": {
    es: "Primer Paso",
    en: "First Step",
  },
  "challenges.badge.first.description": {
    es: "Completaste tu primera sesión de foco",
    en: "You completed your first focus session",
  },
  "challenges.badge.consistency": {
    es: "Constancia",
    en: "Consistency",
  },
  "challenges.badge.consistency.description": {
    es: "3 días seguidos de buenos hábitos",
    en: "3 days in a row of good habits",
  },
  "challenges.badge.master": {
    es: "Maestro del Enfoque",
    en: "Focus Master",
  },
  "challenges.badge.master.description": {
    es: "100 horas de foco acumuladas",
    en: "100 hours of accumulated focus",
  },
  "challenges.badge.balance": {
    es: "Equilibrio",
    en: "Balance",
  },
  "challenges.badge.balance.description": {
    es: "Tomaste breaks conscientes 10 veces",
    en: "You took conscious breaks 10 times",
  },
  "challenges.unlocked": {
    es: "Desbloqueada",
    en: "Unlocked",
  },
  "challenges.rewards": {
    es: "Recompensas Reales",
    en: "Real Rewards",
  },
  "challenges.redeem": {
    es: "Canjear",
    en: "Redeem",
  },
  "challenges.locked": {
    es: "Bloqueado",
    en: "Locked",
  },
  "challenges.points": {
    es: "puntos",
    en: "points",
  },
  "challenges.tip": {
    es: "💡 Gana más puntos completando retos y manteniendo buenos hábitos",
    en: "💡 Earn more points by completing challenges and maintaining good habits",
  },
  
  // Oasis Calm
  "oasis.back.to.work": {
    es: "Volver al trabajo",
    en: "Back to work",
  },
  "oasis.close.session": {
    es: "Cerrar sesión",
    en: "Close session",
  },
  "oasis.close.confirm": {
    es: "¿Seguro que quieres cerrar tu sesión?",
    en: "Are you sure you want to close your session?",
  },
  "oasis.goodbye": {
    es: "¡Descansa bien! Nos vemos mañana 😊",
    en: "Rest well! See you tomorrow 😊",
  },
  "oasis.phrase1": {
    es: "Respira profundo. Estás haciendo un gran trabajo.",
    en: "Breathe deeply. You're doing a great job.",
  },
  "oasis.phrase2": {
    es: "Este momento es para ti. Permítete descansar.",
    en: "This moment is for you. Allow yourself to rest.",
  },
  "oasis.phrase3": {
    es: "No hay prisa. Tu mente merece este espacio.",
    en: "There's no rush. Your mind deserves this space.",
  },
  "oasis.phrase4": {
    es: "Cada respiración te acerca al equilibrio.",
    en: "Each breath brings you closer to balance.",
  },
  "oasis.phrase5": {
    es: "Eres capaz de lograr lo que te propones.",
    en: "You're capable of achieving what you set out to do.",
  },
  "oasis.phrase6": {
    es: "Está bien tomar un break. Volverás más fuerte.",
    en: "It's okay to take a break. You'll come back stronger.",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string, params?: Record<string, string>): string => {
    const translation = translations[key]?.[language] || key;
    
    if (!params) return translation;
    
    // Replace parameters in the translation
    let result = translation;
    Object.entries(params).forEach(([param, value]) => {
      result = result.replace(`{${param}}`, value);
    });
    
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
