"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface FullBriefProps {
  content: string;
}

export function FullBrief({ content }: FullBriefProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
          Brief Completo
        </span>
        {expanded ? (
          <CaretUp size={14} className="text-muted-foreground shrink-0" />
        ) : (
          <CaretDown size={14} className="text-muted-foreground shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-6 border-t border-border">
          <div className="prose prose-invert prose-sm max-w-none mt-4 scrollbar-thin
            prose-headings:font-semibold prose-headings:text-foreground
            prose-h1:text-base prose-h2:text-sm prose-h3:text-xs
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-strong:text-foreground prose-strong:font-semibold
            prose-li:text-muted-foreground
            prose-table:text-xs
            prose-th:text-foreground prose-th:font-mono prose-th:uppercase prose-th:tracking-wide
            prose-td:text-muted-foreground
            prose-hr:border-border
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:text-primary prose-code:font-mono prose-code:text-xs
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(false)}
              className="text-muted-foreground text-xs"
            >
              <CaretUp size={12} />
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
