"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Code } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProfileHeader } from "@/components/profile-header";
import { FullBrief } from "@/components/full-brief";
import { WebPromptModal } from "@/components/web-prompt-modal";
import type { Brief } from "@/types/brief";

interface BriefDisplayProps {
  brief: Brief;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary mb-3">
      {children}
    </p>
  );
}

function SectionCard({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-5 rounded-md border border-border bg-card ${className}`}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  );
}

function TextContent({ children }: { children: string }) {
  return (
    <p className="text-sm text-foreground/80 leading-relaxed">{children}</p>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
          <span className="font-mono text-[10px] text-primary mt-1 shrink-0 w-4">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function BriefDisplay({ brief }: BriefDisplayProps) {
  const [promptOpen, setPromptOpen] = useState(false);
  const reduce = useReducedMotion();

  const animate = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <div className="space-y-4">
      <motion.div {...animate(0)}>
        <ProfileHeader profile={brief.profile} />
      </motion.div>

      {/* negocio */}
      <motion.div {...animate(1)}>
        <SectionCard label="Información del negocio">
          <TextContent>{brief.businessInfo}</TextContent>
        </SectionCard>
      </motion.div>

      {/* oferta */}
      <motion.div {...animate(2)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard label="Oferta principal">
          <TextContent>{brief.mainOffer}</TextContent>
        </SectionCard>
        <SectionCard label="Oferta secundaria">
          <TextContent>{brief.secondaryOffer || "No detectada."}</TextContent>
        </SectionCard>
      </motion.div>

      {/* audiencia */}
      <motion.div {...animate(3)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard label="Publico objetivo">
          <TextContent>{brief.targetAudience}</TextContent>
        </SectionCard>
        <SectionCard label="Dolor principal">
          <TextContent>{brief.mainPain}</TextContent>
        </SectionCard>
      </motion.div>

      <motion.div {...animate(4)}>
        <SectionCard label="Deseos">
          <TextContent>{brief.desires}</TextContent>
        </SectionCard>
      </motion.div>

      {/* estrategia */}
      <motion.div {...animate(5)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard label="Posicionamiento">
          <TextContent>{brief.positioning}</TextContent>
        </SectionCard>
        <SectionCard label="Estilo de comunicacion">
          <TextContent>{brief.communicationStyle}</TextContent>
        </SectionCard>
      </motion.div>

      {/* contenido */}
      <motion.div {...animate(6)}>
        <SectionCard label="Tematicas de contenido">
          <div className="flex flex-wrap gap-2">
            {brief.contentTopics.map((topic, i) => (
              <Badge key={i} variant="default">{topic}</Badge>
            ))}
          </div>
        </SectionCard>
      </motion.div>

      <motion.div {...animate(7)}>
        <SectionCard label="CTAs utilizados">
          <div className="flex flex-wrap gap-2">
            {brief.ctasUsed.map((cta, i) => (
              <Badge key={i} variant="secondary">{cta}</Badge>
            ))}
          </div>
        </SectionCard>
      </motion.div>

      {/* embudo */}
      <motion.div {...animate(8)}>
        <SectionCard label="Embudo detectado">
          <TextContent>{brief.detectedFunnel}</TextContent>
        </SectionCard>
      </motion.div>

      {/* oportunidades */}
      <motion.div {...animate(9)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard label="Oportunidades de mejora">
          <NumberedList items={brief.improvementOpportunities} />
        </SectionCard>
        <SectionCard label="Recomendaciones web">
          <NumberedList items={brief.webRecommendations} />
        </SectionCard>
      </motion.div>

      {/* full brief */}
      {brief.fullBrief && (
        <motion.div {...animate(10)}>
          <FullBrief content={brief.fullBrief} />
        </motion.div>
      )}

      {/* prompt web */}
      <motion.div {...animate(11)} className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setPromptOpen(true)}>
          <Code size={13} />
          Ver Prompt Web
        </Button>
      </motion.div>

      <WebPromptModal
        username={brief.profile.username}
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
      />
    </div>
  );
}
