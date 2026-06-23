# Objetivo

Herramienta interna.

Permite ingresar un perfil de Instagram y generar automáticamente un brief comercial.

No es un SaaS.
No requiere autenticación.
No requiere multiusuario.
No requiere sistema de pagos.

---

# Usuario

Solo será utilizada por Fer.

---

# Resultado esperado

Ingresar:

@usuario

Obtener:

- Información del negocio
- Oferta principal
- Oferta secundaria
- Público objetivo
- Dolor principal
- Deseos
- Posicionamiento
- Estilo de comunicación
- Temáticas de contenido
- CTA utilizados
- Embudo detectado
- Oportunidades de mejora
- Recomendaciones web
- Brief completo

---

# Stack

Backend:

- NestJS
- TypeScript

Frontend:

- Next.js
- TypeScript

Database:

- PostgreSQL

IA:

- Claude API

Scraping:

- Apify

Transcripción:

- Faster Whisper

---

# Principios

- Mantener simplicidad
- Evitar complejidad innecesaria
- Arquitectura modular
- Código limpio
- Estricto tipado

---

# Futuro

Posible soporte para Facebook.

Diseñar componentes reutilizables.

# Architecture Decision Records (ADR)

Este proyecto utiliza ADRs para registrar decisiones importantes.

Toda decisión arquitectónica relevante debe generar un ADR.

Ejemplos:

- Selección de NestJS
- Selección de PostgreSQL
- Uso de Apify para scraping
- Uso de Claude para análisis
- Uso de Faster Whisper para transcripción
- Estructura de módulos
- Estrategia de almacenamiento
- Formato del brief
- Estrategia de procesamiento asíncrono

Cada ADR debe seguir el formato:

Status:

- Proposed
- Accepted
- Deprecated
- Superseded

Contenido:

- Context
- Decision
- Consequences
- Alternatives Considered

Los ADR deben almacenarse en:

docs/adr/

Ejemplo:

docs/adr/
├── 0001-use-nestjs.md
├── 0002-use-postgresql.md
├── 0003-use-apify.md
└── 0004-use-claude-analysis.md

Cuando se tome una nueva decisión importante,
crear automáticamente un nuevo ADR.

# Project Memory

Mantener actualizado:

docs/project-memory.md

Debe contener:

- Estado actual del proyecto
- Funcionalidades implementadas
- Funcionalidades pendientes
- Problemas conocidos
- Próximos pasos
- Riesgos identificados

Actualizar al finalizar cada sesión importante.
