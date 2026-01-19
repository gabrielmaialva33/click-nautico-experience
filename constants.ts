import { LessonPrice, RentalPrice, TourItem, CourseStage } from './types';

export const WHATSAPP_NUMBER = "5584999999999"; // Placeholder
export const INSTAGRAM_LINK = "https://www.instagram.com/clicknautico.kiteschool?igsh=MWEydW5hbGs5cW1idw==";

export const COURSE_STAGES: CourseStage[] = [
  {
    step: 1,
    title: "Montagem e Segurança",
    description: "Abordagem teórica (meteorologia, direção do vento), montagem do equipamento e regras fundamentais de segurança.",
    imageKeyword: "kitesurf setup beach"
  },
  {
    step: 2,
    title: "Controle e Body Drag",
    description: "Aprimoramento do controle da pipa na água e fora dela. Prática do Body Drag (arrasto) para ganhar autonomia.",
    imageKeyword: "kitesurf body drag"
  },
  {
    step: 3,
    title: "Iniciação na Prancha",
    description: "A fase final: subir na prancha (Water Start), controle ao velejar para ambos os lados e noções de orça/arribada.",
    imageKeyword: "kitesurf riding water"
  }
];

export const LESSON_PRICES: LessonPrice[] = [
  {
    id: 'l1',
    name: "Curso Completo (10 Horas)",
    details: "Teoria + Prática. Do zero ao velejo.",
    price: 2800,
    isPopular: true,
    highlight: "Inclui fotos das aulas ao término!"
  },
  {
    id: 'l2',
    name: "Aula Avulsa",
    details: "Aula prática individual",
    price: 320
  },
  {
    id: 'l3',
    name: "Aula Avançada (Com Equipamento)",
    details: "Evolução e manobras com nosso gear",
    price: 280
  },
  {
    id: 'l4',
    name: "Aula Avançada (Equipamento Próprio)",
    details: "Evolução usando seu próprio gear",
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
    details: "Segurança fundamental e self-rescue",
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

export const TOURS: TourItem[] = [
  {
    id: 't1',
    title: "Parrachos de Maracajaú",
    description: "Mergulho nas piscinas naturais do 'Caribe Brasileiro'. Águas cristalinas e vida marinha abundante.",
    price: "Sob Consulta",
    duration: "4 - 5 horas",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 't2',
    title: "Passeio de Buggy",
    description: "Aventura pelas dunas do litoral norte, visitando lagoas e praias desertas. Emoção garantida.",
    price: "Sob Consulta",
    duration: "3 horas",
    image: "https://images.unsplash.com/photo-1541454564808-16e61de7d699?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 't3',
    title: "Pôr do Sol no Rio",
    description: "Um passeio relaxante de barco para apreciar o pôr do sol inesquecível da região.",
    price: "Sob Consulta",
    duration: "2 horas",
    image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?q=80&w=2070&auto=format&fit=crop"
  }
];