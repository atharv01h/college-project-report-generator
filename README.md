# College Project Report Generator

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-6478ff?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-34d399?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite)

**Generate comprehensive 7,500+ word academic project reports in minutes using Google Gemini AI.**

[Live Demo](https://college-project-report-generator.vercel.app/) · [Report a Bug](https://github.com/atharv01h/college-project-report-generator/issues) · [Request Feature](https://github.com/atharv01h/college-project-report-generator/issues)

</div>

---

## ✨ Features

- 🤖 **AI-Powered** — Uses Google Gemini 1.5 Flash for fast, high-quality academic content
- 📄 **7,500+ Words** — Generates 5 comprehensive academic sections per report
- 📊 **Real-Time Progress** — Section-by-section progress bar with live status
- 🖼️ **Relevant Images** — Fetches related images via Unsplash API (optional)
- 📥 **Multiple Export Formats** — Download as Markdown, Word (DOCX), or PDF
- 📋 **Copy to Clipboard** — One-click copy with visual feedback
- 🕓 **Recent Topics** — Remembers your last 5 topics via localStorage
- ⌨️ **Keyboard Shortcut** — `Ctrl+Enter` / `Cmd+Enter` to generate
- 🔑 **Setup Helper** — Inline guidance if API key is not configured
- 📱 **Fully Responsive** — Works great on mobile, tablet, and desktop
- ♿ **Accessible** — ARIA roles, keyboard navigation, screen reader friendly
- 🖨️ **Print-Ready** — Clean print stylesheet built in

## 🏗️ Architecture

```
src/
  components/
    ui/               ← Shared primitive components (Toast)
    ApiKeyHelper.tsx  ← Setup guidance screen
    Footer.tsx        ← Site footer
    Navbar.tsx        ← Sticky navigation
    ProgressBar.tsx   ← Section-by-section progress
    ReportViewer.tsx  ← Report display + export toolbar
    TopicInput.tsx    ← Input form with validation
  constants/
    sections.ts       ← Report section definitions
  hooks/
    useReportGenerator.ts  ← Business logic hook
  types/
    index.ts          ← Shared TypeScript types
  utils/
    exportUtils.ts    ← Markdown / DOCX / PDF export
    imageGenerator.ts ← Unsplash image fetching
    reportGenerator.ts ← Gemini AI report generation
  App.tsx
  main.tsx
  index.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A free [Google Gemini API key](https://aistudio.google.com/app/apikey)
- (Optional) A free [Unsplash API key](https://unsplash.com/developers) for images

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/atharv01h/college-project-report-generator.git
cd college-project-report-generator

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your actual API keys

# 4. Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```env
# Required
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional — images disabled if not set
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

> **Never commit your `.env` file.** It is already in `.gitignore`.

## 🛠️ Development

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # ESLint check
npm run typecheck  # TypeScript type check
npm run preview    # Preview production build
```

## 📋 Generated Report Structure

Each report contains:

1. **Executive Summary & Introduction** — Background, objectives, scope
2. **Literature Review** — Current state of field, related work, theory
3. **Methodology** — Research design, data collection, analysis approach
4. **Results & Analysis** — Key findings, data interpretation
5. **Discussion, Conclusions & Future Work** — Implications, limitations, next steps

## 🔒 Security

- API keys are loaded via environment variables — never hardcoded
- `.env` is excluded from Git via `.gitignore`
- See [SECURITY.md](./SECURITY.md) for vulnerability reporting

## 🤝 Contributing

See [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for guidelines.

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

<div align="center">Made with ❤️ by <a href="https://github.com/atharv01h">Atharv Hatwar</a></div>
