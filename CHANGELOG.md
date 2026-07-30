# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [2.0.0] — 2026-07-30

### Security

- **CRITICAL FIX**: Removed exposed `.env` file from Git history (Issue #1)
- **CRITICAL FIX**: Removed hardcoded Unsplash API key from `imageGenerator.ts`
- All API keys now loaded exclusively via environment variables
- Added `.env`, `.env.local`, `.env.*.local`, `.env.production` to `.gitignore`
- Added `.env.example` with placeholder values and setup instructions

### Added

- Real-time section-by-section progress bar (5 sections, 20% each)
- Copy-to-clipboard with visual success/error feedback
- Error state UI — friendly error card with descriptive messages instead of silent failure
- API Key Setup Helper screen — inline setup guide when `VITE_GEMINI_API_KEY` is missing
- Recent topics history — last 5 topics stored in localStorage
- Keyboard shortcut `Ctrl+Enter` / `Cmd+Enter` to trigger generation
- Word count badge on generated reports
- Table of Contents at the top of every generated report
- Export loading states (spinner during Word/PDF generation)
- `useReportGenerator` custom hook encapsulating all business logic
- `types/index.ts` — centralized TypeScript interfaces
- `constants/sections.ts` — report section definitions extracted from utilities
- `Navbar.tsx`, `Footer.tsx`, `TopicInput.tsx`, `ProgressBar.tsx` components
- `components/ui/Toast.tsx` — auto-dismissing toast notifications
- `ApiKeyHelper.tsx` — actionable setup screen
- `.github/workflows/ci.yml` — GitHub Actions CI (lint + type check)
- `.github/CONTRIBUTING.md` — contribution guide
- Google Fonts: Inter (UI) + Merriweather (report body)
- Full SEO meta tags, Open Graph, Twitter Card in `index.html`
- Print stylesheet
- ARIA roles, labels, and keyboard navigation throughout

### Changed

- **BREAKING**: Upgraded `@google/generative-ai` from `^0.2.1` to `^0.24.0` — updated all API calls
- **BREAKING**: Upgraded `docx` from `^8.5.0` to `^9.5.0` — fixed `ImageRun` API (`type` field required)
- Upgraded `vite` from `^5.4.2` to `^6.3.5`
- Upgraded `typescript` from `^5.5.3` to `^5.8.3`
- Upgraded `lucide-react` from `^0.344.0` to `^0.525.0`
- Upgraded `react-markdown` from `^9.0.1` to `^9.5.0`
- Upgraded `tailwindcss` from `^3.4.1` to `^3.4.20`
- Changed Gemini model from deprecated `gemini-pro` to `gemini-1.5-flash`
- `generateReport` now accepts an `onProgress` callback for real-time updates
- `generateReport` now validates topic and API key before making API calls
- `exportUtils.ts` markdown parser rewritten — handles multi-line paragraphs correctly
- `exportUtils.ts` image fetching handles CORS errors gracefully (returns `null` instead of throwing)
- `App.tsx` completely refactored — thin orchestration layer using `useReportGenerator` hook
- `ReportViewer.tsx` — sticky toolbar, word count, accessible button groups, lazy images
- Complete CSS redesign with design token system, dark theme, glassmorphism, micro-animations
- `package.json` version bumped to `2.0.0`, removed unused `html-to-docx` dependency

### Fixed

- Silent error swallowing in `generateReport` — errors now surface in the UI
- Fake progress bar (0→100% in one jump) — now updates per section
- `Github` icon imported but never rendered in `App.tsx`
- `FileImage` icon imported but never used in `ReportViewer.tsx`
- `index` variable unused in `for...of entries()` loop in `exportUtils.ts`
- `formatMarkdownToSections` breaking on multi-line paragraphs
- `docx` `ImageRun` API incompatibility with v9
- `getRelevantImages` crashing when Unsplash key not set

### Removed

- Hardcoded API keys (security fix)
- `html-to-docx` package (was unused)
- Repetitive `// Created by Atharv Hatwar` comments throughout source files

---

## [1.0.0] — 2024-11-26

### Added

- Initial release
- Basic report generation using Gemini AI (gemini-pro)
- Markdown, Word, PDF export
- Unsplash image fetching
- Dark mode UI with Tailwind CSS
