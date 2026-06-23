import { Brief } from '../entities/brief.entity';
import { InstagramProfile } from '../../instagram/entities/instagram-profile.entity';

function list(items: string[]): string {
  return items.map((i) => `- ${i}`).join('\n');
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function buildWebPrompt(brief: Brief, profile: InstagramProfile): string {
  const name = profile.fullName ?? `@${profile.username}`;

  return `# Prompt Web — ${name}
> Generado por instagram-brief-creator. No editar manualmente.
> Pegar este contenido en el CLAUDE.md del proyecto web del cliente.

---

## INSTRUCCIÓN PRINCIPAL

Construí una landing page profesional para el siguiente cliente usando el repo template.
Activá /design-taste-frontend antes de tocar cualquier componente.
TODO el contenido editable va en \`lib/brand.ts\`. Nunca hardcodees texto en componentes.

---

## CAPA 1 — IDENTIDAD DE MARCA

- **Nombre**: ${name}
- **Usuario Instagram**: @${profile.username}
- **Categoría**: ${profile.businessCategory ?? 'No especificada'}
- **Seguidores**: ${formatNumber(profile.followersCount)}
- **Cuenta verificada**: ${profile.isVerified ? 'Sí' : 'No'}
- **Website actual**: ${profile.website ?? 'No tiene'}
- **Bio original**: ${profile.bio ?? 'No disponible'}

---

## CAPA 2 — ESTRATEGIA COMERCIAL

**Información del negocio:**
${brief.businessInfo}

**Oferta principal:**
${brief.mainOffer}

**Oferta secundaria:**
${brief.secondaryOffer || 'No detectada'}

**Público objetivo:**
${brief.targetAudience}

**Dolor principal:**
${brief.mainPain}

**Deseos:**
${brief.desires}

---

## CAPA 3 — POSICIONAMIENTO Y TONO

**Posicionamiento:**
${brief.positioning}

**Estilo de comunicación:**
${brief.communicationStyle}

**Embudo detectado:**
${brief.detectedFunnel}

---

## CAPA 4 — CONTENIDO Y CTAs

**Temáticas de contenido (usar como base para las secciones):**
${list(brief.contentTopics)}

**CTAs que ya usa el cliente (mantener consistencia):**
${list(brief.ctasUsed)}

**Oportunidades de mejora que debe resolver la web:**
${list(brief.improvementOpportunities)}

**Recomendaciones específicas para la web:**
${list(brief.webRecommendations)}

---

## CAPA 5 — INSTRUCCIONES TÉCNICAS

**Stack obligatorio:**
- Next.js 15, App Router, TypeScript estricto
- Tailwind v3 con CSS variables
- shadcn/ui (personalizado, nunca en estado default)
- motion/react para animaciones
- @phosphor-icons/react (NO lucide-react)
- Geist Sans + Geist Mono
- react-hook-form + zod para formulario de reservas
- Sistema de reservas vía WhatsApp redirect

**Skills a activar:**
- /design-taste-frontend (obligatorio, antes de cualquier componente)

**Restricciones de diseño:**
- NO usar Inter como fuente principal
- NO usar purple/violet/blue genérico como acento
- NO usar gradientes de IA (mesh gradient, aurora sobre negro)
- NO centrar todo el layout si DESIGN_VARIANCE > 4
- NO hardcodear texto — todo desde lib/brand.ts
- El radio de bordes debe ser consistente en toda la página

**Inferir del posicionamiento y estilo de comunicación:**
- Los dials de VARIANCE / MOTION / DENSITY
- La paleta de colores (acento principal)
- La tipografía display
- Si el layout es asimétrico o centrado

---

## SECCIONES MÍNIMAS

1. Navbar con logo placeholder + botón reservar
2. Hero con headline fuerte derivado de la oferta principal
3. About — descripción del negocio + dato de credibilidad
4. Servicios — basados en oferta principal y secundaria
5. Formulario de reservas (WhatsApp)
6. Testimonios (placeholder x3)
7. Galería (placeholder x6)
8. Footer con datos de contacto + redes

---

## DATOS A COMPLETAR EN lib/brand.ts

\`\`\`ts
// Completar con datos reales del cliente antes de hacer deploy
export const BRAND = {
  name: "${name}",
  instagram: "@${profile.username}",
  category: "${profile.businessCategory ?? ''}",
  website: "${profile.website ?? ''}",
  contact: {
    phone: "",          // completar
    email: "${profile.businessEmail ?? ''}",
    whatsapp: "${profile.businessPhone ?? ''}",
    address: "",        // completar
  },
  // ... resto del brief
} as const;
\`\`\`

---

## CLAUDE.md PARA EL PROYECTO

Pegar esto como CLAUDE.md en la raíz del proyecto clonado:

\`\`\`md
# Proyecto Web — ${name}

## Cliente
- Instagram: @${profile.username}
- Categoría: ${profile.businessCategory ?? 'No especificada'}
- Seguidores: ${formatNumber(profile.followersCount)}

## Oferta principal
${brief.mainOffer}

## Público objetivo
${brief.targetAudience}

## Tono y posicionamiento
${brief.communicationStyle}
${brief.positioning}

## Qué debe resolver la web
${list(brief.webRecommendations)}

## Stack
Next.js 15 · Tailwind v3 · shadcn/ui · motion/react · @phosphor-icons/react

## Regla de contenido
Todo el texto editable está en lib/brand.ts. Nunca hardcodear en componentes.

## No hacer
- No Inter como fuente principal
- No purple/violet/blue genérico
- No gradientes de IA
- No lucide-react
\`\`\`
`;
}
