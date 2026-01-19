import { m } from 'framer-motion'

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 backdrop-blur-sm">
        {[0, 1, 2].map((i) => (
          <m.span
            key={i}
            className="h-2 w-2 rounded-full bg-cyan-400"
            animate={{
              y: [0, -6, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
