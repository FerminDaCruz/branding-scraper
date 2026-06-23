"use client";

import { useState, useRef } from "react";
import { MagnifyingGlass, CircleNotch } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  onSubmit: (username: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    const username = value.trim().replace(/^@/, "");
    if (!username) {
      inputRef.current?.focus();
      return;
    }
    onSubmit(username);
  };

  return (
    <form onSubmit={handle} className="flex gap-2">
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground select-none">
          @
        </span>
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="usuario"
          disabled={isLoading}
          className="pl-7 font-mono"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
      <Button type="submit" disabled={isLoading || !value.trim()}>
        {isLoading ? (
          <CircleNotch size={15} className="animate-spin" />
        ) : (
          <MagnifyingGlass size={15} />
        )}
        Generar brief
      </Button>
    </form>
  );
}
