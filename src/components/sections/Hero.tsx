import { motion } from 'framer-motion'
import { STATS, INSTAGRAM_LINK, WHATSAPP_LINK } from '@/constants'
import { useI18n } from '@/lib/i18n'

export function Hero() {
  const { t } = useI18n()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sand-950"
    >
      {/* Background Video/Image */}
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="relative w-full h-full"
        >
          <img
            src={`${import.meta.env.BASE_URL}hero-vila-gale.webp`}
            alt={t.hero.imageAlt}
            className="w-full h-full object-cover object-center brightness-110 contrast-110 saturate-[1.1]"
          />
        </motion.div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand-900/80 via-sand-900/20 to-sand-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/40 via-transparent to-ocean-900/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30 opacity-60" />
      </div>

      {/* Animated particles/waves effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-ocean-500/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge - Clean Tech Look */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-black/40 border border-white/10 rounded-full px-5 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-ocean-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
            {t.hero.since}
          </span>
        </motion.div>

        {/* Main Title - Epic Scale */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-white tracking-tighter mb-6 leading-[0.9]"
        >
          CLICK{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-300 to-cyan-300 drop-shadow-2xl">
            NÁUTICO
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.subtitle}
          <br />
          <span className="text-ocean-300 font-medium">
            {t.hero.subtitleHighlight}
          </span>
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12"
        >
          {[
            { value: `${STATS.yearsExperience}+`, label: t.hero.experience },
            { value: STATS.studentsCount, label: t.hero.students },
            { value: STATS.instagramFollowers, label: t.hero.followers },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-1 group-hover:text-ocean-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons - Solid & Outline (No Glass) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ffffff' }}
            className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-3 bg-ocean-600 hover:bg-ocean-500 !text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(8,145,178,0.5)]"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            {t.hero.bookClass}
          </a>
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-3 border-2 border-white/20 hover:border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2" />
              <path strokeWidth="2" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2" strokeLinecap="round" />
            </svg>
            @clicknautico
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3 text-white/30 hover:text-white/80 transition-colors cursor-pointer">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">{t.hero.scroll}</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
