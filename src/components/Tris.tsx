import { useState, useRef, useEffect } from "react";
import { X, Send, ExternalLink, User } from "lucide-react";

const TrisIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    {/* Head */}
    <rect x="22" y="8" width="56" height="42" rx="16" stroke="currentColor" strokeWidth="4" fill="hsl(25 95% 53% / 0.1)" />
    {/* Ears */}
    <circle cx="18" cy="29" r="8" stroke="currentColor" strokeWidth="3.5" fill="hsl(25 95% 53% / 0.15)" />
    <circle cx="82" cy="29" r="8" stroke="currentColor" strokeWidth="3.5" fill="hsl(25 95% 53% / 0.15)" />
    {/* Antenna */}
    <line x1="50" y1="8" x2="50" y2="2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="1" r="3" fill="hsl(25 95% 53%)" />
    {/* Eyes */}
    <circle cx="38" cy="26" r="7" fill="currentColor" />
    <circle cx="62" cy="26" r="7" fill="currentColor" />
    <circle cx="36" cy="23" r="2.5" fill="white" />
    <circle cx="60" cy="23" r="2.5" fill="white" />
    <circle cx="40" cy="27" r="1.2" fill="white" />
    <circle cx="64" cy="27" r="1.2" fill="white" />
    {/* Smile */}
    <path d="M40 35 Q50 42 60 35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Blush */}
    <circle cx="32" cy="34" r="3.5" fill="hsl(25 95% 53% / 0.3)" />
    <circle cx="68" cy="34" r="3.5" fill="hsl(25 95% 53% / 0.3)" />
    {/* Body */}
    <path d="M30 52 Q30 56 34 58 L34 78 Q34 84 40 84 L60 84 Q66 84 66 78 L66 58 Q70 56 70 52 Z" stroke="currentColor" strokeWidth="3.5" fill="hsl(25 95% 53% / 0.08)" />
    {/* Body detail */}
    <rect x="44" y="62" width="12" height="14" rx="3" stroke="currentColor" strokeWidth="2.5" fill="hsl(25 95% 53% / 0.15)" />
    {/* Arms */}
    <path d="M30 58 Q22 62 20 70" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M70 58 Q78 62 80 70" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <circle cx="20" cy="72" r="3" fill="hsl(25 95% 53% / 0.2)" stroke="currentColor" strokeWidth="2" />
    <circle cx="80" cy="72" r="3" fill="hsl(25 95% 53% / 0.2)" stroke="currentColor" strokeWidth="2" />
    {/* Feet */}
    <ellipse cx="42" cy="88" rx="6" ry="4" stroke="currentColor" strokeWidth="2.5" fill="hsl(25 95% 53% / 0.12)" />
    <ellipse cx="58" cy="88" rx="6" ry="4" stroke="currentColor" strokeWidth="2.5" fill="hsl(25 95% 53% / 0.12)" />
    {/* Hair bow */}
    <path d="M68 12 Q74 6 76 12 Q74 14 68 12Z" fill="hsl(25 95% 53%)" stroke="currentColor" strokeWidth="1.5" />
    <path d="M76 12 Q82 6 84 12 Q82 14 76 12Z" fill="hsl(25 95% 53%)" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="76" cy="12" r="2" fill="currentColor" />
  </svg>
);

interface KnowledgeItem {
  keywords: string[];
  title: string;
  description: string;
  href?: string;
  step?: number;
  stepLabel?: string;
}

