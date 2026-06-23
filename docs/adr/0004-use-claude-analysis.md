# ADR 0004 — Use Claude API for Brief Analysis

**Status:** Accepted  
**Date:** 2026-06-23

## Context

Generating a commercial brief from scraped Instagram data requires understanding business intent, tone, audience signals, and content strategy from unstructured text (bios, captions, hashtags). This is a language reasoning task.

## Decision

Use Claude API (`claude-sonnet-4-6` model) for brief generation.

## Consequences

- Structured JSON output via tool use ensures the brief fields are always typed and parseable.
- Context window large enough to include all 30 post captions + bio in a single prompt.
- Cost is negligible for an internal tool (one API call per profile analysis).
- Model can be swapped to `claude-opus-4-8` for higher quality if needed.

## Alternatives Considered

- **OpenAI GPT-4**: Similar capability, but Claude was chosen for its large context window and strong instruction-following on structured output tasks.
- **Local LLM (Ollama)**: Free but quality is substantially lower for this kind of nuanced analysis.
