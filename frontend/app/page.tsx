import { MainApp } from "@/components/main-app";

export default function Home() {
  return (
    <main className="min-h-[100dvh] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary mb-2">
            Brief Creator
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Análisis de perfil Instagram
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Ingresa un usuario para generar un brief comercial completo.
          </p>
        </header>
        <MainApp />
      </div>
    </main>
  );
}
