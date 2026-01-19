export type Locale = 'pt' | 'en' | 'es'

export interface Translations {
  nav: {
    home: string
    kiteSchool: string
    tours: string
    contact: string
    bookClass: string
  }
  hero: {
    since: string
    subtitle: string
    experience: string
    students: string
    followers: string
    bookClass: string
    scroll: string
  }
  kite: {
    badge: string
    title: string
    description: string
    step1Title: string
    step1Desc: string
    step2Title: string
    step2Desc: string
    step3Title: string
    step3Desc: string
    investment: string
    investmentDesc: string
    minHours: string
    recommended: string
    completeCourse: string
    completeHours: string
    completeCourseDesc: string
    basicCourse: string
    basicHours: string
    basicCourseDesc: string
    baptism: string
    baptismHours: string
    baptismDesc: string
    perHour: string
    includes: string
    includesList: string[]
    rentalTitle: string
    rentalDesc: string
    fullKit: string
    onlyKite: string
    onlyBoard: string
    hour: string
    hours: string
    note: string
    value: string
    reserve: string
    item: string
    daily: string
    accessories: string
    accessoriesList: string
    oneTimeFee: string
    specialExperiences: string
    specialDesc: string
    perPerson: string
  }
  tours: {
    badge: string
    title: string
    description: string
    maracajau: string
    maracajauDuration: string
    maracajauTags: string[]
    maracajauDesc: string
    buggy: string
    buggyDuration: string
    buggyTags: string[]
    buggyDesc: string
    sunset: string
    sunsetDuration: string
    sunsetTags: string[]
    sunsetDesc: string
    checkAvailability: string
    customTitle: string
    customDesc: string
    talkConcierge: string
  }
  footer: {
    description: string
    navigation: string
    location: string
    copyright: string
    madeWith: string
  }
  chat: {
    greeting: string
    greetingDesc: string
    placeholder: string
    poweredBy: string
    online: string
    clearChat: string
    error: string
  }
  booking: {
    title: string
    step1: string
    step2: string
    step3: string
    type: {
      kite: string
      tour: string
    }
    labels: {
      package: string
      date: string
      name: string
      notes: string
      send: string
      back: string
      next: string
    }
    placeholders: {
      package: string
      name: string
      notes: string
    }
    whatsappMessage: string
  }
} // End of Translations interface
