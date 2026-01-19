import { motion } from 'framer-motion'
import { useState, useEffect, useId } from 'react'

interface AvatarAIProps {
  size?: 'sm' | 'md' | 'lg'
  isThinking?: boolean
  className?: string
}

export function AvatarAI({ size = 'md', isThinking = false, className = '' }: AvatarAIProps) {
  const [isBlinking, setIsBlinking] = useState(false)
  const uniqueId = useId().replace(/:/g, '') // IDs únicos para gradients

  // Respeitar prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Random blinking (só se não preferir reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) return

    const blink = () => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.7) blink()
    }, 2000)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }

  // IDs únicos para evitar colisão
  const oceanGradId = `ocean-${uniqueId}`
  const skinGradId = `skin-${uniqueId}`
  const hairGradId = `hair-${uniqueId}`

  return (
    <motion.div
      className={`relative flex-shrink-0 ${sizes[size]} ${className}`}
      animate={isThinking && !prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 1.5, repeat: isThinking ? Infinity : 0 }}
      role="img"
      aria-label={isThinking ? 'Assistente pensando...' : 'Assistente Click Náutico'}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full drop-shadow-lg"
        aria-hidden="true"
      >
        {/* Gradients com IDs únicos */}
        <defs>
          <linearGradient id={oceanGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id={skinGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fcd9b6" />
            <stop offset="100%" stopColor="#f5c99d" />
          </linearGradient>
          <linearGradient id={hairGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5c4033" />
            <stop offset="100%" stopColor="#3d2914" />
          </linearGradient>
        </defs>

        {/* Background */}
        <circle cx="50" cy="50" r="48" fill={`url(#${oceanGradId})`} />

        {/* Wave pattern - estático pra evitar bugs do Framer Motion com path d */}
        <path
          d="M10 65 Q25 62 40 65 T70 65 T100 65"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="3"
        />

        {/* Face */}
        <ellipse cx="50" cy="52" rx="28" ry="30" fill={`url(#${skinGradId})`} />

        {/* Hair */}
        <path
          d="M22 45 Q22 25 50 22 Q78 25 78 45 Q75 35 50 32 Q25 35 22 45"
          fill={`url(#${hairGradId})`}
        />
        {/* Messy beach hair strands */}
        <path d="M30 30 Q28 22 35 20" fill="none" stroke="#5c4033" strokeWidth="3" strokeLinecap="round" />
        <path d="M45 25 Q43 18 50 16" fill="none" stroke="#5c4033" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 26 Q62 19 68 22" fill="none" stroke="#5c4033" strokeWidth="3" strokeLinecap="round" />

        {/* Eyebrows */}
        <path d="M33 42 Q38 40 43 42" fill="none" stroke="#5c4033" strokeWidth="2" strokeLinecap="round" />
        <path d="M57 42 Q62 40 67 42" fill="none" stroke="#5c4033" strokeWidth="2" strokeLinecap="round" />

        {/* Eyes */}
        <g>
          {/* Left eye */}
          <ellipse cx="38" cy="50" rx="6" ry={isBlinking && !prefersReducedMotion ? 1 : 5} fill="white" />
          {prefersReducedMotion ? (
            <circle cx="38" cy="50" r={3} fill="#2d1810" />
          ) : (
            <motion.circle
              cx="38"
              cy="50"
              r={isBlinking ? 0 : 3}
              fill="#2d1810"
              animate={isThinking ? { cx: [38, 40, 36, 38] } : {}}
              transition={{ duration: 2, repeat: isThinking ? Infinity : 0 }}
            />
          )}
          <circle cx="36" cy="48" r="1" fill="white" opacity={isBlinking && !prefersReducedMotion ? 0 : 1} />

          {/* Right eye */}
          <ellipse cx="62" cy="50" rx="6" ry={isBlinking && !prefersReducedMotion ? 1 : 5} fill="white" />
          {prefersReducedMotion ? (
            <circle cx="62" cy="50" r={3} fill="#2d1810" />
          ) : (
            <motion.circle
              cx="62"
              cy="50"
              r={isBlinking ? 0 : 3}
              fill="#2d1810"
              animate={isThinking ? { cx: [62, 64, 60, 62] } : {}}
              transition={{ duration: 2, repeat: isThinking ? Infinity : 0 }}
            />
          )}
          <circle cx="60" cy="48" r="1" fill="white" opacity={isBlinking && !prefersReducedMotion ? 0 : 1} />
        </g>

        {/* Nose */}
        <path d="M50 54 L48 60 L52 60" fill="none" stroke="#e0a882" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Smile */}
        <path d="M40 67 Q50 75 60 67" fill="none" stroke="#c47c5a" strokeWidth="2.5" strokeLinecap="round" />

        {/* Teeth showing in smile */}
        <path d="M43 68 Q50 72 57 68" fill="white" opacity="0.9" />

        {/* Blush */}
        <circle cx="30" cy="58" r="5" fill="#ffb4a2" opacity="0.4" />
        <circle cx="70" cy="58" r="5" fill="#ffb4a2" opacity="0.4" />

        {/* Sunglasses on head */}
        <path d="M25 32 L75 32" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <rect x="22" y="28" width="18" height="10" rx="3" fill="#1a1a1a" opacity="0.8" />
        <rect x="60" y="28" width="18" height="10" rx="3" fill="#1a1a1a" opacity="0.8" />
      </svg>

      {/* Online indicator - respeita reduced motion */}
      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-cyan-900 bg-green-400">
        {!prefersReducedMotion && (
          <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75" />
        )}
      </span>
    </motion.div>
  )
}
