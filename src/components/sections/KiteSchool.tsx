import { motion } from 'framer-motion'
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
    <section id="kite" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-ocean-600 font-semibold text-sm uppercase tracking-wider mb-4">
            {t.kite.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-sand-900 mb-6">
            {t.kite.title}
          </h2>
          <p className="text-lg text-sand-600 leading-relaxed">
            {t.kite.description}
          </p>
        </motion.div>

        {/* Course Stages */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {COURSE_STAGES.map((stage, index) => (
            <motion.div
              key={stage.step}
              variants={item}
              className="relative group"
            >
              {/* Connector line */}
              {index < COURSE_STAGES.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-ocean-200 to-transparent z-0" />
              )}

              <div className="relative bg-sand-50 rounded-2xl p-8 border border-sand-100 hover:border-ocean-200 transition-colors h-full">
                {/* Step number */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center mb-6 shadow-lg shadow-ocean-500/20 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">
                    {stage.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-sand-900 mb-3">
                  {stage.titleKey ? tr(stage.titleKey) : stage.title}
                </h3>
                <p className="text-sand-600 leading-relaxed">
                  {stage.descKey ? tr(stage.descKey) : stage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h3 className="text-3xl font-display font-bold text-sand-900 mb-2">
                {t.kite.investment}
              </h3>
              <p className="text-sand-600">
                {t.kite.investmentDesc}
              </p>
            </div>
            <div className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-medium text-coral-600 bg-coral-50 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse" />
              {t.kite.minHours}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LESSON_PRICES.map((lesson) => (
              <motion.div
                key={lesson.id}
                whileHover={{ y: -5 }}
                className={cn(
                  "relative flex flex-col bg-white rounded-2xl p-6 border-2 transition-all",
                  lesson.isPopular
                    ? 'border-ocean-500 shadow-xl shadow-ocean-500/10'
                    : 'border-sand-100 hover:border-sand-200'
                )}
              >
                {lesson.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ocean-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    {t.kite.recommended}
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="text-lg font-bold text-sand-900">
                    {lesson.nameKey ? tr(lesson.nameKey) : lesson.name}
                  </h4>
                  {(lesson.subtitleKey || lesson.subtitle) && (
                    <span className="text-sm text-sand-500">
                      {lesson.subtitleKey ? tr(lesson.subtitleKey) : lesson.subtitle}
                    </span>
                  )}
                </div>

                <p className="text-sand-600 text-sm mb-4 flex-grow">
                  {lesson.descKey ? tr(lesson.descKey) : lesson.description}
                </p>

                {lesson.highlight && (
                  <div className="bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg font-medium mb-4 flex items-start gap-2">
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

                <div className="pt-4 border-t border-sand-100 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-sand-500 uppercase">
                      {t.kite.value}
                    </span>
                    <div className="text-3xl font-bold text-ocean-600">
                      {formatPrice(lesson.price)}
                    </div>
                  </div>
                  <button
                    onClick={() => openBooking('kite', lesson.nameKey ? tr(lesson.nameKey) : lesson.name)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                      lesson.isPopular
                        ? 'bg-ocean-500 text-white hover:bg-ocean-600'
                        : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                    )}
                  >
                    {t.kite.reserve}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-sand-900 to-sand-800 rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-ocean-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-coral-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

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
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 hover:bg-white/15 transition-colors"
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
        </motion.div>

        {/* Rentals Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-sand-900 mb-6 pl-4 border-l-4 border-sand-900">
            {t.kite.rentalTitle}
          </h3>

          <div className="bg-white rounded-2xl shadow-sm border border-sand-100 overflow-hidden">
            <div
              className="overflow-x-auto"
              tabIndex={0}
              role="region"
              aria-label="Opções de pacotes"
            >
              <table className="w-full text-left">
                <thead className="bg-sand-50 text-sand-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">{t.kite.item}</th>
                    <th className="px-6 py-4 font-semibold text-center">
                      1 {t.kite.hour}
                    </th>
                    <th className="px-6 py-4 font-semibold text-center">
                      2 {t.kite.hours}
                    </th>
                    <th className="px-6 py-4 font-semibold text-center bg-ocean-50 text-ocean-700">
                      {t.kite.daily}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100">
                  {RENTAL_PRICES.map((rental) => (
                    <tr key={rental.id} className="hover:bg-sand-50/50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-sand-900">
                          {rental.itemKey ? tr(rental.itemKey) : rental.item}
                        </div>
                        {(rental.descKey || rental.description) && (
                          <div className="text-xs text-sand-500">
                            {rental.descKey ? tr(rental.descKey) : rental.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sand-700">
                        {formatPrice(rental.h1)}
                      </td>
                      <td className="px-6 py-4 text-center text-sand-700">
                        {formatPrice(rental.h2)}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-ocean-600 bg-ocean-50/30">
                        {formatPrice(rental.daily)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-coral-50/50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-coral-900">
                        {t.kite.accessories}
                      </div>
                      <div className="text-xs text-coral-600">
                        {t.kite.accessoriesList}
                      </div>
                    </td>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center font-bold text-coral-700"
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
          <p className="mt-3 text-xs text-sand-400 text-right italic">
            {t.kite.note}
          </p>
        </motion.div>

      </div>
    </section>
  )
}
