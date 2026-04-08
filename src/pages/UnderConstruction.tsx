import { Construction, Hammer, HardHat, Clock } from "lucide-react";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="relative mb-8">
          <div className="w-28 h-28 mx-auto rounded-full bg-secondary flex items-center justify-center">
            <Construction className="text-accent" size={56} strokeWidth={1.5} />
          </div>
          <div className="absolute top-0 right-1/2 translate-x-16 -translate-y-1">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <HardHat className="text-accent" size={20} />
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-16 translate-y-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Hammer className="text-primary" size={20} />
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
          Página em <span className="text-accent">Construção</span>
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md mx-auto">
          Estamos preparando algo incrível para você! Em breve, o portal de
          onboarding estará disponível com todas as informações e ferramentas
          que você precisa.
        </p>

        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-center justify-center gap-3 text-primary">
            <Clock size={20} />
            <span className="font-semibold text-sm">Em breve disponível</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm">
          Gestão de Produto Escrita &mdash; Thomson Reuters
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
