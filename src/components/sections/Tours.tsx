import { motion } from 'framer-motion'
import { TOURS, WHATSAPP_LINK } from '@/constants'
import { useBooking } from '../booking/BookingContext'
import { useI18n } from '@/lib/i18n'
import { resolveTranslation } from '@/lib/utils'

export function Tours() {
  const { openBooking } = useBooking()
  const { t } = useI18n()

  const tr = (key: string) => resolveTranslation(t, key)

  return (
    <section id="tours" className="py-20 md:py-32 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-coral-600 font-semibold text-sm uppercase tracking-wider mb-4">
            {t.tours.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-sand-900 mb-6">
            {t.tours.title.split(' ').slice(0, 2).join(' ')}{' '}
            <span className="text-gradient-sunset">{t.tours.title.split(' ').slice(2).join(' ')}</span>
          </h2>
          <p className="text-lg text-sand-600 leading-relaxed">
            {t.tours.description}
          </p>
        </motion.div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TOURS.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${tour.id === 'maracajau'
                    ? 'photo-1544551763-46a013bb70d5'
                    : tour.id === 'buggy'
                      ? 'photo-1583207804762-9f6c7d25e04d'
                      : 'photo-1502933691298-84fc14542831'
                    }?w=800&q=80`}
                  alt={tour.titleKey ? tr(tour.titleKey) : tour.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sand-900/90 via-sand-900/20 to-transparent" />

                {/* Duration badge */}
                {(tour.durationKey || tour.duration) && (
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {tour.durationKey ? tr(tour.durationKey) : tour.duration}
                  </div>
                )}

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    {tour.titleKey ? tr(tour.titleKey) : tour.title}
                  </h3>
                  {tour.highlights && (
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map((highlight, i) => (
                        <span
                          key={highlight}
                          className="bg-coral-500/80 text-white text-xs px-2 py-1 rounded"
                        >
                          {tour.highlightsKeys?.[i] ? tr(tour.highlightsKeys[i]) : highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sand-600 text-sm leading-relaxed mb-6">
                  {tour.descKey ? tr(tour.descKey) : tour.description}
                </p>

                <button
                  onClick={() => openBooking('tour', tour.titleKey ? tr(tour.titleKey) : tour.title)}
                  className="block w-full text-center bg-sand-100 hover:bg-coral-500 text-sand-700 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  {t.tours.checkAvailability}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-coral-500 to-coral-600 rounded-3xl p-8 md:p-12 text-center overflow-hidden"
        >
          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {t.tours.customTitle}
            </h3>
            <p className="text-coral-100 text-lg mb-8 max-w-xl mx-auto">
              {t.tours.customDesc}
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-coral-600 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-coral-50 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {t.tours.talkConcierge}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
