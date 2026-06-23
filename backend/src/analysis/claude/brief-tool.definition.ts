import Anthropic from '@anthropic-ai/sdk';

export interface BriefOutput {
  businessInfo: string;
  mainOffer: string;
  secondaryOffer: string;
  targetAudience: string;
  mainPain: string;
  desires: string;
  positioning: string;
  communicationStyle: string;
  contentTopics: string[];
  ctasUsed: string[];
  detectedFunnel: string;
  improvementOpportunities: string[];
  webRecommendations: string[];
  fullBrief: string;
}

export const BRIEF_TOOL: Anthropic.Tool = {
  name: 'generate_brief',
  description:
    'Genera un brief comercial estructurado basado en los datos del perfil de Instagram',
  input_schema: {
    type: 'object',
    properties: {
      businessInfo: {
        type: 'string',
        description: 'Descripción del negocio: qué hace, sector, propuesta de valor',
      },
      mainOffer: {
        type: 'string',
        description: 'Oferta principal que promueve el perfil',
      },
      secondaryOffer: {
        type: 'string',
        description: 'Oferta secundaria o complementaria (si existe)',
      },
      targetAudience: {
        type: 'string',
        description: 'Público objetivo detallado: demografía, intereses, comportamientos',
      },
      mainPain: {
        type: 'string',
        description: 'Dolor o problema principal que resuelve el negocio',
      },
      desires: {
        type: 'string',
        description: 'Deseos y aspiraciones del público objetivo que activa el contenido',
      },
      positioning: {
        type: 'string',
        description: 'Posicionamiento actual: cómo se diferencia de la competencia',
      },
      communicationStyle: {
        type: 'string',
        description: 'Tono, estilo y voz de la comunicación (formal/informal, inspiracional, técnico, etc.)',
      },
      contentTopics: {
        type: 'array',
        items: { type: 'string' },
        description: 'Temáticas principales de contenido detectadas (5-8 items)',
      },
      ctasUsed: {
        type: 'array',
        items: { type: 'string' },
        description: 'CTAs detectados en captions o perfil (ej: "Link en bio", "Escríbenos")',
      },
      detectedFunnel: {
        type: 'string',
        description: 'Embudo de ventas detectado: cómo atrae, convierte y retiene',
      },
      improvementOpportunities: {
        type: 'array',
        items: { type: 'string' },
        description: 'Oportunidades de mejora concretas para la estrategia de contenido (4-6 items)',
      },
      webRecommendations: {
        type: 'array',
        items: { type: 'string' },
        description: 'Recomendaciones específicas para la estrategia web y landing pages (3-5 items)',
      },
      fullBrief: {
        type: 'string',
        description: 'Brief completo formateado en markdown, integrando todos los campos anteriores de forma narrativa y profesional',
      },
    },
    required: [
      'businessInfo',
      'mainOffer',
      'targetAudience',
      'mainPain',
      'desires',
      'positioning',
      'communicationStyle',
      'contentTopics',
      'ctasUsed',
      'detectedFunnel',
      'improvementOpportunities',
      'webRecommendations',
      'fullBrief',
    ],
  },
};
