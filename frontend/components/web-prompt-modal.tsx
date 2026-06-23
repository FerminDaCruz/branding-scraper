"use client";

import { useState, useEffect, useRef } from "react";
import { X, Copy, Check, Code } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { getWebPrompt } from "@/lib/api";

interface WebPromptModalProps {
  username: string;
  open: boolean;
  onClose: () => void;
}

export function WebPromptModal({ username, open, onClose }: WebPromptModalProps) {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open || prompt) return;
    setLoading(true);
    getWebPrompt(username)
      .then(setPrompt)
      .finally(() => setLoading(false));
  }, [open, username, prompt]);

  const handleCopy = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open) return null;

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <div className="relative flex flex-col w-full max-w-3xl max-h-[85vh] rounded-md border border-border bg-card shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <Code size={15} className="text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
              Prompt Web — @{username}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-hidden p-4">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-sm text-muted-foreground font-mono">
              Generando prompt...
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              readOnly
              value={prompt ?? ""}
              className="w-full h-full min-h-[400px] resize-none bg-background border border-border rounded-sm p-4 font-mono text-xs text-foreground/80 leading-relaxed focus:outline-none focus:border-primary/50 scrollbar-thin"
            />
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border shrink-0">
          <p className="text-[10px] text-muted-foreground font-mono">
            Pegá este contenido como CLAUDE.md en el proyecto web del cliente.
          </p>
          <Button
            size="sm"
            onClick={handleCopy}
            disabled={!prompt || loading}
          >
            {copied ? (
              <>
                <Check size={13} />
                Copiado
              </>
            ) : (
              <>
                <Copy size={13} />
                Copiar
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
