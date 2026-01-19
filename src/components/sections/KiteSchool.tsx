import { m } from 'framer-motion'
import { useBooking } from '../booking/BookingContext'
import {
  COURSE_STAGES,
  LESSON_PRICES,
  SPECIAL_ACTIVITIES,
  RENTAL_PRICES,
  ACCESSORIES_FEE
} from '@/constants'
import { formatPrice, cn, resolveTranslation } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function KiteSchool() {
  const { openBooking } = useBooking()
  const { t } = useI18n()

  const tr = (key: string) => resolveTranslation(t, key)

  return (
    <section id="kite" className="py-20 md:py-32 bg-sand-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-ocean-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-coral-500/5 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Epic Scale */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-ocean-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            <span className="text-white/90 text-sm font-bold tracking-wide uppercase">
              {t.kite.badge}
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white mb-8 tracking-tight leading-none">
            {t.kite.title.split(' ').slice(0, 2).join(' ')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-300 to-cyan-300">
              {t.kite.title.split(' ').slice(2).join(' ') || 'Kite'}
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed font-light max-w-2xl mx-auto">
            {t.kite.description}
          </p>
        </m.div>

        {/* Course Stages - Tech Cards */}
        <m.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {COURSE_STAGES.map((stage, index) => (
            <m.div
              key={stage.step}
              variants={item}
              className="relative group"
            >
              {/* Connector line - Tech Style */}
              {index < COURSE_STAGES.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-[2px] bg-white/10 z-0 group-hover:bg-ocean-500/50 transition-colors" />
              )}

              <div className="relative bg-white/5 backdrop-blur-sm rounded-[2rem] p-8 border border-white/10 hover:border-ocean-500/50 transition-all duration-300 h-full hover:bg-white/10 hover:-translate-y-2">
                {/* Step number - Floating Badge */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center mb-8 shadow-xl shadow-ocean-500/30 group-hover:from-ocean-400 group-hover:to-ocean-500 transition-colors">
                  <span className="text-3xl font-black text-white">
                    {stage.step}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-ocean-300 transition-colors">
                  {stage.titleKey ? tr(stage.titleKey) : stage.title}
                </h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {stage.descKey ? tr(stage.descKey) : stage.description}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Pricing Cards */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h3 className="text-3xl font-display font-bold text-white mb-2">
                {t.kite.investment}
              </h3>
              <p className="text-gray-400">
                {t.kite.investmentDesc}
              </p>
            </div>
            <div className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-medium text-coral-300 bg-coral-500/20 border border-coral-500/30 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-coral-400 animate-pulse shadow-[0_0_10px_rgba(251,113,133,0.5)]" />
              {t.kite.minHours}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LESSON_PRICES.map((lesson) => (
              <m.div
                key={lesson.id}
                whileHover={{ y: -8 }}
                className={cn(
                  "relative flex flex-col backdrop-blur-sm rounded-[2rem] p-8 border transition-all duration-300",
                  lesson.isPopular
                    ? 'bg-ocean-500/20 border-ocean-500/50 shadow-2xl shadow-ocean-500/20 scale-105 z-10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                )}
              >
                {lesson.isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg shadow-ocean-500/30 uppercase tracking-wide">
                    {t.kite.recommended}
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-2xl font-black text-white mb-1">
                    {lesson.nameKey ? tr(lesson.nameKey) : lesson.name}
                  </h4>
                  {(lesson.subtitleKey || lesson.subtitle) && (
                    <span className="text-sm font-semibold text-ocean-400 uppercase tracking-wider">
                      {lesson.subtitleKey ? tr(lesson.subtitleKey) : lesson.subtitle}
                    </span>
                  )}
                </div>

                <p className="text-gray-400 text-base mb-6 flex-grow leading-relaxed">
                  {lesson.descKey ? tr(lesson.descKey) : lesson.description}
                </p>

                {lesson.highlight && (
                  <div className="bg-green-500/20 border border-green-500/30 text-green-300 text-xs px-3 py-2 rounded-lg font-medium mb-4 flex items-start gap-2">
                    <svg
                      className="w-4 h-4 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {t.kite.includes}
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-gray-500 uppercase">
                      {t.kite.value}
                    </span>
                    <div className="text-3xl font-bold text-ocean-400">
                      {formatPrice(lesson.price)}
                    </div>
                  </div>
                  <button
                    onClick={() => openBooking('kite', lesson.nameKey ? tr(lesson.nameKey) : lesson.name)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                      lesson.isPopular
                        ? 'bg-gradient-to-r from-ocean-500 to-ocean-600 text-white hover:from-ocean-400 hover:to-ocean-500 shadow-lg shadow-ocean-500/30'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                    )}
                  >
                    {t.kite.reserve}
                  </button>
                </div>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* Special Activities */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden border border-white/10"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-ocean-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-coral-500/15 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white text-center mb-2">
              {t.kite.specialExperiences}
            </h3>
            <p className="text-sand-400 text-center mb-10">
              {t.kite.specialDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {SPECIAL_ACTIVITIES.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 hover:bg-white/10 hover:border-ocean-500/30 transition-all"
                >
                  <div className="text-center sm:text-left">
                    <h4 className="text-lg font-bold text-white">
                      {activity.nameKey ? tr(activity.nameKey) : activity.name}
                    </h4>
                    <p className="text-sm text-sand-300 mt-1">
                      {activity.subtitleKey ? tr(activity.subtitleKey) : activity.subtitle}
                    </p>
                  </div>
                  <div className="text-center sm:text-right">
                    <span className="text-xs text-sand-400">{t.kite.perPerson}</span>
                    <div className="text-2xl font-bold text-ocean-400">
                      {formatPrice(activity.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </m.div>

        {/* Rentals Table */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-white mb-6 pl-4 border-l-4 border-ocean-500">
            {t.kite.rentalTitle}
          </h3>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div
              className="overflow-x-auto"
              tabIndex={0}
              role="region"
              aria-label="Opções de pacotes"
            >
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">{t.kite.item}</th>
                    <th className="px-6 py-4 font-semibold text-center">
                      1 {t.kite.hour}
                    </th>
                    <th className="px-6 py-4 font-semibold text-center">
                      2 {t.kite.hours}
                    </th>
                    <th className="px-6 py-4 font-semibold text-center bg-ocean-500/20 text-ocean-300">
                      {t.kite.daily}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {RENTAL_PRICES.map((rental) => (
                    <tr key={rental.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">
                          {rental.itemKey ? tr(rental.itemKey) : rental.item}
                        </div>
                        {(rental.descKey || rental.description) && (
                          <div className="text-xs text-gray-500">
                            {rental.descKey ? tr(rental.descKey) : rental.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-300">
                        {formatPrice(rental.h1)}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-300">
                        {formatPrice(rental.h2)}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-ocean-400 bg-ocean-500/10">
                        {formatPrice(rental.daily)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-coral-500/10">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-coral-300">
                        {t.kite.accessories}
                      </div>
                      <div className="text-xs text-coral-400/70">
                        {t.kite.accessoriesList}
                      </div>
                    </td>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center font-bold text-coral-300"
                    >
                      {formatPrice(ACCESSORIES_FEE)}{' '}
                      <span className="text-xs font-normal opacity-70">
                        {t.kite.oneTimeFee}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500 text-right italic">
            {t.kite.note}
          </p>
        </m.div>

      </div>
    </section>
  )
}
