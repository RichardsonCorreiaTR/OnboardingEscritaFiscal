import { useState, useEffect } from "react";
import { MessageSquarePlus, Tag, Clock, ExternalLink, Megaphone, Filter } from "lucide-react";

const REPO = "RichardsonCorreiaTR/OnboardingEscritaFiscal";
const CATEGORIES = [
  "Informativos", "Reforma Tributária", "PGDAS",
  "Legislação", "Dúvidas", "Dicas", "Processos", "Geral",
];

const CATEGORY_COLORS: Record<string, string> = {
  Informativos: "bg-sky-100 text-sky-800 border-sky-200",
  "Reforma Tributária": "bg-orange-100 text-orange-800 border-orange-200",
  PGDAS: "bg-violet-100 text-violet-800 border-violet-200",
  "Legislação": "bg-red-100 text-red-700 border-red-200",
  "Dúvidas": "bg-yellow-100 text-yellow-700 border-yellow-200",
  Dicas: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Processos: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Geral: "bg-gray-100 text-gray-700 border-gray-200",
};

interface Issue {
  id: number;
  title: string;
  body: string;
  state?: "open" | "closed";
  labels: { name: string }[];
  user: { login: string; avatar_url: string };
  created_at: string;
  html_url: string;
  pull_request?: unknown;
}

/** Abre o formulário de novo issue; com filtro ≠ Todos, pré-preenche a label no GitHub (?labels=…). */
function newIssueUrlForFilter(filter: string): string {
  const base = `https://github.com/${REPO}/issues/new`;
  if (filter === "Todos" || !CATEGORIES.includes(filter)) return base;
  return `${base}?${new URLSearchParams({ labels: filter }).toString()}`;
}

const ISSUES_API = `https://api.github.com/repos/${REPO}/issues?state=all&per_page=100&sort=updated&direction=desc`;

const ISSUES_CACHE_KEY_SESSION = `quadro-avisos-issues:${REPO}`;
const ISSUES_CACHE_KEY_LOCAL = `quadro-avisos-issues-ls:${REPO}`;
const SESSION_CACHE_TTL_MS = 5 * 60 * 1000;
const LOCAL_CACHE_TTL_MS = 48 * 60 * 60 * 1000;

function parseStoredIssues(raw: string | null, ttlMs: number): Issue[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { t: number; issues: Issue[] };
    if (Date.now() - parsed.t > ttlMs) return null;
    return Array.isArray(parsed.issues) ? parsed.issues : null;
  } catch {
    return null;
  }
}

/** Cache curto (sessão) + longo (localStorage) para ainda mostrar avisos após 403 / limite da API. */
function readIssuesCache(): Issue[] | null {
  const session = parseStoredIssues(sessionStorage.getItem(ISSUES_CACHE_KEY_SESSION), SESSION_CACHE_TTL_MS);
  if (session !== null) return session;
  return parseStoredIssues(localStorage.getItem(ISSUES_CACHE_KEY_LOCAL), LOCAL_CACHE_TTL_MS);
}

function writeIssuesCache(issues: Issue[]) {
  const payload = JSON.stringify({ t: Date.now(), issues });
  try {
    sessionStorage.setItem(ISSUES_CACHE_KEY_SESSION, payload);
  } catch {
    /* ignore */
  }
  try {
    localStorage.setItem(ISSUES_CACHE_KEY_LOCAL, payload);
  } catch {
    /* quota / private mode */
  }
}

