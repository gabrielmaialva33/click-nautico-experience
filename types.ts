export interface LessonPrice {
  id: string;
  name: string;
  price: number;
  details?: string;
  isPopular?: boolean;
  highlight?: string; // For things like "Inclui fotos"
}

export interface RentalPrice {
  id: string;
  item: string;
  h1: number;
  h2: number;
  daily: number;
}

export interface TourItem {
  id: string;
  title: string;
  description: string;
  price: number | string;
  duration?: string;
  image: string;
}

export interface CourseStage {
  step: number;
  title: string;
  description: string;
  imageKeyword: string;
}

export enum TabView {
  KITE = 'KITE',
  TOURS = 'TOURS'
}