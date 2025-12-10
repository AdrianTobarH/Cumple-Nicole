// Nicole_Birthday_Page.jsx
// Usage: Drop this file into a React + Vite or Create-React-App project (src/components/NicoleBirthday.jsx)
// Requirements: TailwindCSS configured, Framer Motion installed, public/birthday.mp3 placed in public folder
// How to run: npm install framer-motion && start dev server. Replace public/birthday.mp3 with your music file.

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// CONFIG — change these to customize the page
const NICOLE_NAME = 'Nicole';
const BIRTHDAY_MESSAGE = `Nicole,
Hoy es un día especial porque el mundo celebra la vida de una persona increíble: tú.
Tu luz, tu forma de ser, la dulzura con la que miras las cosas y la fuerza con la que enfrentas cada día… todo eso te hace única.

Quiero que este nuevo año te encuentre rodeada de cariño, de sonrisas sinceras y de todo aquello que te hace feliz. Que cada sueño que guardas dentro empiece a tomar forma, que cada deseo encuentre su camino, y que la vida te sorprenda bonito, como tú mereces.

Gracias por ser tú: tan auténtica, tan sensible, tan tú.
Ojalá la alegría que das a los demás vuelva multiplicada a tu corazón. Que nunca te falte amor, paz, libros que te hagan sentir y momentos que te recuerden lo valiosa que eres.

Feliz cumpleaños, Nicole.
Que este 26 sea un capítulo lleno de magia.

Con mucho cariño,
Adrian Tobar Hanze`;
const WHATSAPP_MESSAGE = `¡Feliz cumpleaños, ${NICOLE_NAME}! 🎂 Te deseo un año lleno de éxitos, risas y momentos inolvidables. Te quiero mucho.`;

// "VibeVoice" TTS wrapper using Web Speech API (client-side). We call it VibeVoice for branding.
function useVibeVoice() {
  const synthRef = useRef(window.speechSynthesis);
  function availableVoices() {
    return synthRef.current ? synthRef.current.getVoices() : [];
  }
  function speak(text, opts = {}) {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    const voices = availableVoices();
    const chosen = voices.find(
      v => (/es-419|es-mx|es-us|latin|latino/i.test(v.lang) && /male|hombre|masculino/i.test(v.name))
    ) || voices.find(v => /es-/i.test(v.lang)) || voices[0];
    if (chosen) utter.voice = chosen;
    utter.rate = opts.rate ?? 1;
    utter.pitch = opts.pitch ?? 1;
    utter.volume = opts.volume ?? 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
  return { speak, availableVoices };
} synthRef.current ? synthRef.current.getVoices() : [];
  }

  function speak(text, opts = {}) {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    const voices = availableVoices();
    // pick a voice that sounds friendly; fallback to first voice
    const chosen = voices.find(v => /female|female|alloy|zira|aria/i.test(v.name)) || voices[0];
    if (chosen) utter.voice = chosen;
    utter.rate = opts.rate ?? 1;
    utter.pitch = opts.pitch ?? 1;
    utter.volume = opts.volume ?? 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  return { speak, availableVoices };
}

export default function NicoleBirthdayPage() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const { speak } = useVibeVoice();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // preload audio
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
  }, []);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }

  function readMessage() {
    // VibeVoice reads personalized message
    speak(BIRTHDAY_MESSAGE, { rate: 1, pitch: 1 });
    // small confetti vibe
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  }

  // Simple decorative confetti using CSS + Framer Motion
  const confettiPieces = Array.from({ length: 12 }).map((_, i) => (
    <motion.div
      key={i}
      initial={{ y: -200, rotate: 0, opacity: 0 }}
      animate={{ y: 400 + Math.random() * 200, rotate: Math.random() * 360, opacity: 1 }}
      transition={{ duration: 1.6 + Math.random(), ease: 'easeOut' }}
      className={`w-3 h-5 rounded-sm absolute top-0 left-${(i % 4) * 6} bg-gradient-to-br from-pink-400 to-yellow-300`}
      style={{ left: `${5 + i * 7}%`, background: `linear-gradient(45deg, rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1), rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1))` }}
    />
  ));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-pink-500 to-rose-600 p-6">
      <audio ref={audioRef} loop>
        {/* Place a birthday.mp3 in your public/ folder or replace the src with a hosted file URL */}
        <source src="/birthday.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8"
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">Happy Birthday, {NICOLE_NAME}!</h1>
            <p className="mt-2 text-white/80">A special page made just for you. Press Play to start the party 🎉</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={toggleMusic}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white backdrop-blur hover:scale-105 transition-transform"
            >
              {playing ? 'Pause Music' : 'Play Music'}
            </button>

            <button
              onClick={readMessage}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-semibold hover:brightness-110 transition"
            >
              VibeVoice — Read Message
            </button>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl bg-white/6 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Your Birthday Message</h2>
            <p className="text-white/90 whitespace-pre-line">{BIRTHDAY_MESSAGE}</p>

            <div className="mt-4 text-sm text-white/70">Tip: Click <span className="font-semibold">VibeVoice — Read Message</span> to have the message read aloud.</div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/3 border border-white/8 flex flex-col items-center justify-center"
          >
            <div className="w-40 h-40 rounded-full bg-white/10 flex items-center justify-center text-6xl font-bold text-white">🎈</div>
            <p className="mt-4 text-white/90">Press Play, then press VibeVoice — Read Message. Customize the message in the component constants.</p>
          </motion.div>
        </div>

        <div className="mt-6 flex gap-3 items-center">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:brightness-110"
          >
            Send WhatsApp Wish
          </a>

          <button
            onClick={() => { navigator.clipboard?.writeText(WHATSAPP_MESSAGE); alert('WhatsApp message copied to clipboard!'); }}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          >
            Copy WhatsApp Text
          </button>
        </div>

        {/* Confetti overlay */}
        {showConfetti && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {confettiPieces}
          </div>
        )}

        <div className="mt-10">
          {/* PHOTO CAROUSEL */}
          <h2 className="text-2xl font-bold text-white mb-4">Unas fotos especiales</h2>
          <div className="relative w-full overflow-hidden rounded-xl border border-white/10">
            <motion.div
              className="flex"
              animate={{ x: ['0%', '-100%', '-200%', '0%'] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src="/Photo1.jpg" className="w-full object-cover" />
              <img src="/Photo2.jpg" className="w-full object-cover" />
              <img src="/Photo3.jpg" className="w-full object-cover" />
            </motion.div>
          </div>
        </div>

        <footer className="mt-8 text-xs text-white/60">Made with love — customize the message and drop your birthday.mp3 into public/birthday.mp3</footer>
      </motion.div>
    </div>
  );
}

/*
README (short)

Files generated:
- src/components/NicoleBirthday.jsx  (this component)
- public/birthday.mp3  (place your music file here)

How to deploy to GitHub Pages (quick):
1. Create a new GitHub repo, push your React app.
2. Install dependencies and ensure build works: npm run build
3. Use gh-pages package or Vercel/Netlify for one-click deploy.

Notes:
- "VibeVoice" is implemented using the browser's Web Speech API (no external TTS key needed). If you want a premium TTS voice (e.g., from a cloud provider), I can add API integration.
- Replace NICOLE_NAME and BIRTHDAY_MESSAGE constants to personalize.
*/
