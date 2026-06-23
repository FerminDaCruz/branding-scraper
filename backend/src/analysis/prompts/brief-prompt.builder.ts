import { InstagramProfile } from '../../instagram/entities/instagram-profile.entity';
import { InstagramPost } from '../../instagram/entities/instagram-post.entity';

export function buildBriefPrompt(profile: InstagramProfile): string {
  const engagementAvg = calcAvgEngagement(profile);
  const postsSummary = buildPostsSummary(profile.posts ?? []);
  const typeBreakdown = buildTypeBreakdown(profile.posts ?? []);

  return `Eres un experto en marketing digital y estrategia de contenido para Instagram.

Analiza el siguiente perfil de Instagram y genera un brief comercial completo y profundo.
Responde siempre en español.

---

## PERFIL

- Usuario: @${profile.username}
- Nombre: ${profile.fullName ?? 'N/D'}
- Bio: ${profile.bio ?? 'Sin bio'}
- Website: ${profile.website ?? 'Sin website'}
- Seguidores: ${profile.followersCount.toLocaleString('es-AR')}
- Siguiendo: ${profile.followingCount.toLocaleString('es-AR')}
- Total de posts: ${profile.postsCount.toLocaleString('es-AR')}
- Verificado: ${profile.isVerified ? 'Sí' : 'No'}
- Cuenta de negocio: ${profile.isBusinessAccount ? 'Sí' : 'No'}
- Categoría: ${profile.businessCategory ?? 'N/D'}
- Email de negocio: ${profile.businessEmail ?? 'N/D'}
- Teléfono: ${profile.businessPhone ?? 'N/D'}
- Ratio seguidores/seguidos: ${calcFollowerRatio(profile)}
- Engagement promedio: ${engagementAvg}%
- Distribución de formatos: ${typeBreakdown}

---

## PUBLICACIONES RECIENTES ANALIZADAS

${postsSummary}

---

## INSTRUCCIONES

Con base en todos estos datos, elabora un brief comercial preciso y accionable.
Sé específico: evita generalidades. Usa evidencia de las publicaciones para fundamentar cada sección.
Si detectás patrones en los captions, engagement o formato, mencionálos.
Si el perfil tiene datos limitados, indicalo claramente en la sección correspondiente.`;
}

function calcAvgEngagement(profile: InstagramProfile): string {
  const posts = profile.posts ?? [];
  if (!posts.length || !profile.followersCount) return '0.00';
  const avg =
    posts.reduce(
      (sum, p) => sum + (p.likesCount + p.commentsCount) / profile.followersCount * 100,
      0,
    ) / posts.length;
  return avg.toFixed(2);
}

function calcFollowerRatio(profile: InstagramProfile): string {
  if (!profile.followingCount) return 'N/D';
  return (profile.followersCount / profile.followingCount).toFixed(0) + ':1';
}

function buildTypeBreakdown(posts: InstagramPost[]): string {
  if (!posts.length) return 'Sin posts';
  const counts: Record<string, number> = {};
  for (const p of posts) {
    counts[p.type] = (counts[p.type] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([type, count]) => `${type}: ${count}`)
    .join(', ');
}

function buildPostsSummary(posts: InstagramPost[]): string {
  if (!posts.length) return 'Sin publicaciones disponibles.';

  return posts
    .map((p, i) => {
      const engagement = p.likesCount + p.commentsCount;
      const lines = [
        `### Post ${i + 1} — ${p.type} | ${formatDate(p.timestamp)}`,
        `- Engagement: ${engagement.toLocaleString('es-AR')} (❤️ ${p.likesCount.toLocaleString('es-AR')} likes · 💬 ${p.commentsCount.toLocaleString('es-AR')} comentarios)`,
        p.videoViewCount
          ? `- Vistas: ${p.videoViewCount.toLocaleString('es-AR')}`
          : null,
        p.caption
          ? `- Caption: "${p.caption.replace(/\n/g, ' ')}"`
          : '- Caption: (sin texto)',
        p.hashtags?.length
          ? `- Hashtags: ${p.hashtags.join(', ')}`
          : null,
        p.mentions?.length
          ? `- Menciones: @${p.mentions.join(', @')}`
          : null,
        p.transcript
          ? `- Transcripción: "${p.transcript.replace(/\n/g, ' ')}"`
          : null,
      ];
      return lines.filter(Boolean).join('\n');
    })
    .join('\n\n');
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return 'fecha desconocida';
  return new Date(date).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
