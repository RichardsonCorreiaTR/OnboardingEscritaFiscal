import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import { useSistema, type SistemaId } from "@/context/SistemaContext";

const DOC_TITLE_LANDING = "Onboarding | Gestão de Produto";

const escolhas: { id: SistemaId; label: string }[] = [
  { id: "contabil", label: "Contábil" },
  { id: "escrita", label: "Escrita" },
];

/**
 * Página inicial: escolha do sistema antes do onboarding completo (sem história/guia/stepper).
 */
const LandingSistema = () => {
  const navigate = useNavigate();
  const { setSistema } = useSistema();

  useEffect(() => {
    document.title = DOC_TITLE_LANDING;
  }, []);

  const escolher = (id: SistemaId) => {
    setSistema(id);
    navigate("/portal");
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-header px-6 pt-6 pb-24 md:pb-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 15% 10%, hsl(150 30% 18% / 0.9), transparent 60%)",
          }}
        />

        <div className="container max-w-3xl mx-auto text-center relative z-10 pt-8 md:pt-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <BarChart3 className="text-accent" size={32} />
            <span className="text-primary-foreground/70 font-semibold text-sm tracking-widest uppercase">
              Gestão de Produto
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight">
            Onboarding
          </h1>
          <p className="mt-4 text-primary-foreground/60 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Construindo hoje o{" "}
            <span className="text-[hsl(100_20%_72%)] font-semibold">produto do amanhã.</span>
          </p>
          <p className="mt-8 text-primary-foreground/80 text-sm md:text-base font-medium">
            Selecione o sistema para continuar
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            {escolhas.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => escolher(id)}
                className="w-full sm:w-auto min-w-[200px] bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm px-8 py-3 rounded-lg transition-colors shadow-lg"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingSistema;
