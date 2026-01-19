import type { LessonPrice, RentalPrice, TourItem, CourseStage, Testimonial } from '../types'

// Contact Info (from Instagram: wa.me/message/3OFRGC64XPWGH1)
export const WHATSAPP_NUMBER = '5584999999999' // Extract from wa.me link
export const WHATSAPP_LINK = 'https://wa.me/message/3OFRGC64XPWGH1'
export const INSTAGRAM_HANDLE = '@clicknautico.kiteschool'
export const INSTAGRAM_LINK = 'https://www.instagram.com/clicknautico.kiteschool'

// Location
export const LOCATION = {
  name: 'Vila Galé Touros',
  address: 'Fazenda das Garças, s/n',
  city: 'Touros',
  state: 'RN',
  cep: '59584-000',
  country: 'Brasil',
  coordinates: {
    lat: -5.1989,
    lng: -35.4608,
  },
}

// Social proof
export const STATS = {
  yearsFounded: 2018,
  yearsExperience: new Date().getFullYear() - 2018,
  studentsCount: '500+',
  instagramFollowers: '7.1K',
  postsCount: '1.090',
  rating: 4.9,
  reviewsCount: 160,
}

// Course stages based on client material
export const COURSE_STAGES: CourseStage[] = [
  {
    step: 1,
    title: 'Montagem e Segurança',
    titleKey: 'kite.step1Title',
    description: 'Abordagem teórica incluindo meteorologia, direções do vento e seus efeitos. Montagem do equipamento e regras fundamentais de segurança.',
    descKey: 'kite.step1Desc',
    imageKeyword: 'setup',
    icon: 'shield',
  },
  {
    step: 2,
    title: 'Controle da Pipa & Body Drag',
    titleKey: 'kite.step2Title',
    description: 'Aprimoramento do controle da pipa tanto na água quanto fora dela. Prática do body drag sem prancha para adquirir autonomia e explorar técnicas de velocidade.',
    descKey: 'kite.step2Desc',
    imageKeyword: 'bodydrag',
    icon: 'wind',
  },
  {
    step: 3,
    title: 'Iniciação na Prancha',
    titleKey: 'kite.step3Title',
    description: 'A fase final: subir na prancha de kite, mantendo o controle ao velejar para a direita e esquerda, assim como para frente e para trás.',
    descKey: 'kite.step3Desc',
    imageKeyword: 'riding',
    icon: 'board',
  },
]

// Pricing from client images (Lista de preços)
export const LESSON_PRICES: LessonPrice[] = [
  {
    id: 'complete-course',
    name: 'Curso Completo',
    nameKey: 'kite.completeCourse',
    subtitle: '10 Horas',
    subtitleKey: 'kite.completeHours',
    description: 'Do zero ao velejo independente. Teoria + Prática completa.',
    descKey: 'kite.completeCourseDesc',
    price: 2800,
    isPopular: true,
    highlight: 'Inclui fotos das aulas ao término do pacote!',
    features: ['Teoria completa', 'Equipamento incluso', 'Certificado', 'Fotos das aulas'],
  },
  {
    id: 'single-lesson',
    name: 'Aula Avulsa',
    nameKey: 'kite.basicCourse', // Using a generic key or creating a new one if strictly differs
    subtitle: 'Por hora',
    subtitleKey: 'kite.perHour',
    description: 'Aula prática individual com instrutor',
    descKey: 'kite.basicCourseDesc', // Mapping appropriately or adding new key
    price: 320,
    features: ['Instrutor dedicado', 'Equipamento incluso'],
  },
  {
    id: 'advanced-with-gear',
    name: 'Aula Avançada',
    nameKey: 'kite.baptism', // Adjusting mapping
    subtitle: 'Com equipamento',
    subtitleKey: 'kite.baptismHours',
    description: 'Evolução e manobras com nosso gear',
    descKey: 'kite.baptismDesc',
    price: 280,
    features: ['Feedback técnico', 'Equipamento incluso'],
  },
  {
    id: 'advanced-own-gear',
    name: 'Aula Avançada',
    nameKey: 'kite.baptism',
    subtitle: 'Equipamento próprio',
    subtitleKey: 'kite.baptismHours',
    description: 'Evolução usando seu próprio gear',
    descKey: 'kite.baptismDesc',
    price: 230,
    features: ['Feedback técnico', 'Flexibilidade'],
  },
  {
    id: 'supervision',
    name: 'Supervisão',
    nameKey: 'kite.badge', // Placeholder, needs specific key
    subtitle: 'Acompanhamento',
    subtitleKey: 'kite.perHour',
    description: 'Acompanhamento profissional na água',
    descKey: 'kite.description', // Placeholder
    price: 180,
    features: ['Segurança', 'Suporte técnico'],
  },
  {
    id: 'self-rescue',
    name: 'Aula de Autoresgate',
    nameKey: 'kite.badge',
    subtitle: 'Self-rescue',
    subtitleKey: 'kite.perHour',
    description: 'Técnicas essenciais de segurança e autoresgate',
    descKey: 'kite.description',
    price: 350,
    features: ['Técnicas de emergência', 'Certificação'],
  },
]

