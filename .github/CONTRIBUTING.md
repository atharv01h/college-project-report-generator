# Contributing Guide

Thank you for considering contributing to the College Project Report Generator!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/college-project-report-generator.git`
3. Install dependencies: `npm install`
4. Copy the env template: `cp .env.example .env` and add your API keys
5. Create a branch: `git checkout -b feat/your-feature-name`

## Development Workflow

```bash
npm run dev        # Start dev server
npm run lint       # Check for lint errors
npm run typecheck  # Check TypeScript types
npm run build      # Verify production build
```

All three checks must pass before submitting a pull request.

## Code Standards

- **TypeScript**: Strict typing — avoid `any`
- **Components**: Functional components with hooks only
- **CSS**: Use the design token variables defined in `index.css`
- **Accessibility**: Always add `aria-label`, `role`, and keyboard support
- **Errors**: Never swallow errors silently — always surface them to the user

## Commit Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add PDF export with table of contents
fix: correct progress bar percentage calculation
security: move API key to environment variable
docs: update README with new setup steps
chore: upgrade lucide-react to 0.525.0
```

## Pull Request Checklist

- [ ] `npm run lint` passes with no warnings
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] No hardcoded secrets or API keys
- [ ] Accessibility attributes added for new UI elements
- [ ] CHANGELOG.md updated under [Unreleased]
- [ ] PR description explains the change and why

## Security

Never commit API keys. See [SECURITY.md](../SECURITY.md).
