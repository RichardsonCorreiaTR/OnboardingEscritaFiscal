import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type SistemaId = "escrita" | "contabil";

const STORAGE_KEY = "onboarding-sistema-id";

const LABELS: Record<SistemaId, string> = {
  escrita: "Escrita",
  contabil: "Contábil",
};

function readStored(): SistemaId {
  try {
    const s = sessionStorage.getItem(STORAGE_KEY);
    if (s === "contabil" || s === "escrita") return s;
  } catch {
    /* ignore */
  }
  return "escrita";
}

type SistemaContextValue = {
  sistemaId: SistemaId;
  /** Rótulo para títulos, ex.: "Escrita", "Contábil" */
  sistemaLabel: string;
  setSistema: (id: SistemaId) => void;
};

const SistemaContext = createContext<SistemaContextValue | null>(null);

export function SistemaProvider({ children }: { children: ReactNode }) {
  const [sistemaId, setSistemaIdState] = useState<SistemaId>(readStored);

  const setSistema = useCallback((id: SistemaId) => {
    setSistemaIdState(id);
    try {
      sessionStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      sistemaId,
      sistemaLabel: LABELS[sistemaId],
      setSistema,
    }),
    [sistemaId, setSistema]
  );

  return <SistemaContext.Provider value={value}>{children}</SistemaContext.Provider>;
}

export function useSistema() {
  const ctx = useContext(SistemaContext);
  if (!ctx) throw new Error("useSistema deve ser usado dentro de SistemaProvider");
  return ctx;
}
