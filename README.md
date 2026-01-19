<h1 align="center">
  <img src="https://raw.githubusercontent.com/gabrielmaialva33/click-nautico-experience/main/.github/assets/banner.svg" width="100%" alt="Click Nautico Experience">
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Gemini_AI-2.0_Flash-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini AI" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/gabrielmaialva33/click-nautico-experience?color=00b8d3&style=flat-square" alt="Licenca" />
  <img src="https://img.shields.io/github/last-commit/gabrielmaialva33/click-nautico-experience?style=flat-square" alt="Ultimo commit" />
  <img src="https://img.shields.io/github/repo-size/gabrielmaialva33/click-nautico-experience?style=flat-square" alt="Tamanho" />
</p>

<p align="center">
  <a href="#sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#chat-ia">Chat IA</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalacao">Instalacao</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#deploy">Deploy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licenca">Licenca</a>
</p>

<br/>

## Sobre

**Click Nautico Experience** e uma landing page premium para a **Click Nautico**, escola de kitesurf e empresa de passeios turisticos localizada em **Vila Gale Touros**, no litoral do Rio Grande do Norte, Brasil.

O projeto foca em conversao, com design mobile-first, animacoes suaves, chat IA integrado e suporte a multiplos idiomas.

### Design System

```css
/* Paleta de Cores */
--color-ocean    /* #0891b2 - #164e63 | Cor primaria */
--color-coral    /* #f97316 - #ea580c | Destaque/CTAs */
--color-sand     /* #fafaf9 - #1c1917 | Neutros */

/* Tipografia */
--font-display: 'Montserrat'  /* Titulos */
--font-body: 'Open Sans'      /* Corpo */
```

---

## Funcionalidades

- **Escola de Kite** - Etapas do curso, tabelas de precos, aluguel de equipamentos
- **Passeios Turisticos** - Tours de barco e experiencias nauticas
- **Chat IA Inteligente** - Assistente virtual com streaming de respostas
- **Internacionalizacao** - Suporte a PT-BR, EN e ES (auto-deteccao)
- **Design Mobile-First** - Layout responsivo otimizado
- **Animacoes Suaves** - Micro-interacoes com Framer Motion e LazyMotion
- **Avatar Animado** - Personagem SVG com blinking e expressoes
- **WhatsApp Flutuante** - CTA para contato instantaneo
- **Booking Modal** - Sistema de reservas integrado
- **Alta Performance** - Lighthouse 95+ com code splitting

---

## Chat IA

Assistente virtual inteligente com IA generativa para responder duvidas sobre a escola, pacotes, condicoes de vento e mais.

### Caracteristicas

| Feature | Descricao |
|---------|-----------|
| Streaming | Respostas aparecem gradualmente em tempo real |
| Fallback | Google Gemini (primario) com NVIDIA NIM como backup |
| Personalidade | Fala como brasileiro (informal, gIrias locais) |
| Multi-idioma | Responde no idioma detectado do usuario |
| Load Balancing | Rotacao entre multiplas API keys NVIDIA |
| Thinking Filter | Remove tags `<think>` internas da IA |

### Providers

| Provider | Modelo | Uso |
|----------|--------|-----|
| Google AI | Gemini 2.0 Flash | Primario |
| NVIDIA NIM | Llama 3.3 Nemotron 49B | Fallback |

### Avatar do Chat

O chat utiliza um avatar SVG animado (`AvatarAI`) com:
- Blinking aleatorio (respeita `prefers-reduced-motion`)
- Animacao de "pensando" quando processa
- Indicador de online pulsante
- Gradientes unicos por instancia (evita colisao de IDs)

---

## Sistema i18n

Deteccao automatica de idioma com opcao de troca manual.

### Idiomas Suportados

| Codigo | Idioma | Deteccao |
|--------|--------|----------|
| `pt` | Portugues (BR) | `pt`, `pt-BR` |
| `en` | English | `en`, `en-US`, `en-GB` |
| `es` | Espanol | `es`, `es-ES`, `es-MX` |

### Ordem de Deteccao

1. **localStorage** - Preferencia salva
2. **URL Query** - `?lang=en`
3. **Navigator** - Idioma do navegador
4. **Fallback** - Portugues (BR)

---

## Tecnologias

