# ADR 0001 — Use NestJS as Backend Framework

**Status:** Accepted  
**Date:** 2026-06-23

## Context

The project requires a structured backend capable of handling HTTP requests, integrating with external APIs (Apify, Claude), and persisting data to PostgreSQL. The backend is TypeScript-first and needs clear module boundaries for scraping, analysis, and brief generation.

## Decision

Use NestJS as the backend framework.

## Consequences

- Module system enforces separation of concerns naturally (InstagramModule, AnalysisModule, BriefModule).
- Built-in dependency injection simplifies testing and wiring of services.
- Decorators-based validation (`class-validator`) integrates cleanly.
- TypeORM first-class support via `@nestjs/typeorm`.
- Slightly more boilerplate than Express for a simple tool, but the structure pays off as modules grow.

## Alternatives Considered

- **Express + plain TypeScript**: Less opinionated, but requires manual wiring of everything. Not worth the overhead for this project size.
- **Fastify**: Faster, but NestJS supports it as an adapter anyway and the performance difference is irrelevant for an internal tool.
