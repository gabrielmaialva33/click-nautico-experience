import { LessonPrice, RentalPrice, TourItem } from './types';

export const WHATSAPP_NUMBER = "5584999999999"; // Placeholder, normally would be real number
export const INSTAGRAM_LINK = "https://www.instagram.com/clicknautico.kiteschool?igsh=MWEydW5hbGs5cW1idw==";

export const LESSON_PRICES: LessonPrice[] = [
  {
    id: 'l1',
    name: "Curso Completo",
    details: "10 horas de aula prática e teórica",
    price: 2800,
    isPopular: true
  },
  {
    id: 'l2',
    name: "Aula de Kite Avulsa",
    details: "Aula prática individual",
    price: 320
  },
  {
    id: 'l3',
    name: "Aula Avançada (Com Equipamento)",
    details: "Evolução e manobras",
    price: 280
  },
  {
    id: 'l4',
    name: "Aula Avançada (Equipamento Próprio)",
    details: "Use seu próprio gear",
    price: 230
  },
  {
    id: 'l5',
    name: "Supervisão",
    details: "Acompanhamento na água",
    price: 180
  },
  {
    id: 'l6',
    name: "Aula de Autoresgate",
    details: "Segurança fundamental",
    price: 350
  }
];

export const SPECIAL_ACTIVITIES: LessonPrice[] = [
  {
    id: 's1',
    name: "Downwind Piscinas Naturais",
    details: "Duração média 2:30h",
    price: 350,
    isPopular: true
  },
  {
    id: 's2',
    name: "Dia em Maracajaú",
    details: "Até 4 pessoas (Passeio exclusivo)",
    price: 600
  }
];

export const RENTAL_PRICES: RentalPrice[] = [
  {
    id: 'r1',
    item: "Equipamento Completo",
    h1: 270,
    h2: 400,
    daily: 500
  },
  {
    id: 'r2',
    item: "Kite e Barra",
    h1: 150,
    h2: 270,
    daily: 400
  },
  {
    id: 'r3',
    item: "Prancha (Board)",
    h1: 90,
    h2: 140,
    daily: 210
  }
];

// Inferred tours based on location (Vila Galé Touros) and generic request
export const TOURS: TourItem[] = [
  {
    id: 't1',
    title: "Parrachos de Maracajaú",
    description: "Mergulho nas piscinas naturais do 'Caribe Brasileiro'. Águas cristalinas e vida marinha abundante.",
    price: "Sob Consulta",
    duration: "4 - 5 horas",
    image: "https://picsum.photos/800/600?random=10"
  },
  {
    id: 't2',
    title: "Passeio de Buggy",
    description: "Aventura pelas dunas do litoral norte, visitando lagoas e praias desertas.",
    price: "Sob Consulta",
    duration: "3 horas",
    image: "https://picsum.photos/800/600?random=11"
  },
  {
    id: 't3',
    title: "Pôr do Sol no Rio",
    description: "Um passeio relaxante de barco para apreciar o pôr do sol inesquecível da região.",
    price: "Sob Consulta",
    duration: "2 horas",
    image: "https://picsum.photos/800/600?random=12"
  }
];