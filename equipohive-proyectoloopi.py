import streamlit as st
from PIL import Image

# ----------------- CONFIGURACIÓN BÁSICA -----------------
st.set_page_config(
    page_title="Loopi - Coach digital empático",
    page_icon="💫",
    layout="wide"
)

# ----------------- ESTILOS (CSS) -----------------
st.markdown("""
<style>
    .stApp {
        background: radial-gradient(circle at top, #f3e9ff 0, #f6f9ff 35%, #ffffff 80%);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .hero {
        text-align: center;
        padding: 4rem 1rem 3rem;
    }
    .loopi-avatar {
        width: 140px;
        height: 140px;
        border-radius: 999px;
        background: radial-gradient(circle at top, #7C5CFF, #2DC6FF);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        box-shadow: 0 18px 45px rgba(80,112,255,0.25);
    }
    .hero-title {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 0.25rem;
        background: linear-gradient(90deg,#2DC6FF,#7C5CFF);
        -webkit-background-clip: text;
        color: transparent;
    }
    .hero-subtitle {
        font-size: 1.1rem;
        color: #6a6f82;
        margin-bottom: 0.75rem;
    }
    .hero-text {
        max-width: 560px;
        margin: 0 auto;
        color: #7b8195;
        font-size: 0.96rem;
    }
    /* Botón flotante de chat */
    .floating-chat-button {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg,#2DC6FF,#7C5CFF);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 25px rgba(80,112,255,0.35);
        cursor: pointer;
        z-index: 9999;
    }
    .floating-chat-button span {
        font-size: 26px;
        color: white;
    }
</style>
""", unsafe_allow_html=True)

# ----------------- HERO / PANTALLA DE INICIO -----------------
# Cambia el nombre del archivo por tu imagen real
loopi_img = Image.open("2 muy feliz amigable.png")

st.markdown('<div class="hero">', unsafe_allow_html=True)

st.markdown('<div class="loopi-avatar">', unsafe_allow_html=True)
st.image(loopi_img, width=110)
st.markdown('</div>', unsafe_allow_html=True)

st.markdown('<div class="hero-title">Hola, soy Loopi 👋</div>', unsafe_allow_html=True)
st.markdown('<div class="hero-subtitle">Tu coach digital empático</div>', unsafe_allow_html=True)

st.markdown(
    '<p class="hero-text">'
    'No soy un bloqueador más. Soy tu compañero inteligente que te ayuda a mantener el enfoque, '
    'mejorar tus hábitos digitales y encontrar el equilibrio perfecto entre productividad y bienestar.'
    '</p>',
    unsafe_allow_html=True
)

st.markdown('</div>', unsafe_allow_html=True)

st.markdown("")

# ----------------- SECCIÓN DE CHAT -----------------
st.markdown("## 💬 Chatea con Loopi")

if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant",
         "content": "Hola, soy Loopi 😊 ¿En qué te ayudo hoy?"}
    ]

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])

user_msg = st.chat_input("Escribe aquí para hablar con Loopi...")

if user_msg:
    # mensaje del usuario
    st.session_state.messages.append({"role": "user", "content": user_msg})

    # respuesta MUY simple por ahora (luego la hacemos más inteligente)
    text = user_msg.lower()
    if any(pal in text for pal in ["estres", "estresada", "estresado", "ansiosa", "ansioso", "agobiada", "agobiado"]):
        reply = ("Entiendo que te sientes cargada 💜. "
                 "Probemos algo rápido: inhala 4 segundos, mantén 4, exhala 4 y descansa 4. "
                 "¿Quieres que te recomiende un mini reto para cuidarte ahora?")
    else:
        reply = ("Gracias por contarme eso 💫. Estoy aquí para acompañarte mientras cuidas tu mundo digital. "
                 "Pronto podré personalizar aún más mis respuestas para ti.")

    st.session_state.messages.append({"role": "assistant", "content": reply})
    st.rerun()

# ----------------- BOTÓN FLOTANTE QUE SIGUE EL SCROLL -----------------
st.markdown("""
<div class="floating-chat-button"
     onclick="window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});">
  <span>💬</span>
</div>
""", unsafe_allow_html=True)
