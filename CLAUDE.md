# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page para Click Náutico Experience - escola de Kite Surf e passeios turísticos em Vila Galé Touros, RN.

## Tech Stack

- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS 4** (@tailwindcss/vite)
- SPA com navegação por tabs (sem routing library)

## Commands

```bash
npm run dev      # Dev server em http://localhost:3000
npm run build    # Build para produção em dist/
npm run preview  # Preview da build localmente
```

## Architecture

```
├── index.html        # Entry point (SEO meta tags, Tailwind CDN)
├── index.tsx         # React mount
├── App.tsx           # Root component (estado de tabs)
├── types.ts          # TypeScript interfaces
├── constants.ts      # Dados: preços, cursos, passeios, WhatsApp
└── components/
    ├── KiteSchoolSection.tsx  # Tab 1: escola de kite
    ├── ToursSection.tsx       # Tab 2: passeios
    ├── FloatingContact.tsx    # Botão WhatsApp flutuante
    └── Icons.tsx              # SVG icons inline
```

**Data Flow:** `constants.ts` → Components → JSX renderizado

**State:** Apenas `useState<TabView>` em App.tsx para navegação entre tabs

## Key Patterns

- Functional components com `React.FC` typing
- Data-driven rendering via `array.map()` com keys
- Mobile-first (breakpoint `md:` para desktop)
- SVG icons como React components (sem icon library)
- Tailwind classes condicionais inline

## Data Model

Interfaces em `types.ts`:
- `LessonPrice` - aulas e preços
- `RentalPrice` - aluguel de equipamentos
- `TourItem` - passeios turísticos
- `CourseStage` - etapas do curso
- `TabView` enum - KITE | TOURS

## Configuration

- **Path alias:** `@/*` resolve para root do projeto
- **Vite:** GEMINI_API_KEY configurado (ainda não utilizado)
- **tsconfig:** ES2022, ESNext modules, react-jsx

## Business Context

Preços em BRL. Contato via WhatsApp (número em `constants.ts` - atualizar placeholder).
