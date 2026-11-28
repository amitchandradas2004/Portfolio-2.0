import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { Compass, Home } from "lucide-react";
import Link from "next/link";
import { FaNodeJs, FaReact } from "react-icons/fa6";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] pt-28 pb-20 transition-colors duration-300">
      {/* BACKGROUND LIQUID LIGHT SOURCES (Matches Portfolio Palette) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden -z-10"
      >
        <div className="absolute top-10 left-1/4 w-87.5 sm:w-125 h-87.5 sm:h-125 bg-sky-400/35 dark:bg-cyan-500/30 blur-[90px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-100 sm:w-137.5 h-100 sm:h-137.5 bg-purple-500/30 dark:bg-indigo-600/30 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Main Liquid Glass Container Card */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 w-full my-auto">
        <LiquidGlassCard
          borderRadius="16px"
          blurIntensity="xl"
          glowIntensity="lg"
          shadowIntensity="lg"
          className="w-full relative overflow-hidden bg-white/40! dark:bg-slate-900/40! border-white/60! dark:border-white/10!"
        >
          {/* Specular Liquid Light Reflection */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -left-32 w-64 h-64 bg-linear-to-br from-white/40 dark:from-sky-400/20 to-transparent rounded-full blur-2xl pointer-events-none"
          />

          <div className="p-6 sm:p-10 md:p-14 relative z-10">
            {/* TWO COLUMN COMPOSITION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT CONTENT COLUMN */}
              <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                {/* Status Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-slate-900/50 border border-white/60 dark:border-white/10 backdrop-blur-xl text-sky-600 dark:text-[#38BDF8] text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-sky-500 dark:text-[#38BDF8] shrink-0" />
                  <span>Lost in Digital Space</span>
                </div>

                {/* Huge 404 Typography */}
                <div className="relative mb-2 select-none">
                  <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none bg-linear-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
                    404
                  </h1>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-r from-sky-500/20 via-blue-500/20 to-purple-500/20 blur-2xl rounded-full -z-10 opacity-80 pointer-events-none"
                  />
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                  Oops! This page went missing.
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6 max-w-md">
                  The page you are looking for does not exist or has been moved.
                  Let&apos;s get you back to the main journey.
                </p>

                {/* Technology Glass Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/40 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 backdrop-blur-md flex items-center gap-1.5 shadow-xs">
                    <SiNextdotjs className="w-3.5 h-3.5 text-slate-900 dark:text-white shrink-0" />
                    <span>Next.js</span>
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/40 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 backdrop-blur-md flex items-center gap-1.5 shadow-xs">
                    <FaReact className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span>React</span>
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/40 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 backdrop-blur-md flex items-center gap-1.5 shadow-xs">
                    <SiTypescript className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>TypeScript</span>
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/40 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 backdrop-blur-md flex items-center gap-1.5 shadow-xs">
                    <FaNodeJs className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Node.js</span>
                  </span>
                </div>

                {/* Back To Home Button */}
                <Link
                  href="/"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-white bg-linear-to-r from-sky-500 via-sky-400 to-sky-600 hover:from-sky-400 hover:to-sky-500 scale-100 hover:scale-[1.03] active:scale-[0.94] shadow-lg shadow-sky-500/25 border border-sky-300/30 backdrop-blur-xl will-change-transform transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] touch-manipulation cursor-pointer overflow-hidden"
                >
                  <span className="pointer-events-none absolute inset-x-4 top-0 h-[1.5px] bg-linear-to-r from-transparent via-white/80 to-transparent" />
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5 shrink-0" />
                  <span>Back To Home</span>
                </Link>
              </div>

              {/* RIGHT ILLUSTRATION COLUMN */}
              <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
                <div className="relative w-full max-w-md aspect-4/3 sm:aspect-16/11 flex items-center justify-center p-2">
                  <svg
                    role="img"
                    aria-label="Developer walking toward a 404 error sign in digital space"
                    viewBox="0 0 500 380"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-xl"
                  >
                    <defs>
                      <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
                        <stop
                          offset="0%"
                          stopColor="#38BDF8"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="60%"
                          stopColor="#818CF8"
                          stopOpacity="0.15"
                        />
                        <stop
                          offset="100%"
                          stopColor="#020617"
                          stopOpacity="0"
                        />
                      </radialGradient>

                      <linearGradient
                        id="pathGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#0EA5E9"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="65%"
                          stopColor="#6366F1"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="100%"
                          stopColor="#EC4899"
                          stopOpacity="0.2"
                        />
                      </linearGradient>

                      <linearGradient
                        id="hoodieGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#0284C7" />
                        <stop offset="100%" stopColor="#4F46E5" />
                      </linearGradient>

                      <linearGradient
                        id="screenGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#C084FC" />
                      </linearGradient>
                    </defs>

                    <circle cx="250" cy="190" r="160" fill="url(#portalGlow)" />

                    <g
                      opacity="0.3"
                      stroke="currentColor"
                      className="text-slate-400 dark:text-slate-600"
                      strokeWidth="1"
                    >
                      <line x1="50" y1="310" x2="450" y2="310" />
                      <line x1="90" y1="270" x2="410" y2="270" opacity="0.7" />
                      <line x1="140" y1="230" x2="360" y2="230" opacity="0.4" />
                      <line x1="50" y1="310" x2="180" y2="200" />
                      <line x1="180" y1="310" x2="220" y2="200" />
                      <line x1="320" y1="310" x2="280" y2="200" />
                      <line x1="450" y1="310" x2="320" y2="200" />
                    </g>

                    <g>
                      <path
                        d="M 50 300 L 220 230 L 210 230 L 30 300 Z"
                        fill="url(#pathGradient)"
                      />
                      <circle cx="220" cy="230" r="3" fill="#38BDF8" />

                      <g transform="translate(230, 170)">
                        <line
                          x1="15"
                          y1="60"
                          x2="15"
                          y2="10"
                          stroke="#64748B"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <rect
                          x="-15"
                          y="-15"
                          width="60"
                          height="28"
                          rx="6"
                          fill="#0F172A"
                          stroke="#38BDF8"
                          strokeWidth="1.5"
                        />
                        <text
                          x="15"
                          y="3"
                          textAnchor="middle"
                          fill="#38BDF8"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          ERR 404
                        </text>
                        <circle cx="35" cy="-15" r="3" fill="#EF4444" />
                      </g>
                    </g>

                    <g>
                      <ellipse
                        cx="140"
                        cy="290"
                        rx="35"
                        ry="7"
                        fill="#000000"
                        opacity="0.25"
                      />

                      <g transform="rotate(-12 135 240)">
                        <path
                          d="M 135 240 L 125 285 L 115 285"
                          stroke="#1E293B"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 115 285 L 105 285"
                          stroke="#0EA5E9"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                      </g>

                      <g transform="rotate(12 145 240)">
                        <path
                          d="M 145 240 L 155 285 L 165 285"
                          stroke="#334155"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 165 285 L 175 285"
                          stroke="#38BDF8"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                      </g>

                      <path
                        d="M 125 185 Q 140 180 155 185 L 155 240 Q 140 245 125 240 Z"
                        fill="url(#hoodieGrad)"
                      />

                      <rect
                        x="110"
                        y="190"
                        width="18"
                        height="38"
                        rx="6"
                        fill="#475569"
                        stroke="#1E293B"
                        strokeWidth="2"
                      />
                      <line
                        x1="125"
                        y1="195"
                        x2="128"
                        y2="230"
                        stroke="#94A3B8"
                        strokeWidth="3"
                      />

                      <circle cx="140" cy="160" r="16" fill="#FDBA74" />
                      <path
                        d="M 124 158 Q 140 140 156 158 Q 156 148 140 144 Q 124 148 124 158 Z"
                        fill="#0F172A"
                      />
                      <path
                        d="M 123 158 Q 140 138 157 158"
                        stroke="#38BDF8"
                        strokeWidth="3"
                        fill="none"
                      />
                      <circle cx="123" cy="160" r="4" fill="#38BDF8" />
                      <circle cx="157" cy="160" r="4" fill="#38BDF8" />

                      <path
                        d="M 132 195 L 148 215 L 165 210"
                        stroke="#0284C7"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polygon
                        points="160,205 182,205 178,218 156,218"
                        fill="#64748B"
                      />
                      <polygon
                        points="162,188 184,188 182,205 160,205"
                        fill="url(#screenGrad)"
                      />
                      <line
                        x1="165"
                        y1="192"
                        x2="178"
                        y2="192"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="165"
                        y1="196"
                        x2="174"
                        y2="196"
                        stroke="#38BDF8"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="165"
                        y1="200"
                        x2="180"
                        y2="200"
                        stroke="#F43F5E"
                        strokeWidth="1.5"
                      />
                    </g>

                    <g opacity="0.85">
                      <rect
                        x="270"
                        y="110"
                        width="65"
                        height="24"
                        rx="8"
                        fill="#0F172A"
                        stroke="#38BDF8"
                        strokeWidth="1"
                      />
                      <text
                        x="302"
                        y="125"
                        textAnchor="middle"
                        fill="#38BDF8"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        GET 404
                      </text>

                      <rect
                        x="70"
                        y="100"
                        width="75"
                        height="24"
                        rx="8"
                        fill="#0F172A"
                        stroke="#A855F7"
                        strokeWidth="1"
                      />
                      <text
                        x="107"
                        y="115"
                        textAnchor="middle"
                        fill="#C084FC"
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        null_pointer
                      </text>
                    </g>

                    <circle cx="210" cy="90" r="3" fill="#38BDF8" />
                    <circle cx="340" cy="180" r="2.5" fill="#A855F7" />
                    <circle cx="90" cy="220" r="4" fill="#34D399" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </LiquidGlassCard>
      </div>
    </main>
  );
}