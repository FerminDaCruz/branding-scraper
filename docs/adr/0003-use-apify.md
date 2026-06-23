# ADR 0003 — Use Apify for Instagram Scraping

**Status:** Accepted  
**Date:** 2026-06-23

## Context

Instagram does not have a public API for profile data. Scraping directly from the browser or with Puppeteer requires managing proxies, rotating user-agents, and handling anti-bot measures — significant maintenance burden.

## Decision

Use Apify (actor: `apify/instagram-profile-scraper`) via the official `apify-client` SDK.

## Consequences

- No proxy/anti-bot infrastructure to maintain.
- Pay-per-use model: acceptable for an internal tool with low volume.
- Apify manages actor updates when Instagram changes its structure.
- API token stored in `.env`, never committed.
- Result: profile metadata + up to 30 recent posts per scrape.

## Alternatives Considered

- **Direct scraping (Puppeteer/Playwright)**: Full control but high maintenance; Instagram actively blocks bots.
- **Instaloader (Python)**: Works well but mixing Python into a TypeScript backend adds complexity.
- **Third-party Instagram API wrappers**: Unofficial and unstable; Apify is more reliable.
