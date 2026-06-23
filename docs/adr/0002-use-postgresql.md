# ADR 0002 — Use PostgreSQL as Database

**Status:** Accepted  
**Date:** 2026-06-23

## Context

Scraped Instagram profiles and posts need to be persisted between runs to avoid redundant Apify calls (which cost money). Generated briefs also need storage. The data is relational: a profile has many posts, a profile has one brief.

## Decision

Use PostgreSQL with TypeORM (`synchronize: true` in development).

## Consequences

- Relational model fits the profile → posts → brief hierarchy naturally.
- TypeORM entities map 1:1 to tables; `synchronize: true` removes migration overhead during early development.
- Running via Docker Compose keeps local setup simple.
- In the future, `synchronize` should be disabled and migrations used instead.

## Alternatives Considered

- **SQLite**: Simpler setup, no Docker needed, but less suitable if the project ever moves to a server.
- **MongoDB**: Schema flexibility not needed here; relational joins are more natural for this data shape.
