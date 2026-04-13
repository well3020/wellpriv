import { motion } from "framer-motion";
import { Star, Lock, Eye, Timer, Percent } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Welington R. - Link na Bio
 * Layout: 100dvh - tudo em uma tela
 * Foto grande, Privacy em destaque máximo, rodapé com direitos reservados
 */

/* ── Floating Particles ── */
function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#FF6B35]"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0], y: [0, -50, -100], x: [0, Math.random() * 20 - 10] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const profileVariants = {
  hidden: { opacity: 0, scale: 0.5, filter: "blur(20px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const privacyVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(14px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const promoVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const [visits, setVisits] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    // Incrementar visita ao carregar a página
    fetch("/api/visits/increment", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setVisits(data.count))
      .catch((err) => {
        console.error("Erro ao contabilizar visita:", err);
        setVisits(360);
      });

    // Timer de 24h
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#FF6B35]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.06, 0.04], scale: [0.5, 1.1, 1] }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ filter: "blur(120px)" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[300px] w-[300px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#FF8C5A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2.5, delay: 0.5 }}
          style={{ filter: "blur(90px)" }}
        />
      </div>

      <FloatingParticles />

      {/* Layout principal - 100dvh */}
      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-md flex-col items-center justify-between px-5 py-6 sm:py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── TOPO: Foto grande + Nome ── */}
        <div className="flex flex-col items-center">
          {/* Foto de perfil GRANDE */}
          <motion.div variants={profileVariants} className="mb-3">
            <div className="relative">
              <motion.div
                className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#FF6B35] via-[#FF8C5A] to-[#FF6B35]"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "blur(14px)" }}
              />
              <motion.div
                className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-[#FF6B35] via-[#FF8C5A] to-[#FCAF45]"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-[#0a0a0a] sm:h-32 sm:w-32">
                <img src="/profile.jpeg" alt="Welington R." className="h-full w-full object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Nome */}
          <motion.h1
            variants={textVariants}
            className="mb-0.5 text-center text-xl font-bold tracking-tight text-white sm:text-2xl"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Welington R.
          </motion.h1>

          {/* Bio */}
          <motion.p
            variants={textVariants}
            className="text-center text-xs text-white/40"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Fitness &bull; Lifestyle &bull; Conteúdo
          </motion.p>

          {/* Contador de Visitas - AGORA EM VERDE */}
          <motion.div
            variants={textVariants}
            className="mt-3 flex items-center gap-1.5 rounded-full bg-[#22c55e]/10 px-3 py-1 border border-[#22c55e]/20"
          >
            <Eye className="h-3 w-3 text-[#22c55e]" />
            <span className="text-[10px] font-bold text-[#22c55e]" style={{ fontFamily: "'Inter', sans-serif" }}>
              {visits !== null ? `${visits.toLocaleString()} visitas` : "Carregando..."}
            </span>
          </motion.div>
        </div>

        {/* ── MEIO: Privacy GRANDE + Promoção ── */}
        <div className="flex w-full flex-1 flex-col justify-center gap-4 py-3">

          {/* PRIVACY - Card GRANDE e chamativo */}
          <motion.a
            href="https://privacy.com.br/@Wellribeiro"
            target="_blank"
            rel="noopener noreferrer"
            variants={privacyVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 60px rgba(255, 107, 53, 0.45)",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[#FF6B35]/40 bg-gradient-to-br from-[#FF6B35]/[0.15] via-[#FF8C5A]/[0.08] to-[#FF6B35]/[0.03] px-6 py-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FF6B35]/60"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#FF6B35]/[0.1] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/[0.1] to-transparent"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Badge EXCLUSIVO - AGORA ESTÁTICO (sem pulsação) */}
            <div className="relative flex items-center gap-1.5 rounded-full bg-[#FF6B35]/25 px-3 py-1">
              <Star className="h-3.5 w-3.5 fill-[#FF6B35] text-[#FF6B35]" />
              <span className="text-[11px] font-bold tracking-wider text-[#FF6B35]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                CONTEÚDO EXCLUSIVO
              </span>
              <Star className="h-3.5 w-3.5 fill-[#FF6B35] text-[#FF6B35]" />
            </div>

            <div className="relative flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FF8C5A] text-white shadow-lg shadow-[#FF6B35]/30">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3
                  className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#FF6B35]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Acesse Agora
                </h3>
                <p className="text-[11px] text-white/45" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Conteúdos exclusivos no Privacy
                </p>
              </div>
            </div>

            {/* Botão CTA - PULSANDO */}
            <motion.div
              className="relative mt-2 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] px-10 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#FF6B35]/25"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 10px 15px -3px rgba(255, 107, 53, 0.25)",
                  "0 10px 25px -3px rgba(255, 107, 53, 0.5)",
                  "0 10px 15px -3px rgba(255, 107, 53, 0.25)"
                ]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Acessar Privacy
            </motion.div>
          </motion.a>

          {/* ── BANNER DE PROMOÇÃO ── */}
          <motion.div
            variants={promoVariants}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6B35]/20 text-[#FF6B35]">
                <Percent className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  PROMOÇÃO POR TEMPO LIMITADO!
                </h4>
                <p className="mt-0.5 text-[11px] leading-relaxed text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="font-bold text-[#FF6B35]">40% de desconto</span> na assinatura. Apenas para alguns assinantes, a promoção logo sairá do ar!
                </p>
              </div>
            </div>

            {/* Cronômetro */}
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
              <div className="flex items-center gap-2 text-[#FF6B35]">
                <Timer className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Expira em:
                </span>
              </div>
              <div className="flex gap-2">
                {[
                  { label: 'H', value: timeLeft.hours },
                  { label: 'M', value: timeLeft.minutes },
                  { label: 'S', value: timeLeft.seconds }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <span className="mt-1 text-[8px] text-white/30 font-bold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Barra de progresso fake */}
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A]"
                initial={{ width: "85%" }}
                animate={{ width: "15%" }}
                transition={{ duration: 86400, ease: "linear" }}
              />
            </div>
          </motion.div>

        </div>

        {/* ── RODAPÉ: Direitos Reservados ── */}
        <motion.p
          variants={textVariants}
          className="text-[9px] text-white/15 tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          &copy; 2025 Welington Ribeiro. Todos os direitos reservados.
        </motion.p>
      </motion.div>
    </div>
  );
}
