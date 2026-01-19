export interface LessonPrice {
  id: string
  name: string
  subtitle?: string
  description?: string
  price: number
  isPopular?: boolean
  highlight?: string
  features?: string[]
}

export interface RentalPrice {
  id: string
  item: string
  description?: string
  h1: number
  h2: number
  daily: number
}

export interface TourItem {
  id: string
  title: string
  description: string
  price: number | string
  duration?: string
  image: string
  highlights?: string[]
}

export interface CourseStage {
  step: number
  title: string
  description: string
  imageKeyword: string
  icon?: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  rating: number
  date: string
  avatar?: string
}

export type SectionId = 'home' | 'kite' | 'tours' | 'contact'

export interface NavItem {
  id: SectionId
  label: string
  href: string
}
