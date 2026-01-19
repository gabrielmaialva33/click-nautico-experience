// Lazy-loaded Framer Motion features (~97KB savings)
// Only loads domAnimation (not domMax) - covers most use cases

export const loadFeatures = () =>
  import('framer-motion').then((mod) => mod.domAnimation)
