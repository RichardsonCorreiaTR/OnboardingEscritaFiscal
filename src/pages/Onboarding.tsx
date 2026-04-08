import { useState, useEffect } from "react";
import {
  Globe, Monitor, Download, Settings, FileArchive, Upload,
  Clock, ClipboardList, FolderSearch, Database, Brain, Puzzle,
  Leaf, ExternalLink, HardDrive, Cloud, BarChart3,
  Handshake, Server, Package, Code, CheckCircle, BookOpen,
  Sparkles, CheckSquare, FileText, Library, CalendarDays,
  Share2, Award, RefreshCw, FolderOpen, Briefcase, Receipt,
  ScrollText, GraduationCap, Scale, Phone, Mail, Megaphone, FileCheck, Plus, Minus, ListChecks, Video
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Tris from "@/components/Tris";
import QuadroAvisos from "@/components/QuadroAvisos";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";

const steps = [
  { icon: Handshake, label: "Onboarding" },
  { icon: Server, label: "Workspace" },
  { icon: Package, label: "Instalações" },
  { icon: Library, label: "Manuais" },
  { icon: Code, label: "Tech" },
  { icon: Megaphone, label: "Avisos" },
];

/* ─── Step Content Components ─── */

const StepBoasVindas = () => (
  <div className="animate-fade-in">
    <div className="bg-card rounded-2xl border border-border p-8 md:p-10 mb-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Nossa <span className="text-accent">História</span>
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A equipe de Gestão de Produto Escrita nasceu com a missão de transformar a experiência
            de gestão de escrita Fical. Desde o início, nosso foco é criar processos
            eficientes, intuitivos e que realmente fazem a diferença no dia a dia.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Aqui você encontra tudo o que precisa para começar sua jornada conosco:
            ferramentas, acessos, documentação e muito mais.
          </p>
        </div>
        <div className="hidden md:flex items-center justify-center w-24 h-24 rounded-2xl bg-secondary flex-shrink-0">
          <Sparkles className="text-accent" size={40} strokeWidth={1.5} />
        </div>
      </div>
      <div className="mt-6 bg-success rounded-xl px-5 py-4 flex items-start gap-3">
        <Leaf className="text-success-foreground mt-0.5 flex-shrink-0" size={20} />
        <p className="text-success-foreground text-sm font-medium">
          Siga cada etapa do stepper acima para completar seu onboarding!
        </p>
      </div>
    </div>

    <div className="bg-card rounded-2xl border border-border p-8">
      <h3 className="text-xl font-bold text-foreground mb-4">
        Guia de <span className="text-accent">Onboarding</span>
      </h3>
      <ol className="space-y-3 text-sm text-muted-foreground">
        {[
          "Conheça a história e a cultura do time",
          "Configure seus acessos aos sistemas core",
          "Instale as ferramentas necessárias no seu ambiente",
          "Familiarize-se com a documentação técnica",
          "Instale as extensões e conclua o checklist",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

/* ─── Ecossistema de Trabalho (antigo Sistemas Core) ─── */

const CategoryHeader = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
      <Icon size={20} strokeWidth={1.5} className="text-accent" />
    </div>
    <h3 className="text-lg font-bold text-foreground">{title}</h3>
  </div>
);

const EcossistemaCard = ({
  icon: Icon,
  label,
  desc,
  href = "#",
  manualHref = "#",
  showManual = true,
  showAcessar = true,
  configAmbienteHref,
}: {
  icon: React.ElementType;
  label: string;
  desc: string;
  href?: string;
  manualHref?: string;
  showManual?: boolean;
  showAcessar?: boolean;
  configAmbienteHref?: string;
}) => (
  <div className="group bg-card rounded-2xl border border-border p-6 flex h-full flex-col items-center text-center gap-3 transition-all duration-300 hover:shadow-lg hover:border-accent/30 hover:-translate-y-1">
    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center transition-colors group-hover:bg-accent/10">
      <Icon size={30} strokeWidth={1.5} className="text-foreground transition-colors group-hover:text-accent" />
    </div>
    <h4 className="text-sm font-bold text-foreground">{label}</h4>
    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{desc}</p>
    <div className="flex w-full flex-col gap-2 mt-auto pt-1">
      {showAcessar ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/10"
        >
          <ExternalLink size={14} /> Acessar
        </a>
      ) : null}
      {showManual ? (
        <a
          href={manualHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary hover:text-accent"
        >
          <BookOpen size={14} /> Manual de Acesso
        </a>
      ) : null}
      {configAmbienteHref ? (
        <a
          href={configAmbienteHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary hover:text-accent"
        >
          <Settings size={14} /> Configurar Ambiente
        </a>
      ) : null}
    </div>
  </div>
);

const CONTACT_AREAS = [
  "Escrita",
  "Folha de Pagamento",
  "Contabilidade",
  "Framework",
  "Honorários",
  "Portal do Cliente",
  "Portal do Empregado",
  "Contabilidade Digital",
  "Inova",
  "Suporte Geral",
] as const;

type ContactSlot = { responsavel: string; cargo: string; contato: string };

const ContactSubTable = ({ rows }: { rows: ContactSlot[] }) => (
  <div className="rounded-lg border border-border overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow className="bg-secondary/40">
          <TableHead className="text-xs font-semibold h-9">Responsável</TableHead>
          <TableHead className="text-xs font-semibold h-9">Cargo</TableHead>
          <TableHead className="text-xs font-semibold h-9">Contato</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            <TableCell className="text-xs font-medium text-foreground py-2">{row.responsavel}</TableCell>
            <TableCell className="text-xs text-muted-foreground py-2">{row.cargo}</TableCell>
            <TableCell className="py-2">
              {row.contato.trim() && row.contato !== "—" ? (
                row.contato.includes("@") ? (
                  <a
                    href={`mailto:${row.contato.trim()}`}
                    className="text-accent text-xs flex items-center gap-1 hover:underline"
                  >
                    <Mail size={12} /> {row.contato.trim()}
                  </a>
                ) : (
                  <span className="text-accent text-xs flex items-center gap-1">
                    <Mail size={12} /> {row.contato}
                  </span>
                )
              ) : (
                <span className="text-xs text-muted-foreground/50">&nbsp;</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const placeholderContact: ContactSlot[] = [{ responsavel: "A definir", cargo: "—", contato: "—" }];

const escritaGerentes: ContactSlot[] = [
  { responsavel: "Mariana Sartori", cargo: "Gerente", contato: "Mariana.sartori@thomsonreuters.com" },
  { responsavel: "Marielli Neves", cargo: "Gerente Operacional", contato: "Marielli.neves@thomsonreuters.com" },
  { responsavel: "Richardson Correia", cargo: "Gerente Operacional", contato: "Richardson.correia@thomsonreuters.com" },
];

const escritaEspecialistas: ContactSlot[] = [
  { responsavel: "Lais Andrade", cargo: "Especialista Reforma Tributária", contato: "Lais.deAndrade@thomsonreuters.com" },
  { responsavel: "Patricia Costa", cargo: "Especialista de SAL", contato: "Patricia.costa@thomsonreuters.com" },
  { responsavel: "Bruna Ferro", cargo: "Especialista SAIL", contato: "Bruna.ferro@thomsonreuters.com" },
  { responsavel: "Giovani Cunha", cargo: "Especialista SAM", contato: "Giovani.cunha@thomsonreuters.com" },
  { responsavel: "Jennifer Rodrigues", cargo: "Especialista NE", contato: "Jennifer.rodrigues@thomsonreuters.com" },
  { responsavel: "Victor Ferreira", cargo: "Especialista Importação", contato: "Victor.ferreira@thomsonreuters.com" },
];

const contabilidadeGerentes: ContactSlot[] = [
  { responsavel: "Aline Mezari", cargo: "Gerente", contato: "Aline.mezari@thomsonreuters.com" },
];

const contabilidadeEspecialistas: ContactSlot[] = [
  { responsavel: "Kassiane Meskita", cargo: "Especialista Geral", contato: "Kassiane.Meskita@thomsonreuters.com" },
];

const folhaPagamentoGerentes: ContactSlot[] = [
  { responsavel: "Marianna Saggiorato", cargo: "Gerente", contato: "Marianna.saggiorato@thomsonreuters.com" },
  { responsavel: "Marcio Inacio", cargo: "Gerente Operacional", contato: "Marcio.inacio@thomsonreuters.com" },
  { responsavel: "Vitor Justino", cargo: "Gerente Operacional", contato: "Vitor.justino@thomsonreuters.com" },
  { responsavel: "Sabrina Guessi", cargo: "Gerente Operacional", contato: "SabrinaGuessi@thomsonreuters.com" },
];

const folhaPagamentoEspecialistas: ContactSlot[] = [
  { responsavel: "Lais Almeida", cargo: "Especialista Geral", contato: "lais.almeida@thomsonreuters.com" },
];

const frameworkGerentes: ContactSlot[] = [
  { responsavel: "Daniel Boff", cargo: "Gerente", contato: "Daniel.boff@thomsonreuters.com" },
];

const frameworkEspecialistas: ContactSlot[] = [
  { responsavel: "Eric Pereira", cargo: "Especialista Geral", contato: "Eric.pereira@thomsonreuters.com" },
];

const portalClienteGerentes: ContactSlot[] = [
  { responsavel: "Saymon Silva", cargo: "Gerente", contato: "Saymon.daSilva@thomsonreuters.com" },
];

const portalClienteEspecialistas: ContactSlot[] = [
  { responsavel: "Vitor Steckert", cargo: "Especialista Geral", contato: "vitor.steckert@thomsonreuters.com" },
];

const portalEmpregadoGerentes: ContactSlot[] = [
  { responsavel: "Adao Dutra", cargo: "Gerente Operacional", contato: "Adao.Dutra@thomsonreuters.com" },
];

const contabilidadeDigitalGerentes: ContactSlot[] = [
  { responsavel: "Roberto Carolli", cargo: "Gerente Operacional", contato: "Roberto.carolli@thomsonreuters.com" },
];

const honorariosGerentes: ContactSlot[] = [
  { responsavel: "Julio Cesar", cargo: "Gerente Operacional", contato: "JulioCesar.Piniano@thomsonreuters.com" },
];

const ContactAreaCollapsible = ({ area }: { area: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border last:border-b-0">
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-card hover:bg-secondary/30 transition-colors">
        <span className="font-medium text-foreground">{area}</span>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-secondary hover:text-accent transition-colors"
            aria-label={open ? "Recolher" : "Expandir"}
          >
            {open ? <Minus className="h-4 w-4" strokeWidth={2} /> : <Plus className="h-4 w-4" strokeWidth={2} />}
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="overflow-hidden">
        <div className="space-y-4 px-4 pb-4 pt-1 bg-muted/20 border-t border-border/60">
          <div>
            <p className="text-xs font-semibold text-foreground mb-2">Gerentes</p>
            <ContactSubTable
              rows={
                area === "Escrita"
                  ? escritaGerentes
                  : area === "Folha de Pagamento"
                    ? folhaPagamentoGerentes
                    : area === "Contabilidade"
                      ? contabilidadeGerentes
                      : area === "Framework"
                        ? frameworkGerentes
                        : area === "Honorários"
                          ? honorariosGerentes
                          : area === "Portal do Cliente"
                            ? portalClienteGerentes
                            : area === "Portal do Empregado"
                              ? portalEmpregadoGerentes
                              : area === "Contabilidade Digital"
                                ? contabilidadeDigitalGerentes
                                : placeholderContact
              }
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground mb-2">Especialistas</p>
            <ContactSubTable
              rows={
                area === "Escrita"
                  ? escritaEspecialistas
                  : area === "Folha de Pagamento"
                    ? folhaPagamentoEspecialistas
                    : area === "Contabilidade"
                      ? contabilidadeEspecialistas
                      : area === "Framework"
                        ? frameworkEspecialistas
                        : area === "Portal do Cliente"
                          ? portalClienteEspecialistas
                          : placeholderContact
              }
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const SHAREPOINT_CONFIGURAR_AMBIENTE_DW =
  "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/GP%20-%20NE/!FOLHA/Dom%C3%ADnio%20Conta%20Digital%20e%20Benef%C3%ADcios/Banco%20de%20Dados%20Dom%C3%ADnio%20Beneficios/Alterar%20Chaves%20Registro?csf=1&web=1&e=Rwe5jd";

const SGD_APP_HREF =
  "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/SGD?csf=1&web=1";
const SGD_MANUAL_HREF =
  "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Manuais/SGD?csf=1&web=1";

/** Portal de solicitação de serviço (hardware/periféricos) — substitua pelo URL oficial da empresa. */
const SOLICITACAO_SERVICO_HREF = "#";

/** MyExpenses / reembolsos — substitua pelo URL oficial (ex.: Workday Expenses). */
const MYEXPENSES_HREF = "#";

const DOMINIO_VERSOES_LIST_URL = "https://download.dominiosistemas.com.br/atualizacao/contabil/";

function parseDominioVersoesHtml(html: string) {
  const out: { href: string; name: string; date: string; fullUrl: string }[] = [];
  const pre = html.match(/<pre>([\s\S]*?)<\/pre>/i)?.[1] ?? html;
  const re = /<a href="([^"]+)">([^<]+)<\/a>\s+(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(pre)) !== null) {
    const href = m[1];
    if (href.includes("Parent") || href === "/atualizacao/" || href.startsWith("?")) continue;
    const name = m[2].trim();
    const date = m[3];
    const fullUrl = new URL(href, DOMINIO_VERSOES_LIST_URL).href;
    out.push({ href, name, date, fullUrl });
  }
  return out;
}

const VersoesDoSistemaBlock = () => {
  const [mode, setMode] = useState<"loading" | "table" | "iframe">("loading");
  const [rows, setRows] = useState<{ href: string; name: string; date: string; fullUrl: string }[]>([]);

  useEffect(() => {
    let cancelled = false;
    const listUrl = import.meta.env.DEV ? "/dominio-atualizacao" : DOMINIO_VERSOES_LIST_URL;

    (async () => {
      try {
        const res = await fetch(listUrl, { cache: "no-store" });
        if (!res.ok) throw new Error("HTTP");
        const html = await res.text();
        const parsed = parseDominioVersoesHtml(html);
        if (cancelled) return;
        if (parsed.length > 0) {
          setRows(parsed);
          setMode("table");
        } else {
          setMode("iframe");
        }
      } catch {
        if (!cancelled) setMode("iframe");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (mode === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/30 py-12 text-sm text-muted-foreground">
        <RefreshCw className="h-4 w-4 animate-spin text-accent" strokeWidth={2} />
        Carregando pastas de versão…
      </div>
    );
  }

  if (mode === "iframe") {
    return (
      <div className="space-y-3">
        <iframe
          title="Versões Domínio — atualização contábil"
          src={DOMINIO_VERSOES_LIST_URL}
          className="h-[min(70vh,520px)] w-full rounded-lg border border-border bg-background"
        />
        <p className="text-xs text-muted-foreground">
          A lista acima é carregada diretamente do servidor Domínio. Se não aparecer, abra em nova aba.
        </p>
        <a
          href={DOMINIO_VERSOES_LIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <ExternalLink size={16} /> Abrir listagem em nova aba
        </a>
      </div>
    );
  }

  const lastIdx = rows.length - 1;

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40">
              <TableHead className="text-xs font-semibold h-9">Pasta</TableHead>
              <TableHead className="text-xs font-semibold h-9">Última modificação</TableHead>
              <TableHead className="text-xs font-semibold h-9 w-[100px] text-right"> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => {
              const isLatest = i === lastIdx;
              return (
                <TableRow
                  key={`${row.href}-${i}`}
                  className={
                    isLatest
                      ? "bg-accent/15 border-l-4 border-accent hover:bg-accent/20"
                      : "hover:bg-muted/40"
                  }
                >
                  <TableCell className="text-xs font-medium text-foreground py-2.5">
                    <span className="inline-flex items-center gap-2">
                      <FolderOpen size={14} className={isLatest ? "text-accent" : "text-muted-foreground"} />
                      {row.name}
                      {isLatest ? (
                        <Badge className="text-[10px] bg-accent/25 text-accent-foreground border-accent/30">Mais recente</Badge>
                      ) : null}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground py-2.5 whitespace-nowrap">{row.date}</TableCell>
                  <TableCell className="text-right py-2.5">
                    <a
                      href={row.fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent text-xs font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                      Abrir <ExternalLink size={12} />
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">
        Lista obtida em tempo real de{" "}
        <a href={DOMINIO_VERSOES_LIST_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          download.dominiosistemas.com.br/atualizacao/contabil/
        </a>
        . A linha em destaque laranja é a última pasta publicada (em geral a mais nova).
      </p>
    </div>
  );
};

const StepEcossistema = () => (
  <div className="animate-fade-in space-y-10">
    {/* Rotina & Gestão */}
    <div>
      <CategoryHeader title="Rotina & Gestão" icon={ClipboardList} />
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <EcossistemaCard
            icon={Clock}
            label="My Time"
            desc="Registro e gestão de ponto e jornada de trabalho."
            href="https://mytime.thomsonreuters.com/mytime/MyTimeHome.htm"
            manualHref="https://trten.sharepoint.com/sites/intr-professional-services-latam/Tutoriais%20Prime/Forms/AllItems.aspx?id=%2Fsites%2Fintr%2Dprofessional%2Dservices%2Dlatam%2FTutoriais%20Prime%2FMy%20Time%20%2D%20Apontamento%2Epdf&parent=%2Fsites%2Fintr%2Dprofessional%2Dservices%2Dlatam%2FTutoriais%20Prime"
          />
          <EcossistemaCard
            icon={FileCheck}
            label="Folha Certa"
            desc="Acesso ao portal e recursos do Folha Certa."
            href="https://portal.folhacerta.com/login/"
            showManual={false}
          />
          <EcossistemaCard
            icon={ListChecks}
            label="Registro de Atividades"
            desc="Aplicativo para registrar as atividades diárias."
            href="https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Registro%20de%20Atividades?csf=1&web=1&e=yqFDRy"
            manualHref="https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Manuais/Registro%20Atividades?csf=1&web=1&e=RQ2mRS"
          />
          <EcossistemaCard
            icon={BarChart3}
            label="SGD"
            desc="Ferramenta de rotina e acompanhamento — acesse o aplicativo e o manual no SharePoint."
            href={SGD_APP_HREF}
            manualHref={SGD_MANUAL_HREF}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:max-w-6xl">
          <EcossistemaCard
            icon={Briefcase}
            label="WorkDay"
            desc="Acesso à plataforma que integra gestão de pessoas, finanças e operações, oferecendo informações em tempo real."
            href="https://wd5.myworkday.com/thomsonreuters/d/home.htmld"
            showManual={false}
          />
          <EcossistemaCard
            icon={Monitor}
            label="Solicitação Serviço"
            desc="Permite solicitar troca de Hardware e Periféricos"
            href={SOLICITACAO_SERVICO_HREF}
            showManual={false}
          />
          <EcossistemaCard
            icon={Receipt}
            label="MyExpenses"
            desc="Solicitação de Reembolso conforme notas fiscais"
            href={MYEXPENSES_HREF}
            showManual={false}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <EcossistemaCard
            icon={Award}
            label="DailyPlan"
            desc="Planejamento e controle diário de análises PSAI, SS, SAI e NE."
            href="https://trten-my.sharepoint.com/:x:/r/personal/marielli_neves_thomsonreuters_com/_layouts/15/Doc.aspx?sourcedoc=%7B3B381E02-6C54-4782-8DC6-38CAE3A1D96A%7D&file=Lista%20de%20PSAI%27s%20a%20definir.xlsx&fromShare=true&action=default&mobileredirect=true"
            showManual={false}
          />
          <EcossistemaCard icon={Share2} label="SharePoint" desc="Repositório central de documentos e arquivos." href="https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal?csf=1&web=1&e=3B2Eha" showManual={false} />
          <EcossistemaCard icon={GraduationCap} label="Certificados" desc="Emissão e consulta de certificados internos." href="https://trten-my.sharepoint.com/:f:/r/personal/richardson_correia_thomsonreuters_com/Documents/Escrita%20Fiscal/Certificados?csf=1&web=1&e=mkAYSf" showManual={false} />
        </div>
      </div>
    </div>

    {/* Técnico & Operacional */}
    <div>
      <CategoryHeader title="Técnico & Operacional" icon={Database} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <EcossistemaCard
          icon={HardDrive}
          label="DW"
          desc="Acesso ao ambiente Domínio Web."
          href="https://www.dominioweb.com.br/"
          configAmbienteHref={SHAREPOINT_CONFIGURAR_AMBIENTE_DW}
        />
        <EcossistemaCard
          icon={RefreshCw}
          label="DW Prod → QED"
          desc="Transformar ambiente DW Prod em QED."
          href="https://trten.sharepoint.com/sites/TaxProfDominioContabil/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FTaxProfDominioContabil%2FShared%20Documents%2FGP%20%2D%20NE%2F%21FOLHA%2FDom%C3%ADnio%20Conta%20Digital%20e%20Benef%C3%ADcios%2FBanco%20de%20Dados%20Dom%C3%ADnio%20Beneficios%2FAlterar%20Chaves%20Registro&viewid=c2839c7f%2D4e41%2D45a6%2D8cd7%2Dcc8d30125ec8&csf=1&CID=78f32dfc%2D2e9a%2D4c6d%2D8d67%2D7afbf2a3e8ab&FolderCTID=0x01200067013C847CC85846A29921B2FF434418"
          manualHref="https://trten.sharepoint.com/:w:/r/sites/TaxProfDominioContabil/Shared%20Documents/GP%20-%20NE/!FOLHA/Dom%C3%ADnio%20Conta%20Digital%20e%20Benef%C3%ADcios/Banco%20de%20Dados%20Dom%C3%ADnio%20Beneficios/Alterar%20Chaves%20Registro/Utilizacao-alterar-chaves-Registro.docx?d=w4e60c49918a0440fb60b92b6910a1b97&csf=1&web=1&e=fX1jmJ"
          configAmbienteHref={SHAREPOINT_CONFIGURAR_AMBIENTE_DW}
        />
        <EcossistemaCard
          icon={ScrollText}
          label="Aplicação de Log"
          desc="Consulta e aplicação de logs operacionais."
          showAcessar={false}
          manualHref="https://dominiosistemas.github.io/Ferramenta-para-Suporte/"
        />
      </div>
    </div>

    {/* Conhecimento & Apoio */}
    <div>
      <CategoryHeader title="Conhecimento & Apoio" icon={BookOpen} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group bg-card rounded-2xl border border-border p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:shadow-lg hover:border-accent/30 hover:-translate-y-1">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center transition-colors group-hover:bg-accent/10">
            <GraduationCap size={30} strokeWidth={1.5} className="text-foreground transition-colors group-hover:text-accent" />
          </div>
          <h4 className="text-sm font-bold text-foreground">Central de Treinamentos</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">Cursos, trilhas e materiais de capacitação.</p>
          <div className="flex flex-col gap-2 w-full mt-auto">
            <a href="https://suporte.dominioatendimento.com/central/faces/central-solucoes-resultados.html?moduloSolucao=13" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent">
              <ExternalLink size={12} /> Central de Soluções
            </a>
            <a href="https://suporte.dominioatendimento.com/central/faces/central-solucoes-resultados.html?moduloSolucao=2&novaPesquisa=1&pagina=1" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent">
              <ExternalLink size={12} /> Treinamentos Escrita
            </a>
            <a href="https://trten-my.sharepoint.com/:f:/r/personal/richardson_correia_thomsonreuters_com/Documents/Escrita%20Fiscal/Treinamentos?csf=1&web=1&e=KOLQFT" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent">
              <ExternalLink size={12} /> Treinamento SharePoint
            </a>
          </div>
        </div>
        <div className="group bg-card rounded-2xl border border-border p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:shadow-lg hover:border-accent/30 hover:-translate-y-1">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center transition-colors group-hover:bg-accent/10">
            <FileText size={30} strokeWidth={1.5} className="text-foreground transition-colors group-hover:text-accent" />
          </div>
          <h4 className="text-sm font-bold text-foreground">Manuais</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">Documentação oficial e leiautes.</p>
          <div className="flex flex-col gap-2 w-full mt-auto">
            <a href="https://login.esocial.gov.br/login.aspx" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent">
              <ExternalLink size={12} /> Sped Fiscal
            </a>
            <a href="https://login.producaorestrita.esocial.gov.br/login.aspx" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent">
              <ExternalLink size={12} /> Sped ECF
            </a>
          </div>
        </div>
        <EcossistemaCard icon={Scale} label="ECONET" desc="Consultoria tributária e legislação trabalhista." href="https://www.econeteditora.com.br/" />
        <EcossistemaCard
          icon={Phone}
          label="LEFISC"
          desc="Consultoria tributária"
          href="https://www.lefisc.com.br/"
          manualHref="https://lefisc.com.br/telefones.html"
        />
      </div>
    </div>

    {/* Tabela de Contatos */}
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <Phone size={20} strokeWidth={1.5} className="text-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Principais Contatos</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Toque em <Plus className="inline h-3.5 w-3.5 align-text-bottom" strokeWidth={2} /> ao lado de cada área para ver <strong className="font-medium text-foreground">Gerentes</strong> e{" "}
        <strong className="font-medium text-foreground">Especialistas</strong>.
      </p>
      <div className="rounded-xl border border-border overflow-hidden">
        {CONTACT_AREAS.map((area) => (
          <ContactAreaCollapsible key={area} area={area} />
        ))}
      </div>
      <div className="bg-success rounded-xl px-4 py-3 flex items-start gap-2 mt-4">
        <Leaf className="text-success-foreground mt-0.5 flex-shrink-0" size={16} />
        <p className="text-success-foreground text-xs font-medium">
          Os contatos serão atualizados com as URLs do SharePoint em breve.
        </p>
      </div>
    </div>
  </div>
);

const StepInstalacoes = () => (
  <div className="animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Domínio */}
    <div className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
          <Globe size={22} strokeWidth={1.5} className="text-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Domínio</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">Acesse o sistema via Desktop ou Web.</p>
      <div className="flex flex-col gap-2 mt-auto">
        <a href="https://ftpdownload.dominiosistemas.com.br/atualizacao/contabil/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent">
          <RefreshCw size={16} /> Atualizações
          <ExternalLink size={14} className="ml-auto" />
        </a>
        <a href="https://download.dominiosistemas.com.br/instalacao/contabil/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent">
          <Monitor size={16} /> Download Desktop
          <Download size={14} className="ml-auto" />
        </a>
        <a href="https://www.dominioweb.com.br/logout" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent">
          <ExternalLink size={16} /> Acesso Web
        </a>
      </div>
      <div className="bg-success rounded-xl px-4 py-3 flex items-start gap-2 mt-2">
        <Leaf className="text-success-foreground mt-0.5 flex-shrink-0" size={16} />
        <p className="text-success-foreground text-xs font-medium">Prefira a versão Web para atualizações automáticas.</p>
      </div>
    </div>

    {/* Sharp */}
    <div className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
          <Settings size={22} strokeWidth={1.5} className="text-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Sharp</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">Instalador e arquivo de configuração.</p>
      <div className="flex flex-col gap-2 mt-auto">
        <a
          href="https://trten.sharepoint.com/:u:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Sharp%20Develop/SharpDevelop_4.4.1.9729_Setup.msi.7z?csf=1&web=1&e=KfqSzA"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <HardDrive size={16} /> Instalador
          <ExternalLink size={14} className="ml-auto" />
        </a>
        <a
          href="https://trten.sharepoint.com/:b:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Sharp%20Develop/SharpDevelop.pdf?csf=1&web=1&e=MKTWUl"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-accent"
        >
          <BookOpen size={16} /> Manual
          <ExternalLink size={14} className="ml-auto" />
        </a>
      </div>
      <div className="bg-success rounded-xl px-4 py-3 flex items-start gap-2 mt-2">
        <Leaf className="text-success-foreground mt-0.5 flex-shrink-0" size={16} />
        <p className="text-success-foreground text-xs font-medium">Execute o instalador como administrador.</p>
      </div>
    </div>

    {/* Apps */}
    <div className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
          <Package size={22} strokeWidth={1.5} className="text-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Instalação de Apps</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">Ferramentas auxiliares para o dia a dia.</p>
      <div className="flex flex-col gap-2 mt-auto">
        <a
          href="https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/FileZila?csf=1&web=1&e=Q9dvKl"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <Upload size={16} /> FileZilla FTP
          <ExternalLink size={14} className="ml-auto" />
        </a>
        <a
          href="https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/DukeCapture?csf=1&web=1&e=ONGTD3"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <Monitor size={16} /> DuckCapture
          <ExternalLink size={14} className="ml-auto" />
        </a>
        <a
          href="https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Gravador%20de%20Video?csf=1&web=1&e=oCi314"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <Video size={16} /> Gravador Video
          <ExternalLink size={14} className="ml-auto" />
        </a>
        <a
          href="https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Gerenciador%20de%20Download?csf=1&web=1&e=beo2pj"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <Cloud size={16} /> Backup Nuvem
          <ExternalLink size={14} className="ml-auto" />
        </a>
      </div>
    </div>

    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Exporta/Importa */}
      <div className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
            <Upload size={22} strokeWidth={1.5} className="text-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Exporta/Importa</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">Ferramentas de exportação e importação de dados.</p>
        <div className="flex flex-col gap-2 mt-auto">
          <a
            href="https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Exporta-Importa?csf=1&web=1&e=ZAfho0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <Upload size={16} /> Acessar pasta no SharePoint
            <ExternalLink size={14} className="ml-auto" />
          </a>
          <a
            href="https://trten.sharepoint.com/:w:/r/sites/TaxProfDominioContabil/_layouts/15/Doc.aspx?sourcedoc=%7B2ED521CA-0432-45CA-93B3-C9027AB1F69C%7D&file=Exporta%20Importa.docx&action=default&mobileredirect=true&DefaultItemOpen=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <BookOpen size={16} /> Manual Exporta/Importa
            <ExternalLink size={14} className="ml-auto" />
          </a>
        </div>
      </div>

      {/* Diversos */}
      <div className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
            <Puzzle size={22} strokeWidth={1.5} className="text-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Diversos</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">Aplicativos diversos de medição de tempo, captura de tela e cronômetro</p>
        <div className="flex flex-col gap-2 mt-auto">
          <a
            href="https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Diversos?csf=1&web=1&e=hcIhNv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <Upload size={16} /> Acessar
            <ExternalLink size={14} className="ml-auto" />
          </a>
        </div>
      </div>
    </div>

    {/* Versões */}
    <div className="md:col-span-3 bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
          <Database size={22} strokeWidth={1.5} className="text-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Versões do Sistema</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Pastas de atualização publicadas pelo Domínio (lista atualizada ao abrir esta etapa). A última linha corresponde à pasta mais recente e aparece em destaque laranja.
      </p>
      <VersoesDoSistemaBlock />
      <div className="bg-success rounded-xl px-4 py-3 flex items-start gap-2 mt-2">
        <Leaf className="text-success-foreground mt-0.5 flex-shrink-0" size={16} />
        <p className="text-success-foreground text-xs font-medium">Recomendamos sempre usar a pasta mais recente.</p>
      </div>
    </div>
  </div>
);

const StepBaseConhecimento = () => (
  <div className="animate-fade-in">
    <div className="bg-card rounded-2xl border border-border p-8 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
          <Library size={22} strokeWidth={1.5} className="text-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          Base de <span className="text-accent">Conhecimento</span>
        </h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mt-3">
        Consulte os manuais oficiais para garantir a conformidade dos processos.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {[
        {
          icon: FileText,
          label: "Manuais SA",
          desc: "Soluções de Atendimento — documentação completa dos processos e fluxos de atendimento ao cliente.",
          action: "Abrir PDF",
          actionIcon: Download,
          version: "v3.2",
          date: "Mar 2026",
          href: "https://trten.sharepoint.com/:b:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Manuais%20Escrita/Manual%20de%20PSAI%201.3.5%20(1).pdf?csf=1&web=1&e=Iefhdc",
        },
        {
          icon: FileText,
          label: "Manuais Janelas",
          desc: "Soluções de Atendimento — documentação completa dos processos e fluxos de atendimento ao cliente.",
          action: "Abrir PDF",
          actionIcon: Download,
          version: "v3.2",
          date: "Mar 2026",
          href: "https://trten.sharepoint.com/:b:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Manuais%20Escrita/Manual%20de%20Janelas%201.1.pdf?csf=1&web=1&e=nfXGNo",
        },
        {
          icon: BookOpen,
          label: "Manuais NE",
          desc: "Notas Explicativas e Normativas — referência rápida para legislação e regras de cálculo.",
          action: "Abrir PDF",
          actionIcon: Download,
          version: "v2.8",
          date: "Fev 2026",
          href: "https://trten.sharepoint.com/:b:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Manuais%20Escrita/valida%C3%A7%C3%A3o%20NE.pdf?csf=1&web=1&e=YuPO60",
          secondaryAction: "Classificar NE",
          secondaryActionIcon: ExternalLink,
          secondaryHref:
            "https://trten-my.sharepoint.com/:x:/r/personal/richardson_correia_thomsonreuters_com/Documents/Processos%20e%20Regras%20para%20NEs%20Graves.xlsx?d=w8e1a0737a4b549078cdba15676054b95&csf=1&web=1&e=NMmjdj",
        },
        {
          icon: Globe,
          label: "SGSUN",
          desc: "Sistema de suporte e gestão unificada — acesse o portal ou consulte o manual de uso.",
          action: "Acessar Sistema",
          actionIcon: ExternalLink,
          version: "v1.5",
          date: "Jan 2026",
        },
      ].map((item, i) => {
        const Icon = item.icon;
        const ActionIcon = item.actionIcon;
        return (
          <div key={i} className="group bg-card rounded-2xl border border-border p-8 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:border-accent/30 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center transition-colors group-hover:bg-accent/10">
                  <Icon size={28} strokeWidth={1.5} className="text-foreground transition-colors group-hover:text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{item.label}</h3>
                  <Badge variant="secondary" className="mt-1 text-[10px] gap-1 px-2 py-0.5">
                    <CalendarDays size={10} />
                    {item.version} · {item.date}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
            <div className="mt-auto flex flex-col gap-2">
              <a
                href={"href" in item && item.href ? item.href : "#"}
                target={"href" in item && item.href ? "_blank" : undefined}
                rel={"href" in item && item.href ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
              >
                <ActionIcon size={16} /> {item.action}
              </a>
              {"secondaryAction" in item && item.secondaryAction && "secondaryHref" in item && item.secondaryHref ? (
                <a
                  href={item.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-accent"
                >
                  {"secondaryActionIcon" in item && item.secondaryActionIcon ? <item.secondaryActionIcon size={16} /> : <ExternalLink size={16} />}
                  {item.secondaryAction}
                </a>
              ) : null}
            </div>
            <div className="bg-success rounded-xl px-4 py-3 flex items-start gap-2">
              <Leaf className="text-success-foreground mt-0.5 flex-shrink-0" size={14} />
              <p className="text-success-foreground text-xs font-medium">Versão Atualizada</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const StepTech = () => (
  <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Desenvolvimento */}
    <div className="bg-card rounded-2xl border border-border p-8 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
          <Database size={22} strokeWidth={1.5} className="text-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Comandos SQL</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Referência rápida de queries e scripts SQL utilizados na gestão de escrita de pagamento.
      </p>
      <a href="https://trten-my.sharepoint.com/personal/sabrina_guessi_thomsonreuters_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsabrina%5Fguessi%5Fthomsonreuters%5Fcom%2FDocuments%2FTREINAMENTO%20FUNCION%C3%81RIOS%20NOVOS%2FCOMANDOSs&viewid=7309f27f%2D1d49%2D48ce%2Da23b%2D899f2b94c3fb&CT=1754672324831&OR=OWA%2DNT%2DMail&CID=359e6537%2De6da%2D6605%2D9c64%2D77496e398372&sharingv2=true&fromShare=true&at=9&FolderCTID=0x0120002BAEA7F2C7580140AA6707D43E76E455&view=0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent mt-auto">
        <BookOpen size={16} /> Acessar Documentação
        <ExternalLink size={14} className="ml-auto" />
      </a>
      <div className="bg-success rounded-xl px-4 py-3 flex items-start gap-2 mt-2">
        <Leaf className="text-success-foreground mt-0.5 flex-shrink-0" size={16} />
        <p className="text-success-foreground text-xs font-medium">Sempre teste queries em ambiente de homologação primeiro.</p>
      </div>
    </div>

    {/* Extensões */}
    <div className="bg-card rounded-2xl border border-border p-8 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
          <Puzzle size={22} strokeWidth={1.5} className="text-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Extensões de Navegador</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Extensões recomendadas que auxiliam no trabalho diário com a gestão de escrita.
      </p>
      <div className="flex flex-col gap-2 mt-auto">
        {["JSON Formatter", "React DevTools", "ColorZilla"].map((ext, i) => (
          <a key={i} href="#" className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent">
            <Puzzle size={16} /> {ext}
            <ExternalLink size={14} className="ml-auto" />
          </a>
        ))}
      </div>
    </div>

    {/* IAs */}
    <div className="md:col-span-2 bg-card rounded-2xl border border-border p-8 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
          <Brain size={22} strokeWidth={1.5} className="text-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">IAs Utilizadas</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Inteligências artificiais integradas ao produto para apoiar o dia a dia.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
        {[
          { name: "Validação de Estrutura das PSAIs de NEs do Legado", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/d4734fc4-66e0-4ec1-a704-b09ef3234634?sidebar=instructions_auto" },
          { name: "Assistente educacional", url: "https://dataandanalytics.int.thomsonreuters.com/ai-platform/ai-chains/use/c09954de-9563-49f9-a898-c452ff48a562" },
          { name: "Criar Rubrica através do assistente de IA", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/52d6965b-c37-49cc-8ce2-ce996fd55ece?sidebar=instructions_auto" },
          { name: "Agrupamento SAIs", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/3caad024-4894-4a6c-9bde-3a7692d450c4?sidebar=instructions_auto" },
          { name: "Análise das irregularidades", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/995e98f3-98ba-4ea3-8556-442693eddce?sidebar=instructions_auto" },
          { name: "Meu Prompt", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/f5fd1d2c-e0bb-4a9c-a494-3c3a42cb6969?sidebar=instructions" },
          { name: "IGOR - Instrutor de Geração e Otimização de Roteiros", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/34b45254-f1ac-4f0d-a7bc-74aaaee96e88?sidebar=instructions" },
          { name: "Assistente de Análise de SAIs - Escrita de Pagamento - EXCEL", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/46745cc7-263a-4f00-af8a-f4027e3cf3b5" },
          { name: "CHAIN AI TRIA - DOMINIO", url: "https://dataandanalytics.int.thomsonreuters.com/ai-platform/ai-chains/use/3679317a-l205-4c29-a847-08c8c93fb592" },
          { name: "Rubricas com Fórmulas", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/b653d9c8-da78-4860-9347-e08a8c97c145?sidebar=instructions_auto" },
          { name: "Tradução - Inglês", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/37ec1afe-fd69-44b6-95ae-bef608ce57d1" },
          { name: "Valida PSAI - 200k Tokens", url: "https://dataandanalytics.int.thomsonreuters.com/ai-platform/ai-chains/use/d80f55af-7d45-420c-adc1-065743520fd4" },
          { name: "Definição", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/07a4a529-30ca-4d64-a813-2cfad0848243" },
          { name: "Ask GPT 5.2", url: "https://dataandanalytics.int.thomsonreuters.com/ai-platform/ai-experiences/use/cd8d90f6-ce37-4e69-9433-92e658a33675" },
          { name: "Metaprompting - Generate your Prompt", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-experiences/use/53737406-b11d-4b13-afd2-57e1e33c1c49?sidebar=instructions_auto" },
          { name: "Metaprompting - Fix your Prompt", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-experiences/use/c67e6f34c-5443-454b-b800-8a7cd4ace2a5?sidebar=instructions_auto" },
          { name: "Criação de exemplo para SAI de definição", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/50d5759e-29f6-41e3-b38a-8182152ff63b?sidebar=instructions_auto" },
          { name: "Inicio de PSAI avaliando primeiros pontos", url: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/b3e1bc25-a947-4e2e-9f56-dc8f7fbabf1f?sidebar=instructions_auto" },
        ].map((item, i) => (
          <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10 hover:text-accent">
            <Brain size={14} className="flex-shrink-0" /> <span className="truncate">{item.name}</span>
            <ExternalLink size={12} className="ml-auto flex-shrink-0" />
          </a>
        ))}
      </div>
      <div className="bg-success rounded-xl px-4 py-3 flex items-start gap-2 mt-2">
        <Leaf className="text-success-foreground mt-0.5 flex-shrink-0" size={16} />
        <p className="text-success-foreground text-xs font-medium">Use as IAs como apoio — sempre valide os resultados.</p>
      </div>
    </div>

    {/* Checklist */}
    <div className="bg-card rounded-2xl border border-border p-8 flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
          <CheckSquare size={22} strokeWidth={1.5} className="text-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Checklist de Conclusão</h3>
      </div>
      <div className="bg-success rounded-xl px-4 py-3 flex items-start gap-2">
        <Leaf className="text-success-foreground mt-0.5 flex-shrink-0" size={16} />
        <p className="text-success-foreground text-xs font-medium">Complete todas as etapas para finalizar o onboarding.</p>
      </div>
    </div>
  </div>
);

const stepComponents = [StepBoasVindas, StepEcossistema, StepInstalacoes, StepBaseConhecimento, StepTech, QuadroAvisos];

/* ─── Main Page ─── */

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0);
  const ActiveContent = stepComponents[activeStep];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero + Stepper */}
      <section className="relative overflow-hidden bg-header px-6 pt-6 pb-24 md:pb-28">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 15% 10%, hsl(150 30% 18% / 0.9), transparent 60%)' }} />

        <div className="container max-w-5xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <BarChart3 className="text-accent" size={32} />
            <span className="text-primary-foreground/70 font-semibold text-sm tracking-widest uppercase">
              Gestão de Produto Escrita
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight">
            Onboarding <span className="text-accent">Gestão Escrita</span>
          </h1>
          <p className="mt-4 text-primary-foreground/60 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Construindo hoje o <span className="text-[hsl(100_20%_72%)] font-semibold">produto do amanhã.</span>
          </p>
          <a
            href="#"
            className="inline-block mt-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm px-8 py-3 rounded-lg transition-colors"
          >
            Saiba mais
          </a>
        </div>
      </section>

      {/* Stepper floating */}
      <div className="px-6 -mt-12 relative z-20">
        <div className="container max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
            <div className="flex items-center justify-between relative">
              {/* Connecting line */}
              <div className="absolute top-6 left-[10%] right-[10%] h-px bg-border" />

              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === activeStep;
                const isDone = i < activeStep;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="flex flex-col items-center relative z-10 group cursor-pointer"
                    style={{ width: `${100 / steps.length}%` }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                        ${isActive
                          ? "border-2 border-accent bg-card scale-110 shadow-[0_0_12px_hsl(25_95%_53%/0.35)]"
                          : isDone
                            ? "border-2 border-accent/50 bg-accent/10"
                            : "border-2 border-border bg-card group-hover:border-accent/40 group-hover:scale-105"
                        }`}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className={`transition-colors ${isActive ? "text-accent" : isDone ? "text-accent/70" : "text-muted-foreground group-hover:text-accent"}`}
                      />
                    </div>
                    <span
                      className={`mt-2 text-xs font-semibold transition-colors leading-tight hidden sm:block
                        ${isActive ? "text-accent" : isDone ? "text-accent/70" : "text-muted-foreground group-hover:text-accent"}`}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <section className="px-6 py-12 md:py-16">
        <div className="container max-w-5xl mx-auto">
          <ActiveContent key={activeStep} />
        </div>
      </section>

      <Tris onNavigate={(step) => setActiveStep(step)} />
    </div>
  );
};

export default Onboarding;