// Special activities
export const SPECIAL_ACTIVITIES: LessonPrice[] = [
  {
    id: 'downwind',
    name: 'Downwind Piscinas Naturais',
    nameKey: 'tours.maracajau', // Approximate mapping
    subtitle: '2:30h de aventura',
    subtitleKey: 'tours.maracajauDuration',
    description: 'Navegue pelas piscinas naturais em uma experiência única',
    descKey: 'tours.maracajauDesc',
    price: 350,
    isPopular: true,
    features: ['Acompanhamento', 'Resgate incluso', 'Fotos'],
  },
  {
    id: 'maracajau-day',
    name: 'Dia em Maracajaú',
    nameKey: 'tours.maracajau',
    subtitle: 'Até 4 pessoas',
    subtitleKey: 'tours.maracajauDuration',
    description: 'Passeio exclusivo de dia inteiro',
    descKey: 'tours.maracajauDesc',
    price: 600,
    features: ['Grupo privado', 'Flexível', 'Personalizado'],
  },
]

// Rental prices
export const RENTAL_PRICES: RentalPrice[] = [
  {
    id: 'full-gear',
    item: 'Equipamento Completo',
    itemKey: 'kite.fullKit',
    description: 'Kite + Barra + Prancha + Trapézio',
    descKey: 'kite.rentalDesc',
    h1: 270,
    h2: 400,
    daily: 500,
  },
  {
    id: 'kite-bar',
    item: 'Kite e Barra',
    itemKey: 'kite.onlyKite',
    description: 'Apenas kite com barra',
    descKey: 'kite.rentalDesc',
    h1: 150,
    h2: 270,
    daily: 400,
  },
  {
    id: 'board',
    item: 'Prancha Board',
    itemKey: 'kite.onlyBoard',
    description: 'Twin-tip ou surfboard',
    descKey: 'kite.rentalDesc',
    h1: 90,
    h2: 140,
    daily: 210,
  },
]

export const ACCESSORIES_FEE = 100 // Capacete, colete, trapézio

// Tours
export const TOURS: TourItem[] = [
  {
    id: 'maracajau',
    title: 'Parrachos de Maracajaú',
    titleKey: 'tours.maracajau',
    description: 'Mergulho nas piscinas naturais do "Caribe Brasileiro". Águas cristalinas e vida marinha abundante em um dos destinos mais espetaculares do RN.',
    descKey: 'tours.maracajauDesc',
    price: 'Sob Consulta',
    duration: '4-5 horas',
    durationKey: 'tours.maracajauDuration',
    image: '/images/tours/maracajau.jpg',
    highlights: ['Snorkeling', 'Águas cristalinas', 'Vida marinha'],
    highlightsKeys: ['tours.maracajauTags.0', 'tours.maracajauTags.1', 'tours.maracajauTags.2']
  },
  {
    id: 'buggy',
    title: 'Passeio de Buggy',
    titleKey: 'tours.buggy',
    description: 'Aventura pelas dunas do litoral norte, visitando lagoas escondidas e praias desertas. Emoção e paisagens de tirar o fôlego.',
    descKey: 'tours.buggyDesc',
    price: 'Sob Consulta',
    duration: '3 horas',
    durationKey: 'tours.buggyDuration',
    image: '/images/tours/buggy.jpg',
    highlights: ['Dunas', 'Lagoas', 'Adrenalina'],
    highlightsKeys: ['tours.buggyTags.0', 'tours.buggyTags.1', 'tours.buggyTags.2']
  },
  {
    id: 'sunset',
    title: 'Pôr do Sol no Rio',
    titleKey: 'tours.sunset',
    description: 'Um passeio relaxante de barco para apreciar o pôr do sol mais bonito da região. Momento perfeito para casais e famílias.',
    descKey: 'tours.sunsetDesc',
    price: 'Sob Consulta',
    duration: '2 horas',
    durationKey: 'tours.sunsetDuration',
    image: '/images/tours/sunset.jpg',
    highlights: ['Romântico', 'Fotogênico', 'Relaxante'],
    highlightsKeys: ['tours.sunsetTags.0', 'tours.sunsetTags.1', 'tours.sunsetTags.2']
  },
]

// Testimonials (prova social)
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rafael M.',
    location: 'São Paulo, SP',
    text: 'Experiência incrível! Em 10 horas já estava velejando. Os instrutores são muito pacientes e profissionais.',
    rating: 5,
    date: '2025-12',
  },
  {
    id: '2',
    name: 'Amanda C.',
    location: 'Brasília, DF',
    text: 'O downwind nas piscinas naturais foi o ponto alto da viagem. Paisagem surreal e todo suporte necessário.',
    rating: 5,
    date: '2025-11',
  },
  {
    id: '3',
    name: 'Pedro H.',
    location: 'Recife, PE',
    text: 'Melhor escola de kite do nordeste! Estrutura completa e localização privilegiada no Vila Galé.',
    rating: 5,
    date: '2025-10',
  },
]

// Navigation
export const NAV_ITEMS = [
  { id: 'home', label: 'Início', href: '#home' },
  { id: 'kite', label: 'Kite School', href: '#kite' },
  { id: 'tours', label: 'Passeios', href: '#tours' },
  { id: 'contact', label: 'Contato', href: '#contact' },
] as const
