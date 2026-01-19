<h1 align="center">
  <img src="https://raw.githubusercontent.com/gabrielmaialva33/click-nautico-experience/main/.github/assets/banner.svg" width="100%" alt="Click Náutico">
</h1>

<p align="center">
  <img src="https://img.shields.io/github/license/gabrielmaialva33/click-nautico-experience?color=00b8d3&style=flat-square&label=Licen%C3%A7a" alt="Licença" />
  <img src="https://img.shields.io/github/languages/top/gabrielmaialva33/click-nautico-experience?style=flat-square&label=Linguagem" alt="Linguagem principal" />
  <img src="https://img.shields.io/github/repo-size/gabrielmaialva33/click-nautico-experience?style=flat-square&label=Tamanho" alt="Tamanho do repositório" />
  <a href="https://github.com/gabrielmaialva33/click-nautico-experience/commits/main">
    <img src="https://img.shields.io/github/last-commit/gabrielmaialva33/click-nautico-experience?style=flat-square&label=%C3%9Altimo%20commit" alt="Último commit" />
  </a>
</p>

<p align="center">
  <a href="#bookmark-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#surfing_man-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#robot-chat-ia">Chat IA</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#package-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-deploy">Deploy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<br/>

## :bookmark: Sobre

**Click Náutico Experience** é um hot site premium desenvolvido para a **Click Náutico**, escola de kite surf e empresa de passeios turísticos localizada em Vila Galé Touros, no belo litoral do Rio Grande do Norte.

Este projeto apresenta uma landing page focada em conversão, projetada para maximizar o engajamento e direcionar consultas via WhatsApp. A experiência conta com animações suaves, efeitos de glassmorphism e um design system inspirado no oceano.

### :ocean: Design System

```css
/* Paleta de Cores */
--color-ocean    /* #0891b2 → #164e63 - Cor primária */
--color-coral    /* #f97316 → #ea580c - Destaque/CTAs */
--color-sand     /* #fafaf9 → #1c1917 - Neutros */

/* Tipografia */
--font-display: 'Montserrat'  /* Títulos - Bold & Moderno */
--font-body: 'Open Sans'      /* Corpo - Limpo & Legível */
```

## :surfing_man: Funcionalidades

- **:wind_chime: Seção Kite School** - Etapas do curso, tabelas de preços e informações de aluguel
- **:boat: Seção Passeios** - Tours de barco premium e experiências náuticas
- **:iphone: Design Mobile-First** - Layout responsivo otimizado para todos os dispositivos
- **:sparkles: Animações Suaves** - Micro-interações com Framer Motion
- **:speech_balloon: Integração WhatsApp** - Botão CTA flutuante para contato instantâneo
- **:zap: Alta Performance** - Lighthouse score 95+ com code splitting
- **:robot: Chat IA Inteligente** - Assistente virtual com personalidade casual brasileira
- **:globe_with_meridians: Multi-idioma** - Suporte a PT, EN e ES (automático + manual)

## :robot: Chat IA

O site conta com um assistente virtual inteligente que utiliza IA generativa para responder dúvidas sobre a escola, pacotes, condições de vento e muito mais.

### Características

- **Streaming em tempo real** - Respostas aparecem gradualmente
- **Fallback automático** - Google Gemini → NVIDIA NIM
- **Personalidade casual** - Fala como brasileiro (gírias, "mano", "massa")
- **Multi-idioma** - Responde no idioma do usuário
- **Load balancing** - Rotação entre múltiplas API keys NVIDIA

### Providers

| Provider | Modelo | Uso |
|----------|--------|-----|
| Google AI | Gemini 2.0 Flash | Primário |
| NVIDIA NIM | Llama 3.3 Nemotron 49B | Fallback |

### Configuração das API Keys

Configure via **GitHub Secrets** para o deploy:

```bash
VITE_GOOGLE_API_KEY=sua_chave_google
VITE_NVIDIA_API_KEY_1=chave_nvidia_1
VITE_NVIDIA_API_KEY_2=chave_nvidia_2
VITE_NVIDIA_API_KEY_3=chave_nvidia_3
VITE_NVIDIA_API_KEY_4=chave_nvidia_4
```

