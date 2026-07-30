# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 2.x.x   | ✅ Yes    |
| 1.x.x   | ❌ No     |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please **do not** open a public GitHub issue.

Instead, report it responsibly by emailing: **atharvhatwar02@gmail.com**

Please include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

You can expect a response within 48 hours. If the vulnerability is confirmed, a fix will be released as quickly as possible and you will be credited.

## Security Best Practices for Contributors

- **Never commit API keys** — use `.env` files (already in `.gitignore`)
- **Never hardcode secrets** in source code
- **Always validate and sanitize** user inputs
- Keep dependencies up to date (`npm audit` regularly)
- Use environment variables for all external service credentials

## Known Security Considerations

- **API Keys**: This application requires a Google Gemini API key and optionally an Unsplash API key. Both must be stored in `.env` and never committed.
- **Client-Side Keys**: Since this is a Vite/React app, `VITE_` prefixed env variables are embedded in the client bundle. For production deployments, use a backend proxy to protect your API keys.
