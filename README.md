# Instagram Brief Creator

Herramienta interna para generar briefs comerciales a partir de perfiles de Instagram.

Ingresás un `@usuario` y obtenés un análisis estructurado del negocio, su estrategia de contenido, audiencia, posicionamiento y recomendaciones — listo para usar en proyectos web o de marketing.

---

## Qué hace

1. **Scraping** — obtiene datos del perfil e historial de posts vía Apify
2. **Análisis** — Claude API procesa la información y genera un brief estructurado de 14 campos
3. **Persistencia** — todo se guarda en Supabase (PostgreSQL); los análisis no se repiten si ya existen
4. **Prompt Web** — genera automáticamente un prompt pre-armado por capas para crear la web del cliente con Claude Code

---

## Stack

| Capa | Tecnología |
|---|---|
| Backend | NestJS + TypeScript |
| Frontend | Next.js 15 + Tailwind v3 + shadcn/ui |
| Base de datos | PostgreSQL vía Supabase |
| ORM | TypeORM (`synchronize: true` en dev) |
| Scraping | Apify — `apify/instagram-profile-scraper` |
| IA | Anthropic Claude API (`claude-sonnet-4-6`, tool_use forzado) |
| Animaciones | motion/react |
| Iconos | @phosphor-icons/react |

---

## Estructura

```
instagram-brief-creator/
├── backend/                        # NestJS API
│   ├── src/
│   │   ├── instagram/              # Módulo de scraping
│   │   │   ├── entities/           # InstagramProfile, InstagramPost
│   │   │   └── scraper/            # ApifyService
│   │   ├── analysis/               # Módulo de análisis
│   │   │   ├── entities/           # Brief
│   │   │   ├── claude/             # ClaudeService + definición del tool
│   │   │   └── prompts/            # brief-prompt.builder, web-prompt.builder
│   │   └── config/                 # database.config.ts
│   └── scripts/
│       └── migrate-to-supabase.mjs # Script de migración de datos
├── frontend/                       # Next.js App
│   ├── app/
│   ├── components/
│   │   ├── ui/                     # Button, Badge, Input, Skeleton
│   │   ├── brief-display.tsx       # Vista principal del brief
│   │   ├── brief-skeleton.tsx      # Loading state
│   │   ├── full-brief.tsx          # Brief completo colapsable (Markdown)
│   │   ├── main-app.tsx            # Máquina de estados (idle/scraping/analyzing/done/error)
│   │   ├── profile-header.tsx      # Header con datos del perfil
│   │   ├── search-form.tsx         # Input de usuario
│   │   └── web-prompt-modal.tsx    # Modal con prompt pre-armado para webs
│   ├── lib/
│   │   ├── api.ts                  # Funciones fetch al backend
│   │   └── utils.ts
│   └── types/
│       └── brief.ts
└── docs/
    ├── project-memory.md
    └── adr/                        # Architecture Decision Records
```

---

## Configuración

### Backend — `backend/.env`

```env
DB_HOST=db.xxxx.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password_supabase
DB_NAME=postgres
DB_SSL=true

APIFY_API_TOKEN=apify_api_...
ANTHROPIC_API_KEY=sk-ant-...

PORT=3001
NODE_ENV=development
```

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## Cómo correrlo

```bash
# Backend
cd backend
npm install
npm run start:dev     # corre en :3001

# Frontend
cd frontend
npm install
npm run dev           # corre en :3000
```

---

## Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/instagram/scrape` | Scraping del perfil (cache: no llama a Apify si ya existe) |
| `POST` | `/api/analysis/:username` | Genera el brief (cache: no llama a Claude si ya existe) |
| `GET` | `/api/analysis/:username` | Obtiene el brief guardado |
| `GET` | `/api/analysis/:username/web-prompt` | Prompt pre-armado para generar la web del cliente |

---

## Brief generado

Cada análisis produce 14 campos:

- Información del negocio
- Oferta principal y secundaria
- Público objetivo
- Dolor principal
- Deseos
- Posicionamiento
- Estilo de comunicación
- Temáticas de contenido
- CTAs utilizados
- Embudo detectado
- Oportunidades de mejora
- Recomendaciones web
- Brief completo (Markdown)

---

## Prompt Web

Desde el frontend, después de generar un brief, el botón **"Ver Prompt Web"** abre un modal con un prompt estructurado en 5 capas listo para usar con Claude Code:

1. Identidad de marca
2. Estrategia comercial
3. Posicionamiento y tono
4. Contenido y CTAs
5. Instrucciones técnicas + CLAUDE.md del proyecto

No consume tokens — es generación pura por interpolación del brief guardado.

---

## Migración de datos

Para mover datos de PostgreSQL local a Supabase:

```bash
cd backend
node scripts/migrate-to-supabase.mjs
```

Correr **antes** de cambiar el `.env` al host de Supabase.

---

## Decisiones de arquitectura

Ver [`docs/adr/`](docs/adr/) para el registro completo de decisiones.

---

## Notas

- Uso exclusivamente interno. Sin autenticación, sin multiusuario.
- Las transcripciones de video (`transcript`) están reservadas para una fase futura con Faster Whisper.
- Posible extensión futura a Facebook.