Para desenvolvimento local, crie um arquivo `.env.local`:

```bash
VITE_GOOGLE_API_KEY=sua_chave_google
VITE_NVIDIA_API_KEY_1=chave_nvidia_1
# ... outras chaves
```

## :globe_with_meridians: Sistema i18n

O site detecta automaticamente o idioma do navegador e permite troca manual.

### Idiomas Suportados

| Código | Idioma | Detecção |
|--------|--------|----------|
| `pt` | Português (BR) | `pt`, `pt-BR` |
| `en` | English | `en`, `en-US`, `en-GB` |
| `es` | Español | `es`, `es-ES`, `es-MX` |

### Detecção de Idioma

1. **localStorage** - Preferência salva do usuário
2. **URL Query** - `?lang=en` força o idioma
3. **Navigator** - Idioma do navegador
4. **Fallback** - Português (BR)

## :computer: Tecnologias

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| [React](https://react.dev/) | 19.0 | Biblioteca UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.6 | Tipagem Estática |
| [Vite](https://vitejs.dev/) | 6.0 | Build Tool |
| [Tailwind CSS](https://tailwindcss.com/) | 4.0 | Framework de Estilos |
| [Framer Motion](https://www.framer.com/motion/) | 11.x | Animações |
| [Google Generative AI](https://ai.google.dev/) | 0.21 | Chat IA (Gemini) |

## :package: Instalação

```bash
# Clone o repositório
$ git clone https://github.com/gabrielmaialva33/click-nautico-experience.git

# Navegue até o projeto
$ cd click-nautico-experience

# Instale as dependências
$ npm install

# Configure as variáveis de ambiente
$ cp .env.example .env.local
# Edite .env.local com suas API keys

# Inicie o servidor de desenvolvimento
$ npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## :rocket: Deploy

Este projeto usa **GitHub Actions** para deploy automático no GitHub Pages.

Cada push na branch `main` dispara o workflow:
1. Instala dependências
2. Build para produção
3. Deploy no GitHub Pages

### Configurar Secrets no GitHub

1. Vá em **Settings** → **Secrets and variables** → **Actions**
2. Adicione os secrets:
   - `VITE_GOOGLE_API_KEY`
   - `VITE_NVIDIA_API_KEY_1` (até `_4`)

### Habilitar GitHub Pages

1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. O próximo push ativará o deploy

**Demo ao Vivo**: [gabrielmaialva33.github.io/click-nautico-experience](https://gabrielmaialva33.github.io/click-nautico-experience)

## :file_folder: Estrutura do Projeto

```
src/
├── components/
│   ├── sections/       # Hero, KiteSchool, Tours, Footer
│   ├── ui/             # Navbar, FloatingWhatsApp, LanguageSelector
│   └── chat/           # Chat IA com streaming
│       ├── ChatWidget.tsx      # Widget flutuante
│       ├── ChatContainer.tsx   # Container do chat
│       ├── MessageList.tsx     # Lista de mensagens
│       ├── MessageBubble.tsx   # Bolha de mensagem
│       ├── ChatInput.tsx       # Input com envio
│       ├── TypingIndicator.tsx # Indicador "digitando..."
│       └── useGeminiChat.ts    # Hook com fallback Google/NVIDIA
├── lib/
│   ├── ai.ts           # Config dos providers de IA
│   └── i18n/           # Sistema de internacionalização
│       ├── context.tsx # Provider com auto-detecção
│       ├── pt.ts       # Traduções Português
│       ├── en.ts       # Traduções Inglês
│       └── es.ts       # Traduções Espanhol
├── constants/          # Dados do negócio & configuração
├── styles/             # CSS global & design tokens
├── App.tsx             # Componente principal
└── main.tsx            # Ponto de entrada com I18nProvider
```

## :memo: Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<h4 align="center">
  Feito com :heart: por <a href="https://github.com/gabrielmaialva33">Gabriel Maia</a>
</h4>

<p align="center">
  <a href="https://www.instagram.com/clicknautico.kiteschool" target="_blank">
    <img src="https://img.shields.io/badge/-@clicknautico.kiteschool-E4405F?style=flat-square&logo=Instagram&logoColor=white" alt="Instagram" />
  </a>
</p>
