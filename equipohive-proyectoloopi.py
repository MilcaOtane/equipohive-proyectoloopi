import streamlit as st
from PIL import Image
import random

# --- Configuración de la app ---
st.set_page_config(page_title="Loopi Asistente", page_icon="💫", layout="wide")

# --- Cargar imágenes de emociones ---
emociones = {
    "feliz": Image.open("2 muy feliz amigable.png"),
    "tranquilo": Image.open("3 feliz tranquilo.png"),
    "calmado": Image.open("1 loopi sonrie ojo cerrado.png"),
    "animado": Image.open("2 manos arriba ojos abierto.png"),
    "molesto": Image.open("4 molesto manos arriba.png"),
    "triste": Image.open("5 triste.png")
}

# --- Encabezado ---
st.title("💫 Loopi Asistente Virtual")
st.subheader("Cuida tu mente, protege tu mundo 🌍")

# --- Menú principal ---
menu = st.sidebar.radio("Selecciona una función:", 
                        ["Asistente Inteligente", "Monitor de Enfoque", "Loop Retos", "Loop Calm"])

# --- Función 1: Asistente Inteligente ---
if menu == "Asistente Inteligente":
    st.header("💬 Asistente Inteligente")
    st.write("Hola, soy **Loopi**, tu acompañante digital. Cuéntame cómo te sientes hoy 💙")

    estado = st.selectbox("¿Cómo te sientes?", ["Feliz", "Tranquilo", "Cansado", "Molesto", "Triste"])
    
    respuestas = {
        "Feliz": "¡Qué alegría verte tan bien! 🌈 ¿Quieres compartir tu energía con un reto Loop?",
        "Tranquilo": "Me encanta verte en calma 🌿. Recuerda que cuidar tu mente es tan importante como respirar.",
        "Cansado": "Parece que necesitas una pausa 💤. ¿Qué tal si hacemos un breve ejercicio de respiración?",
        "Molesto": "A veces es normal sentirse así 😤. Vamos a relajarnos juntos un momento.",
        "Triste": "Estoy aquí contigo 💫. ¿Quieres que te recomiende algo para sentirte mejor?"
    }

    st.image(emociones.get(estado.lower(), emociones["feliz"]), width=250)
    st.info(respuestas[estado])

# --- Función 2: Monitor de Enfoque ---
elif menu == "Monitor de Enfoque":
    st.header("🎯 Monitor de Enfoque")
    st.write("Mide tu nivel de concentración y descubre si necesitas una pausa.")
    
    focus = st.slider("Del 1 al 10, ¿qué tan enfocada te sientes?", 1, 10, 5)
    
    if focus <= 4:
        st.warning("Parece que tu enfoque está bajo 😴. ¡Es momento de un descanso con Loop Calm!")
    elif 5 <= focus <= 7:
        st.info("Estás en un buen punto 👌. Una pequeña pausa te ayudará a mantener la energía.")
    else:
        st.success("¡Excelente concentración! 🚀 Sigue así, pero recuerda tomar pausas cada cierto tiempo.")

# --- Función 3: Loop Retos ---
elif menu == "Loop Retos":
    st.header("🌟 Loop Retos")
    retos = [
        "Desconéctate de tu celular por 15 minutos y sal a respirar aire fresco 🍃",
        "Envía un mensaje positivo a alguien que quieras 💌",
        "Haz una pausa y estira tus brazos y cuello 🧘",
        "Escribe 3 cosas por las que te sientas agradecida hoy 🌞"
    ]
    st.success(f"Tu reto de hoy es: **{random.choice(retos)}**")

# --- Función 4: Loop Calm ---
elif menu == "Loop Calm":
    st.header("🌊 Loop Calm")
    st.write("Tómate un momento para respirar y recargar energía 💙")
    st.audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_639f285b8f.mp3?filename=relaxing-nature.mp3")
    st.image(emociones["calmado"], width=250)
    st.markdown("**Inhala 4s — Mantén 4s — Exhala 4s — Pausa 4s** 🕊️")

# --- Footer ---
st.markdown("---")
st.caption("Desarrollado por Equipo Hive · 28h UPC · 2025 💫")

