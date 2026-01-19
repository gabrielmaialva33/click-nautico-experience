// Lazy-loaded Framer Motion features (~97KB savings)
// Only loads domAnimation (not domMax) - covers most use cases

import { domAnimation } from 'framer-motion'

export const loadFeatures = () => domAnimation
