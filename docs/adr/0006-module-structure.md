# ADR 0006 — Backend Module Structure

**Status:** Accepted  
**Date:** 2026-06-23

## Context

The backend has three distinct concerns: scraping data, analyzing it with AI, and generating/storing briefs. These need to be separated to keep the codebase maintainable and to allow each phase to be built independently.

## Decision

Structure the backend into three NestJS feature modules:

```
src/
├── instagram/       # Scraping + persistence (Phase 1)
│   ├── scraper/     # Apify integration
│   ├── entities/    # InstagramProfile, InstagramPost
│   └── dto/
├── analysis/        # Claude API integration (Phase 2)
│   └── prompts/     # Prompt builders
└── brief/           # Brief entity + generation orchestration (Phase 2)
    └── entities/
```

`InstagramModule` exports `InstagramService` so `AnalysisModule` can access profiles without cross-importing entities.

## Consequences

- Each module is independently testable.
- Adding Facebook support in the future means adding a `facebook/` module that follows the same shape as `instagram/`.
- No circular dependencies: instagram ← analysis ← brief.

## Alternatives Considered

- **Flat structure (all in one module)**: Simpler initially but becomes unmaintainable as the project grows.
- **Monorepo with separate packages**: Overkill for a single-developer internal tool.
