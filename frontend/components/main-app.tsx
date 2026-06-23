"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { WarningCircle } from "@phosphor-icons/react";
import { SearchForm } from "@/components/search-form";
import { BriefDisplay } from "@/components/brief-display";
import { BriefSkeleton } from "@/components/brief-skeleton";
import { scrapeProfile, generateBrief } from "@/lib/api";
import type { Brief } from "@/types/brief";

type Status = "idle" | "scraping" | "analyzing" | "done" | "error";

const STATUS_LABELS: Record<Status, string> = {
  idle: "",
  scraping: "Obteniendo datos del perfil...",
  analyzing: "Analizando con IA...",
  done: "",
  error: "",
};

export function MainApp() {
  const [status, setStatus] = useState<Status>("idle");
  const [brief, setBrief] = useState<Brief | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const handleSubmit = async (username: string) => {
    setStatus("scraping");
    setBrief(null);
    setErrorMsg(null);

    try {
      await scrapeProfile(username);
      setStatus("analyzing");
      const result = await generateBrief(username);
      setBrief(result);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido.");
      setStatus("error");
    }
  };

  const isLoading = status === "scraping" || status === "analyzing";

  return (
    <div className="space-y-8">
      <SearchForm onSubmit={handleSubmit} isLoading={isLoading} />

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="skeleton"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-6 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground">
                {STATUS_LABELS[status]}
              </span>
            </div>
            <BriefSkeleton />
          </motion.div>
        )}

        {status === "error" && errorMsg && (
          <motion.div
            key="error"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-start gap-3 p-4 rounded-md border border-destructive/40 bg-destructive/5 text-sm text-destructive"
          >
            <WarningCircle size={16} className="mt-0.5 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {status === "done" && brief && (
          <motion.div
            key="brief"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <BriefDisplay brief={brief} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