const knowledge: KnowledgeItem[] = [
  // Rotina & Gestão
  { keywords: ["ponto", "my time", "mytime", "jornada", "horario", "horário", "registro de ponto"], title: "My Time", description: "Registro e gestão de ponto e jornada de trabalho.", href: "https://mytime.thomsonreuters.com/mytime/MyTimeHome.htm", step: 1, stepLabel: "Workspace" },
  { keywords: ["folha certa", "folhacerta"], title: "Folha Certa", description: "Acesso ao portal e recursos do Folha Certa.", href: "https://portal.folhacerta.com/login/", step: 1, stepLabel: "Workspace" },
  { keywords: ["registro de atividades", "atividades diárias", "registro atividades"], title: "Registro de Atividades", description: "Aplicativo para registrar as atividades diárias.", href: "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Registro%20de%20Atividades?csf=1&web=1&e=yqFDRy", step: 1, stepLabel: "Workspace" },
  { keywords: ["sgd", "sistema sgd", "gestão diária"], title: "SGD", description: "SGD — aplicativo e manual na pasta Aplicativos/Manuais SGD (SharePoint Escrita Fiscal).", href: "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/SGD?csf=1&web=1", step: 1, stepLabel: "Workspace" },
  { keywords: ["workday", "work day", "rh", "recursos humanos", "gestão de pessoas", "finanças operações"], title: "WorkDay", description: "Plataforma que integra gestão de pessoas, finanças e operações (Thomson Reuters).", href: "https://wd5.myworkday.com/thomsonreuters/d/home.htmld", step: 1, stepLabel: "Workspace" },
  { keywords: ["solicitação serviço", "solicitacao servico", "hardware", "periféricos", "perifericos", "troca equipamento", "ti", "it"], title: "Solicitação Serviço", description: "Solicitar troca de hardware e periféricos.", step: 1, stepLabel: "Workspace" },
  { keywords: ["myexpenses", "my expenses", "reembolso", "reembolsos", "notas fiscais", "despesas"], title: "MyExpenses", description: "Solicitação de reembolso conforme notas fiscais.", step: 1, stepLabel: "Workspace" },
  { keywords: ["dailyplan", "daily plan", "psai", "planejamento diário", "lista psai", "calyplan", "caly plan"], title: "DailyPlan", description: "Planejamento e controle diário de análises PSAI, SS, SAI e NE (lista no SharePoint).", href: "https://trten-my.sharepoint.com/:x:/r/personal/marielli_neves_thomsonreuters_com/_layouts/15/Doc.aspx?sourcedoc=%7B3B381E02-6C54-4782-8DC6-38CAE3A1D96A%7D&file=Lista%20de%20PSAI%27s%20a%20definir.xlsx&fromShare=true&action=default&mobileredirect=true", step: 1, stepLabel: "Workspace" },
  { keywords: ["metas", "pontuação", "pontuações", "meta"], title: "Metas & Pontuações", description: "Acompanhe metas individuais e do time.", step: 1, stepLabel: "Workspace" },
  { keywords: ["sharepoint", "documentos", "arquivos", "repositório", "escrita fiscal", "taxprofdominiocontabil"], title: "SharePoint", description: "Pasta Escrita Fiscal no site TaxProf Dominio Contabil.", href: "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal?csf=1&web=1&e=3B2Eha", step: 1, stepLabel: "Workspace" },
  { keywords: ["certificado", "certificados", "contador"], title: "Certificados", description: "Subpasta Certificados em Escrita Fiscal (emissão e consulta).", href: "https://trten-my.sharepoint.com/:f:/r/personal/richardson_correia_thomsonreuters_com/Documents/Escrita%20Fiscal/Certificados?csf=1&web=1&e=mkAYSf", step: 1, stepLabel: "Workspace" },

  // Técnico & Operacional
  { keywords: ["dw", "domínio web", "dominio web", "data warehouse", "analítico"], title: "DW", description: "Acesso ao ambiente Domínio Web.", href: "https://www.dominioweb.com.br/", step: 1, stepLabel: "Workspace" },
  { keywords: ["dw prod", "qed", "ambiente"], title: "DW Prod → QED", description: "Transformar ambiente DW Prod em QED.", href: "https://trten.sharepoint.com/sites/TaxProfDominioContabil/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FTaxProfDominioContabil%2FShared%20Documents%2FGP%20%2D%20NE%2F%21FOLHA%2FDom%C3%ADnio%20Conta%20Digital%20e%20Benef%C3%ADcios%2FBanco%20de%20Dados%20Dom%C3%ADnio%20Beneficios%2FAlterar%20Chaves%20Registro&viewid=c2839c7f%2D4e41%2D45a6%2D8cd7%2Dcc8d30125ec8&csf=1&CID=78f32dfc%2D2e9a%2D4c6d%2D8d67%2D7afbf2a3e8ab&FolderCTID=0x01200067013C847CC85846A29921B2FF434418", step: 1, stepLabel: "Workspace" },
  { keywords: ["log", "logs", "aplicação de log", "ferramenta suporte"], title: "Aplicação de Log", description: "Consulta e aplicação de logs operacionais.", href: "https://dominiosistemas.github.io/Ferramenta-para-Suporte/", step: 1, stepLabel: "Workspace" },

  // Conhecimento & Apoio
  { keywords: ["treinamento", "treinamentos", "capacitação", "curso", "cursos"], title: "Central de Treinamentos", description: "Cursos, trilhas e materiais de capacitação. Inclui Central de Soluções, Treinamentos Escrita e Treinamento SharePoint.", step: 1, stepLabel: "Workspace" },
  { keywords: ["treinamento escrita", "treinamentos escrita", "central escrita", "módulo escrita"], title: "Treinamentos Escrita", description: "Central de Soluções — módulo Escrita, Importação Padrão (Domínio).", href: "https://suporte.dominioatendimento.com/central/faces/central-solucoes-resultados.html?moduloSolucao=2&novaPesquisa=1&pagina=1", step: 1, stepLabel: "Workspace" },
  { keywords: ["treinamento sharepoint", "treinamentos sharepoint", "pasta treinamentos"], title: "Treinamento SharePoint", description: "Pasta Treinamentos em Escrita Fiscal (OneDrive Richardson Correia).", href: "https://trten-my.sharepoint.com/:f:/r/personal/richardson_correia_thomsonreuters_com/Documents/Escrita%20Fiscal/Treinamentos?csf=1&web=1&e=KOLQFT", step: 1, stepLabel: "Workspace" },
  { keywords: ["esocial", "e-social", "leiaute", "sped fiscal", "sped ecf", "produção restrita", "manuais"], title: "Manuais", description: "Documentação oficial e leiautes (atalhos Sped Fiscal e Sped ECF / eSocial).", href: "https://login.esocial.gov.br/login.aspx", step: 1, stepLabel: "Workspace" },
  { keywords: ["econet", "tributária", "legislação", "trabalhista", "consultoria"], title: "ECONET", description: "Consultoria tributária e legislação trabalhista.", href: "https://www.econeteditora.com.br/", step: 1, stepLabel: "Workspace" },
  { keywords: ["contato", "contatos", "telefone", "email", "responsável"], title: "Principais Contatos", description: "Tabela de contatos por área/assunto.", step: 1, stepLabel: "Workspace" },

  // Instalações
  { keywords: ["dominio", "domínio", "desktop", "web", "atualização", "atualizações", "instalação dominio"], title: "Domínio", description: "Atualizações, Download Desktop e Acesso Web do sistema Domínio.", href: "https://www.dominioweb.com.br/logout", step: 2, stepLabel: "Instalações" },
  { keywords: ["sharp", "instalador", "configuração", "sharpdevelop", "manual sharp"], title: "Sharp", description: "Instalador SharpDevelop (.msi.7z) e manual PDF no SharePoint Escrita Fiscal / Sharp Develop.", href: "https://trten.sharepoint.com/:u:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Sharp%20Develop/SharpDevelop_4.4.1.9729_Setup.msi.7z?csf=1&web=1&e=KfqSzA", step: 2, stepLabel: "Instalações" },
  { keywords: ["filezilla", "ftp", "apps", "aplicativos"], title: "Instalação de Apps", description: "FileZilla FTP e outras ferramentas (card Instalação de Apps no portal).", href: "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/FileZila?csf=1&web=1&e=Q9dvKl", step: 2, stepLabel: "Instalações" },
  { keywords: ["duckcapture", "duck capture", "duke capture", "captura tela"], title: "DuckCapture", description: "Pasta DuckCapture (SharePoint Escrita Fiscal / Aplicativos).", href: "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/DukeCapture?csf=1&web=1&e=ONGTD3", step: 2, stepLabel: "Instalações" },
  { keywords: ["gravador video", "gravador de vídeo", "gravador de video", "screen record", "gravar tela"], title: "Gravador Video", description: "Pasta Gravador de Video (SharePoint Escrita Fiscal / Aplicativos).", href: "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Gravador%20de%20Video?csf=1&web=1&e=oCi314", step: 2, stepLabel: "Instalações" },
  { keywords: ["backup nuvem", "backup", "gerenciador de download", "nuvem", "download nuvem"], title: "Backup Nuvem", description: "Pasta Gerenciador de Download (SharePoint Escrita Fiscal / Aplicativos).", href: "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Gerenciador%20de%20Download?csf=1&web=1&e=beo2pj", step: 2, stepLabel: "Instalações" },
  { keywords: ["exporta", "importa", "exportação", "importação", "dados", "exporta-importa"], title: "Exporta/Importa", description: "Pasta Exporta-Importa (Aplicativos) no SharePoint Escrita Fiscal e manual.", href: "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Exporta-Importa?csf=1&web=1&e=ZAfho0", step: 2, stepLabel: "Instalações" },
  { keywords: ["diversos", "cronômetro", "cronometro", "aplicativos diversos", "apps diversos", "medição de tempo", "captura de tela"], title: "Diversos", description: "Aplicativos diversos de medição de tempo, captura de tela e cronômetro — pasta no SharePoint (Aplicativos/Diversos).", href: "https://trten.sharepoint.com/:f:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Diversos?csf=1&web=1&e=hcIhNv", step: 2, stepLabel: "Instalações" },
  { keywords: ["versão", "versões", "sistema", "download versão", "atualização contabil", "atualização contábil", "ftp dominio"], title: "Versões do Sistema", description: "Índice atualizado das pastas em download.dominiosistemas.com.br/atualizacao/contabil/ (última pasta em destaque no portal).", href: "https://download.dominiosistemas.com.br/atualizacao/contabil/", step: 2, stepLabel: "Instalações" },

  // Manuais
  { keywords: ["manual sa", "manuais sa", "soluções de atendimento", "atendimento cliente", "manual psai"], title: "Manuais SA", description: "Manual de PSAI (PDF) e documentação Soluções de Atendimento.", href: "https://trten.sharepoint.com/:b:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Manuais%20Escrita/Manual%20de%20PSAI%201.3.5%20(1).pdf?csf=1&web=1&e=Iefhdc", step: 3, stepLabel: "Manuais" },
  { keywords: ["manual janelas", "manuais janelas", "janelas sa", "manual de janelas"], title: "Manuais Janelas", description: "Manual de Janelas (PDF) — Manuais Escrita no SharePoint.", href: "https://trten.sharepoint.com/:b:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Manuais%20Escrita/Manual%20de%20Janelas%201.1.pdf?csf=1&web=1&e=nfXGNo", step: 3, stepLabel: "Manuais" },
  { keywords: ["manual ne", "manuais ne", "notas explicativas", "normativas", "cálculo", "validação ne", "validacao ne"], title: "Manuais NE", description: "PDF Validação NE — Notas Explicativas e Normativas (Manuais Escrita).", href: "https://trten.sharepoint.com/:b:/r/sites/TaxProfDominioContabil/Shared%20Documents/Escrita%20Fiscal/Aplicativos/Manuais%20Escrita/valida%C3%A7%C3%A3o%20NE.pdf?csf=1&web=1&e=YuPO60", step: 3, stepLabel: "Manuais" },
  { keywords: ["classificar ne", "classificação ne", "ne graves", "processos e regras ne"], title: "Classificar NE", description: "Planilha Processos e Regras para NEs Graves (OneDrive Richardson Correia).", href: "https://trten-my.sharepoint.com/:x:/r/personal/richardson_correia_thomsonreuters_com/Documents/Processos%20e%20Regras%20para%20NEs%20Graves.xlsx?d=w8e1a0737a4b549078cdba15676054b95&csf=1&web=1&e=NMmjdj", step: 3, stepLabel: "Manuais" },
  { keywords: ["sgsun", "suporte", "gestão unificada"], title: "SGSUN", description: "Sistema de suporte e gestão unificada.", step: 3, stepLabel: "Manuais" },

  // Tech
  { keywords: ["sql", "query", "queries", "comandos", "banco"], title: "Comandos SQL", description: "Referência rápida de queries e scripts SQL.", step: 4, stepLabel: "Tech" },
  { keywords: ["extensão", "extensões", "navegador", "json formatter", "react devtools", "colorzilla"], title: "Extensões de Navegador", description: "JSON Formatter, React DevTools, ColorZilla.", step: 4, stepLabel: "Tech" },
  { keywords: ["checklist", "conclusão", "finalizar"], title: "Checklist de Conclusão", description: "Complete todas as etapas para finalizar o onboarding.", step: 4, stepLabel: "Tech" },

  // IAs
  { keywords: ["ia", "ias", "inteligência artificial", "ai", "assistente"], title: "IAs Utilizadas", description: "16 IAs disponíveis incluindo IGOR, Chain AI Tria, Ask GPT, Metaprompting e mais.", step: 4, stepLabel: "Tech" },
  { keywords: ["igor", "roteiro", "roteiros"], title: "IGOR", description: "Instrutor de Geração e Otimização de Roteiros.", href: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/34b45254-f1ac-4f0d-a7bc-74aaaee96e88?sidebar=instructions", step: 4, stepLabel: "Tech" },
  { keywords: ["rubrica", "rubricas", "fórmula", "fórmulas"], title: "Rubricas com Fórmulas", description: "IA para análise de rubricas com fórmulas.", href: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/b653d9c8-da78-4860-9347-e08a8c97c145?sidebar=instructions_auto", step: 4, stepLabel: "Tech" },
  { keywords: ["tradução", "traduzir", "inglês", "ingles"], title: "Tradução - Inglês", description: "IA para tradução de textos para inglês.", href: "https://aiplatform.thomsonreuters.com/ai-platform/ai-chains/use/37ec1afe-fd69-44b6-95ae-bef608ce57d1", step: 4, stepLabel: "Tech" },
  { keywords: ["gpt", "ask gpt", "chat gpt"], title: "Ask GPT 5.2", description: "Acesso ao GPT para perguntas e respostas.", href: "https://dataandanalytics.int.thomsonreuters.com/ai-platform/ai-experiences/use/cd8d90f6-ce37-4e69-9433-92e658a33675", step: 4, stepLabel: "Tech" },
  { keywords: ["psai", "valida psai", "validação", "tokens"], title: "Valida PSAI - 200k Tokens", description: "Validação de PSAIs com suporte a 200k tokens.", href: "https://dataandanalytics.int.thomsonreuters.com/ai-platform/ai-chains/use/d80f55af-7d45-420c-adc1-065743520fd4", step: 4, stepLabel: "Tech" },
  { keywords: ["chain", "tria", "dominio ia"], title: "CHAIN AI TRIA - DOMINIO", description: "IA de triagem do Domínio.", href: "https://dataandanalytics.int.thomsonreuters.com/ai-platform/ai-chains/use/3679317a-l205-4c29-a847-08c8c93fb592", step: 4, stepLabel: "Tech" },
  { keywords: ["metaprompting", "prompt", "gerar prompt", "fix prompt"], title: "Metaprompting", description: "Gere ou corrija seus prompts para as IAs.", href: "https://aiplatform.thomsonreuters.com/ai-platform/ai-experiences/use/53737406-b11d-4b13-afd2-57e1e33c1c49?sidebar=instructions_auto", step: 4, stepLabel: "Tech" },

  // Geral
  { keywords: ["onboarding", "começar", "inicio", "início", "novo", "bem vindo", "boas vindas"], title: "Onboarding", description: "Comece aqui! Conheça a história e a cultura do time de Gestão de Produto Escrita.", step: 0, stepLabel: "Onboarding" },
  { keywords: ["escrita", "pagamento", "escrita de pagamento", "gestão escrita"], title: "Gestão de Produto Escrita", description: "Portal completo de onboarding da equipe de Gestão de Produto Escrita.", step: 0, stepLabel: "Onboarding" },
];

function searchKnowledge(query: string): KnowledgeItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const scored = knowledge.map((item) => {
    let score = 0;
    for (const kw of item.keywords) {
      if (q.includes(kw)) score += 3;
      else if (kw.includes(q)) score += 2;
      else {
        const words = q.split(/\s+/);
        for (const w of words) {
          if (w.length >= 3 && kw.includes(w)) score += 1;
        }
      }
    }
    if (item.title.toLowerCase().includes(q)) score += 4;
    if (item.description.toLowerCase().includes(q)) score += 1;
    return { item, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => s.item);
}

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  results?: KnowledgeItem[];
}

const GREETING: ChatMessage = {
  role: "assistant",
  text: "Olá! Sou o Tris, seu assistente do portal de onboarding. Digite o que procura e te ajudo a encontrar!",
};

interface TrisProps {
  onNavigate?: (step: number) => void;
}

const Tris = ({ onNavigate }: TrisProps) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSend = () => {
    const q = input.trim();
    if (!q) return;

    const userMsg: ChatMessage = { role: "user", text: q };
    const results = searchKnowledge(q);

    const assistantMsg: ChatMessage = results.length > 0
      ? { role: "assistant", text: `Encontrei ${results.length} resultado${results.length > 1 ? "s" : ""} para "${q}":`, results }
      : { role: "assistant", text: `Não encontrei resultados para "${q}". Tente buscar por: ponto, domínio, eSocial, treinamento, IA, SQL, manuais, instalação...` };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          open
            ? "bg-muted text-foreground rotate-0"
            : "bg-accent text-accent-foreground hover:scale-110"
        }`}
        aria-label="Abrir Tris"
      >
        {open ? <X size={24} /> : <TrisIcon size={32} />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="bg-header px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
              <TrisIcon size={28} className="text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-primary-foreground">Tris</h3>
              <p className="text-[10px] text-primary-foreground/60">Thomson Reuters Intelligent Support</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0" style={{ maxHeight: "360px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrisIcon size={20} className="text-accent" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.role === "user" ? "order-first" : ""}`}>
                  <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                  {msg.results && (
                    <div className="mt-2 space-y-2">
                      {msg.results.map((r, j) => (
                        <div key={j} className="bg-secondary rounded-xl p-3 border border-border">
                          <p className="text-xs font-bold text-foreground">{r.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{r.description}</p>
                          <div className="flex gap-2 mt-2">
                            {r.href && (
                              <a href={r.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline">
                                <ExternalLink size={10} /> Abrir link
                              </a>
                            )}
                            {r.step !== undefined && onNavigate && (
                              <button
                                onClick={() => { onNavigate(r.step!); setOpen(false); }}
                                className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                              >
                                → Ir para {r.stepLabel}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={14} className="text-accent" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-4 py-3">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="O que você procura?"
                className="flex-1 bg-secondary rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/30"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center transition-colors hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Tris;