| Tecnologia | Versao | Proposito |
|------------|--------|-----------|
| [React](https://react.dev/) | 19.2 | Biblioteca UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.8 | Tipagem estatica |
| [Vite](https://vitejs.dev/) | 6.2 | Build tool |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1 | Framework de estilos |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Animacoes (LazyMotion) |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.0 | State management |
| [Google Generative AI](https://ai.google.dev/) | 0.24 | Chat IA (Gemini) |
| [Lottie React](https://lottiereact.com/) | 2.4 | Animacoes vetoriais |
| [Lucide React](https://lucide.dev/) | 0.562 | Icones |
| [Playwright](https://playwright.dev/) | 1.57 | Testes E2E |

---

## Instalacao

```bash
# Clone o repositorio
git clone https://github.com/gabrielmaialva33/click-nautico-experience.git
cd click-nautico-experience

# Instale as dependencias
npm install

# Configure as variaveis de ambiente
cp .env.example .env.local
```

Edite `.env.local` com suas API keys:

```bash
# Google AI (Gemini) - Provider primario
VITE_GOOGLE_API_KEY=sua_chave_google

# NVIDIA NIM - Provider fallback (load balanced)
VITE_NVIDIA_API_KEY_1=chave_nvidia_1
VITE_NVIDIA_API_KEY_2=chave_nvidia_2
VITE_NVIDIA_API_KEY_3=chave_nvidia_3
VITE_NVIDIA_API_KEY_4=chave_nvidia_4
```

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`

### Scripts Disponiveis

| Comando | Descricao |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build para producao |
| `npm run preview` | Preview da build |
| `npm run test:e2e` | Testes E2E com Playwright |
| `npm run test:e2e:ui` | Testes E2E com UI |

---

## Estrutura do Projeto

```
src/
├── components/
│   ├── sections/          # Hero, KiteSchool, Tours, Footer
│   ├── ui/                # Navbar, FloatingWhatsApp, LanguageSelector
│   ├── chat/              # Chat IA com streaming
│   │   ├── ChatWidget.tsx       # Widget flutuante
│   │   ├── ChatContainer.tsx    # Container principal
│   │   ├── MessageList.tsx      # Lista de mensagens
│   │   ├── MessageBubble.tsx    # Bolha de mensagem
│   │   ├── ChatInput.tsx        # Input com envio
│   │   ├── TypingIndicator.tsx  # Indicador "digitando..."
│   │   ├── AvatarAI.tsx         # Avatar SVG animado
│   │   └── useGeminiChat.ts     # Hook com fallback Google/NVIDIA
│   └── booking/           # Modal de reservas
├── lib/
│   ├── ai.ts              # Config dos providers de IA
│   ├── ai-orchestrator.ts # Orquestrador de modelos
│   ├── nvidia-models.ts   # Modelos NVIDIA NIM
│   ├── utils.ts           # Utilitarios (cn, clsx)
│   └── i18n/              # Sistema de internacionalizacao
│       ├── context.tsx    # Provider com auto-deteccao
│       ├── types.ts       # Tipos TypeScript
│       ├── pt.ts          # Traducoes Portugues
│       ├── en.ts          # Traducoes Ingles
│       └── es.ts          # Traducoes Espanhol
├── store/
│   └── visitorStore.ts    # Estado do visitante (Zustand)
├── constants/             # Dados do negocio
├── types/                 # TypeScript interfaces
├── styles/                # CSS global
├── App.tsx                # Componente principal
└── main.tsx               # Entry point
```

---

## Deploy

O projeto usa **GitHub Actions** para deploy automatico no GitHub Pages.

### Workflow

Cada push na branch `main` dispara:

1. Checkout do codigo
2. Setup Node.js 20
3. Instalacao de dependencias
4. Build com variaveis de ambiente
5. Deploy no GitHub Pages

### Configurar Secrets

1. Va em **Settings** > **Secrets and variables** > **Actions**
2. Adicione os secrets:
   - `VITE_GOOGLE_API_KEY`
   - `VITE_NVIDIA_API_KEY_1` ate `VITE_NVIDIA_API_KEY_4`

### Habilitar GitHub Pages

1. Va em **Settings** > **Pages**
2. Em **Source**, selecione **GitHub Actions**

**Demo**: [gabrielmaialva33.github.io/click-nautico-experience](https://gabrielmaialva33.github.io/click-nautico-experience)

---

## Licenca

Este projeto esta sob a licenca **MIT**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<h4 align="center">
  Feito por <a href="https://github.com/gabrielmaialva33">Gabriel Maia</a>
</h4>

<p align="center">
  <a href="https://www.instagram.com/clicknautico.kiteschool" target="_blank">
    <img src="https://img.shields.io/badge/-@clicknautico.kiteschool-E4405F?style=flat-square&logo=Instagram&logoColor=white" alt="Instagram" />
  </a>
  <a href="https://gabrielmaialva33.github.io/click-nautico-experience" target="_blank">
    <img src="https://img.shields.io/badge/-Demo_Live-00b8d3?style=flat-square&logo=github&logoColor=white" alt="Demo" />
  </a>
</p>
