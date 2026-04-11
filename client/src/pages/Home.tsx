import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Instagram, Shield, Music, Twitter } from "lucide-react";
import { useEffect, type ReactNode } from "react";

/**
 * Welington R. - Link na Bio Pessoal
 * Design: Elegância Escura com animações impactantes
 * Efeitos: Partículas flutuantes, glow pulsante, texto revelado por máscara,
 *          cards deslizando com blur, ring de perfil animado
 */

interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: ReactNode;
  gradient: string;
  hoverGlow: string;
}

const LINKS: LinkItem[] = [
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/wel.priv_?igsh=MWhyMjBsaWo4azhkYg==",
    icon: <Instagram className="h-5 w-5" />,
    gradient: "from-[#E1306C] via-[#F77737] to-[#FCAF45]",
    hoverGlow: "rgba(225, 48, 108, 0.35)",
  },
  {
    id: "privacy",
    label: "Privacy",
    url: "https://privacy.com.br/@Wellribeiro",
    icon: <Shield className="h-5 w-5" />,
    gradient: "from-[#FF6B35] to-[#FF8C5A]",
    hoverGlow: "rgba(255, 107, 53, 0.35)",
  },
  {
    id: "tiktok",
    label: "TikTok",
    url: "https://www.tiktok.com/@wel_ribeiro.gym?_r=1&_t=ZS-95RRaizm2qa",
    icon: <Music className="h-5 w-5" />,
    gradient: "from-[#00f2ea] to-[#ff0050]",
    hoverGlow: "rgba(0, 242, 234, 0.35)",
  },
  {
    id: "x",
    label: "X",
    url: "https://x.com/wellprivado?s=21",
    icon: <Twitter className="h-5 w-5" />,
    gradient: "from-[#1DA1F2] to-[#0d8ecf]",
    hoverGlow: "rgba(29, 161, 242, 0.35)",
  },
];

/* ── Floating Particles ── */
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#FF6B35]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -60, -120],
            x: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated Counter (for footer) ── */
function AnimatedCount({ target }: { target: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, delay: 1.5 });
    return controls.stop;
  }, [count, target]);

  return <motion.span>{rounded}</motion.span>;
}

/* ── Variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const profileVariants = {
  hidden: { opacity: 0, scale: 0.5, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const nameVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#FF6B35]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.06, 0.04], scale: [0.5, 1.1, 1] }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          style={{ filter: "blur(120px)" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#FF6B35]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 3, delay: 0.5 }}
          style={{ filter: "blur(100px)" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 h-[300px] w-[300px] translate-x-1/2 rounded-full bg-[#FF8C5A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.025 }}
          transition={{ duration: 3, delay: 1 }}
          style={{ filter: "blur(80px)" }}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Conteúdo principal */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center px-6 py-12 sm:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Foto de perfil com ring animado */}
        <motion.div variants={profileVariants} className="mb-7">
          <div className="relative">
            {/* Glow pulsante atrás da foto */}
            <motion.div
              className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#FF6B35] via-[#FF8C5A] to-[#FF6B35]"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ filter: "blur(16px)" }}
            />
            {/* Ring gradiente */}
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FF6B35] via-[#FF8C5A] to-[#FCAF45]"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {/* Foto */}
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-[#0a0a0a] sm:h-32 sm:w-32">
              <img
                src="/profile.jpeg"
                alt="Welington R."
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Nome com reveal */}
        <motion.h1
          variants={nameVariants}
          className="mb-2 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Welington R.
        </motion.h1>

        {/* Bio */}
        <motion.p
          variants={nameVariants}
          className="mb-8 text-center text-sm text-white/45"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Fitness &bull; Lifestyle &bull; Conteúdo
        </motion.p>

        {/* Linha decorativa animada */}
        <motion.div
          variants={lineVariants}
          className="mb-10 h-[1px] w-20 origin-center bg-gradient-to-r from-transparent via-[#FF6B35]/70 to-transparent"
        />

        {/* Links */}
        <div className="flex w-full flex-col gap-4">
          {LINKS.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              custom={index}
              whileHover={{
                scale: 1.04,
                boxShadow: `0 0 40px ${link.hoverGlow}`,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
            >
              {/* Shimmer effect no hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Gradiente de fundo no hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.07]`}
              />

              {/* Ícone com pulse no hover */}
              <motion.div
                className={`relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${link.gradient} text-white shadow-lg`}
                whileHover={{
                  rotate: [0, -8, 8, 0],
                  transition: { duration: 0.5 },
                }}
              >
                {link.icon}
              </motion.div>

              {/* Nome da rede social */}
              <div className="relative flex-1">
                <h3
                  className="text-[15px] font-semibold text-white/90 transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {link.label}
                </h3>
              </div>

              {/* Seta animada */}
              <motion.div
                className="relative flex-shrink-0"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                <svg
                  className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          variants={footerVariants}
          className="mt-auto pt-14 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/10" />
            <p
              className="text-[11px] tracking-[0.25em] text-white/20 uppercase"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Well Privacy
            </p>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/10" />
          </div>
          <p
            className="text-[10px] text-white/10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <AnimatedCount target={LINKS.length} /> links disponíveis
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
