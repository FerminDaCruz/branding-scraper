# ADR 0005 — Use Faster Whisper for Video Transcription

**Status:** Accepted  
**Date:** 2026-06-23

## Context

Instagram Reels and video posts often contain spoken content that is not captured in captions. To include this in the brief analysis, video audio must be transcribed. This transcription enriches the Claude prompt with spoken language data.

## Decision

Use Faster Whisper (Python microservice) for local audio transcription.

## Consequences

- Faster Whisper runs locally — no API cost per transcription.
- Runs as a separate Python microservice called from the NestJS backend via HTTP.
- The `transcript` field on `InstagramPost` stores the result.
- Implementation is deferred to a later phase; the field is already in the schema.

## Alternatives Considered

- **OpenAI Whisper API**: Easier integration but adds cost and requires uploading audio to a third party.
- **AssemblyAI / Deepgram**: Good accuracy but paid APIs; not justified for an internal tool.
- **Whisper.cpp**: C++ port, harder to set up on Windows than the Python implementation.