function githubApiHeaders(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

const QuadroAvisos = () => {
  const [issues, setIssues] = useState<Issue[]>(() => readIssuesCache() ?? []);
  const [loading, setLoading] = useState(() => readIssuesCache() === null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [rateLimitWarning, setRateLimitWarning] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("Todos");

  useEffect(() => {
    setFetchError(null);
    setRateLimitWarning(null);
    const hadCache = readIssuesCache() !== null;
    if (hadCache) setLoading(false);

    fetch(ISSUES_API, { headers: githubApiHeaders() })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          const apiMsg = typeof data?.message === "string" ? data.message : res.statusText;
          const isRateLimit = res.status === 403 && /rate limit/i.test(apiMsg);
          const stale = readIssuesCache();

          if (isRateLimit && stale !== null) {
            setIssues(stale);
            setFetchError(null);
            setRateLimitWarning(
              "Limite de pedidos à API do GitHub atingido (60/h sem login neste IP). A mostrar dados em cache. " +
                "Adicione VITE_GITHUB_TOKEN no .env (PAT só leitura de Issues) e faça o build — pedidos autenticados têm limite muito maior."
            );
            return;
          }

          if (res.status === 404) {
            setFetchError(
              "Repositório não encontrado (404). Confirme o nome em REPO e se o repositório existe no GitHub."
            );
          } else if (isRateLimit) {
            setFetchError(
              "Limite da API do GitHub (403): sem token só há ~60 pedidos/hora por IP e não há lista guardada neste navegador ainda. " +
                "Solução: 1) Copie .env.example para .env na raiz do projeto. 2) Em github.com/settings/tokens crie um token fine-grained com acesso a este repositório e permissão Issues (Read-only). " +
                "3) Cole em .env: VITE_GITHUB_TOKEN=ghp_… 4) npm run build e volte a publicar. " +
                "Ou aguarde ~1 h e recarregue (o limite reinicia)."
            );
          } else {
            setFetchError(`Não foi possível carregar os issues (${res.status}): ${apiMsg}`);
          }
          if (stale === null) setIssues([]);
          return;
        }
        if (!Array.isArray(data)) {
          setFetchError("Resposta inválida da API do GitHub.");
          return;
        }
        const onlyIssues = data.filter((item: Issue) => !item.pull_request);
        setIssues(onlyIssues);
        writeIssuesCache(onlyIssues);
      })
      .catch(() => {
        const stale = readIssuesCache();
        if (stale !== null) {
          setIssues(stale);
          setFetchError(null);
          setRateLimitWarning("Sem ligação à API; a mostrar última lista em cache.");
        } else {
          setFetchError("Falha de rede ao contactar a API do GitHub.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const getCategory = (issue: Issue) => {
    const cat = issue.labels.find((l) => CATEGORIES.includes(l.name));
    return cat?.name || "Geral";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  };

  const filtered = filter === "Todos" ? issues : issues.filter((i) => getCategory(i) === filter);

  const newIssueUrl = newIssueUrlForFilter(filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
              <Megaphone size={22} strokeWidth={1.5} className="text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Quadro de <span className="text-accent">Avisos</span>
              </h3>
              <p className="text-sm text-muted-foreground">Compartilhe conhecimento com a equipe</p>
              {filter !== "Todos" ? (
                <p className="text-xs text-muted-foreground mt-1">
                  Nova contribuição será criada com a label <span className="font-semibold text-foreground">{filter}</span> no GitHub.
                </p>
              ) : null}
            </div>
          </div>
          <a
            href={newIssueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-accent text-accent-foreground font-bold text-sm px-5 py-2.5 rounded-lg transition-colors hover:bg-accent/90 w-fit"
          >
            <MessageSquarePlus size={16} /> Nova Contribuição
          </a>
        </div>
      </div>

      {rateLimitWarning ? (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
          <p className="leading-relaxed">{rateLimitWarning}</p>
        </div>
      ) : null}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["Todos", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              filter === cat
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-card text-muted-foreground border-border hover:border-accent/40 hover:text-foreground"
            }`}
          >
            {cat === "Todos" ? <Filter size={12} /> : <Tag size={12} />}
            {cat}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      ) : fetchError ? (
        <div className="bg-card rounded-2xl border border-destructive/40 p-8 space-y-4">
          <h4 className="text-lg font-bold text-foreground">Não foi possível sincronizar com o GitHub</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{fetchError}</p>
          <a
            href={`https://github.com/${REPO}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            <ExternalLink size={14} /> Abrir issues no GitHub
          </a>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <Megaphone size={40} className="mx-auto text-muted-foreground/30 mb-4" />
          <h4 className="text-lg font-bold text-foreground mb-2">
            {issues.length === 0 ? "Nenhuma contribuição ainda" : "Nenhum aviso nesta categoria"}
          </h4>
          <p className="text-sm text-muted-foreground mb-6">
            {issues.length === 0 ? (
              "Seja o primeiro a compartilhar algo com a equipe!"
            ) : filter !== "Todos" ? (
              <>
                Só entram aqui os issues que têm no GitHub a label{" "}
                <span className="font-semibold text-foreground">{filter}</span> (nome idêntico). Issues sem label
                aparecem em <span className="font-semibold text-foreground">Todos</span> e{" "}
                <span className="font-semibold text-foreground">Geral</span>. Abra o issue no GitHub → Labels →
                adicione <span className="font-semibold text-foreground">{filter}</span>.
              </>
            ) : (
              "Tente outro filtro ou crie uma nova contribuição."
            )}
          </p>
          <a
            href={newIssueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold text-sm px-5 py-2.5 rounded-lg transition-colors hover:bg-accent/90"
          >
            <MessageSquarePlus size={16} /> Criar Primeira Contribuição
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((issue) => {
            const category = getCategory(issue);
            const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS.Geral;
            return (
              <a
                key={issue.id}
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card rounded-2xl border border-border p-6 flex flex-col gap-3 transition-all duration-300 hover:shadow-lg hover:border-accent/30 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-bold text-foreground leading-snug flex-1 group-hover:text-accent transition-colors">
                    {issue.title}
                  </h4>
                  <div className="flex flex-shrink-0 flex-col items-end gap-1">
                    {issue.state === "closed" ? (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-muted-foreground/30 bg-muted/50 text-muted-foreground">
                        Fechado
                      </span>
                    ) : null}
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${colorClass}`}>
                      {category}
                    </span>
                  </div>
                </div>
                {issue.body && (
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {issue.body.slice(0, 200)}{issue.body.length > 200 ? "..." : ""}
                  </p>
                )}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <img src={issue.user.avatar_url} alt="" className="w-5 h-5 rounded-full" />
                    <span className="text-[11px] text-muted-foreground font-medium">{issue.user.login}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock size={10} /> {formatDate(issue.created_at)}
                    </span>
                    <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuadroAvisos;
