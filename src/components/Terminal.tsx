import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const CV = {
  name: "Nasser Al Subhi",
  initials: "NA",
  role: "Software Development Manager",
  tagline: "I lead engineers who ship cloud-native systems and AI products that move the business.",
  location: "Muscat, Oman",
  email: "n3sser1996@gmail.com",
  phone: "+968 94944011",
  site: "subhi.tech",
  github: "github.com/n3sser96",
  linkedin: "linkedin.com/in/nasser-alsubhi-753a7b192",
  summary:
    "Technology leader with 7+ years of experience in solution architecture, software engineering, and multi-department leadership. Designs scalable, cloud-native, microservices-based systems on AWS and OCI with strong command of Go, Python, and modern delivery practices — Kubernetes, CI/CD, and event-driven architectures (Kafka, Temporal, Airflow).",
  timeline: [
    {
      year: "Sep 2024 — Now",
      role: "Software Development Manager",
      org: "Rihal · Muscat",
      summary:
        "Set multi-year roadmap, KPIs, and performance frameworks across SE, DevOps, and LowCode departments (60+ staff, 20+ projects/yr). Lead pre-sales, solution architecture, and proposals across government and energy sectors. Govern engineering standards, security, and compliance across K3s and AI/GPU (NVIDIA DGX) infra. Champion AI-enabled delivery — Claude Code, AWS Bedrock — across the org.",
      tags: ["Strategy", "Pre-sales", "Governance", "AI-enabled delivery"],
    },
    {
      year: "Sep 2023 — Sep 2024",
      role: "Lead Software Engineer",
      org: "Rihal · Muscat",
      summary:
        "Led a cross-functional team of 25+ engineers across multiple concurrent programs. Launched department-wide upskilling — targeted training, mentorship, and knowledge-sharing. Orchestrated large-scale, multi-service delivery with resilient architectures.",
      tags: ["Team lead", "Upskilling", "Multi-service delivery"],
    },
    {
      year: "Jun 2022 — Oct 2023",
      role: "Senior Software Engineer",
      org: "Rihal · Muscat",
      summary:
        "Tech Lead overseeing system design, team management, and full-stack delivery. Deployed with Docker/Kubernetes on OCI and AWS; built CI/CD via GitHub Actions; orchestrated workflows with Airflow and Temporal; integrated ELK for centralized logging. Integrated and optimized Qdrant for AI-driven search.",
      tags: ["Tech Lead", "Kubernetes", "Temporal", "Qdrant"],
    },
    {
      year: "Sep 2020 — Jun 2022",
      role: "Software Engineer",
      org: "Rihal · Muscat",
      summary:
        "Built scalable systems with Go (backend) and React (frontend) on a microservices architecture backed by PostgreSQL.",
      tags: ["Go", "React", "PostgreSQL", "Microservices"],
    },
    {
      year: "Sep 2014 — Sep 2019",
      role: "B.Sc. Computer Science",
      org: "Sultan Qaboos University",
      summary: "Bachelor of Science in Computer Science.",
      tags: ["Education"],
    },
  ],
  skills: [
    { name: "Engineering leadership", level: 95, years: 4, group: "Leadership" },
    { name: "Roadmap & KPIs", level: 92, years: 3, group: "Leadership" },
    { name: "Pre-sales & proposals", level: 85, years: 2, group: "Leadership" },
    { name: "Architecture review", level: 90, years: 4, group: "Leadership" },
    { name: "Go", level: 92, years: 6, group: "Backend" },
    { name: "Python", level: 86, years: 5, group: "Backend" },
    { name: "TypeScript / React", level: 84, years: 6, group: "Backend" },
    { name: "Rust", level: 70, years: 2, group: "Backend" },
    { name: "PostgreSQL", level: 88, years: 6, group: "Data" },
    { name: "Qdrant · vector DB", level: 84, years: 3, group: "Data" },
    { name: "Kafka · event-driven", level: 80, years: 3, group: "Data" },
    { name: "AWS Bedrock · LLM/RAG", level: 86, years: 2, group: "Data" },
    { name: "Kubernetes (K3s)", level: 85, years: 4, group: "Infra" },
    { name: "AWS / OCI", level: 84, years: 5, group: "Infra" },
    { name: "Temporal · Airflow", level: 80, years: 3, group: "Infra" },
    { name: "NVIDIA DGX / GPU infra", level: 78, years: 1, group: "Infra" },
  ],
  highlights: [
    {
      title: "Siraaj — enterprise LLM product",
      body: "Claude/ChatGPT-style assistant platform connected to enterprise data sources. Lets users build AI assistants on top of their own data.",
      tags: ["LLM", "RAG", "Agentic AI"],
    },
    {
      title: "Intelligent Enterprise Search",
      body: "Google-like search engine connecting to multiple data sources, indexing every document with built-in OCR for text-bearing files and images.",
      tags: ["Search", "OCR", "Vector DB"],
    },
    {
      title: "Tasweet — blockchain voting",
      body: "Web-based voting platform on Hyperledger Fabric (Go) for tamper-resistant, auditable, and transparent ballots.",
      tags: ["Hyperledger", "Go", "Web3"],
    },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent" },
  ],
  proglangs: ["Go", "Python", "JavaScript/TypeScript", "Rust", "PHP", "C#"],
  industries: ["Government", "Energy · Oil & Gas", "Public Sector"],
};

type Segment = { type: "text"; color: string; text: string } | { type: "link"; color: string; text: string; href: string };
type Line = { prompt?: boolean; text?: string; segments?: Segment[] };

const banners: Record<string, string[]> = {
  block: [
    "███╗   ██╗ █████╗ ███████╗███████╗███████╗██████╗ ",
    "████╗  ██║██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗",
    "██╔██╗ ██║███████║███████╗███████╗█████╗  ██████╔╝",
    "██║╚██╗██║██╔══██║╚════██║╚════██║██╔══╝  ██╔══██╗",
    "██║ ╚████║██║  ██║███████║███████║███████╗██║  ██║",
    "╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝",
  ],
  slant: [
    "    _   __                          ",
    "   / | / /___ _______________  _____",
    "  /  |/ / __ `/ ___/ ___/ _ \\/ ___/",
    " / /|  / /_/ (__  |__  )  __/ /    ",
    "/_/ |_/\\__,_/____/____/\\___/_/     ",
  ],
  minimal: [
    "┌────────────────────────────────────┐",
    "│   N A S S E R   A L   S U B H I    │",
    "└────────────────────────────────────┘",
  ],
};

const themeColors = {
  default: {
    bg: "#0a0c10", panel: "#0f1218", ink: "#d6d4cf", dim: "#6b6e75",
    border: "#1f2329", green: "#7ee787", cyan: "#79c0ff", amber: "#e3b341",
    pink: "#ff7b72", magenta: "#d2a8ff",
  },
  matrix: {
    bg: "#000", panel: "#001509", ink: "#39d353", dim: "#1f6b35",
    border: "#0a3a18", green: "#39d353", cyan: "#9bff8c", amber: "#caff70",
    pink: "#39d353", magenta: "#9bff8c",
  },
  ocean: {
    bg: "#0a1929", panel: "#0c1f33", ink: "#e1f5fe", dim: "#5d7a99",
    border: "#1a2f4a", green: "#80deea", cyan: "#4fc3f7", amber: "#ffd54f",
    pink: "#f48fb1", magenta: "#ce93d8",
  },
  paper: {
    bg: "#f4f1ea", panel: "#ebe5d6", ink: "#1a1612", dim: "#7a6a55",
    border: "#d4cdbc", green: "#1a8554", cyan: "#1e6f9f", amber: "#a06a3a",
    pink: "#b04848", magenta: "#7c3aed",
  },
};

type ThemeName = keyof typeof themeColors;

function Terminal() {
  const [theme, setTheme] = useState<ThemeName>("default");
  const [bannerStyle, setBannerStyle] = useState<string>("block");
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [ready, setReady] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<string[]>([]);
  const bannerRef = useRef(bannerStyle);
  historyRef.current = history;
  bannerRef.current = bannerStyle;

  const T = themeColors[theme];

  const openLink = (url: string) => window.open(url, "_blank", "noopener");

  const renderText = useCallback((t: string, color: string): Segment[] => {
    return [{ type: "text", color, text: t }];
  }, []);

  const renderBlock = useCallback((rows: Segment[][]): Segment[] => {
    return rows.flat();
  }, []);

  const cmds = useMemo(() => {
    const c: Record<string, { desc: string; run: (args: string[]) => Segment[] }> = {};

    c.help = {
      desc: "Show this help",
      run: () => {
        const names = Object.keys(c).sort();
        const rows: Segment[][] = [
          [{ type: "text", color: T.amber, text: "Available commands\n\n" }],
          ...names.map((name) => [
            { type: "text", color: T.green, text: `  ${name.padEnd(12, " ")}` },
            { type: "text", color: T.dim, text: " · " },
            { type: "text", color: T.ink, text: c[name].desc + "\n" },
          ]),
          [{ type: "text", color: T.dim, text: "\nTry: " },
           { type: "text", color: T.cyan, text: "experience · skills · projects · theme matrix · neofetch" }],
        ];
        return renderBlock(rows);
      },
    };

    c.about = {
      desc: "Short summary",
      run: () => renderBlock([
        [{ type: "text", color: T.amber, text: `${CV.name} — ${CV.role}\n` }],
        [{ type: "text", color: T.dim, text: `${CV.location} · ${CV.email}\n\n` }],
        [{ type: "text", color: T.ink, text: CV.summary }],
      ]),
    };

    c.whoami = {
      desc: "Identity & status",
      run: () => renderBlock([
        [{ type: "text", color: T.green, text: "name    " }, { type: "text", color: T.ink, text: `= "${CV.name}"\n` }],
        [{ type: "text", color: T.green, text: "role    " }, { type: "text", color: T.ink, text: `= "${CV.role}"\n` }],
        [{ type: "text", color: T.green, text: "loc     " }, { type: "text", color: T.ink, text: `= "${CV.location}"\n` }],
        [{ type: "text", color: T.green, text: "uptime  " }, { type: "text", color: T.ink, text: `= "7+ years in software"\n` }],
        [{ type: "text", color: T.green, text: "status  " }, { type: "text", color: T.amber, text: `= "building cool stuff"` }],
      ]),
    };

    c.experience = {
      desc: "Career history (also: 'exp', 'work')",
      run: () => renderBlock(
        CV.timeline.flatMap((t, i) => [
          [{ type: "text", color: T.amber, text: `▸ ${t.year}\n` }],
          [{ type: "text", color: T.green, text: `  ${t.role}` }, { type: "text", color: T.dim, text: ` @ ${t.org}\n` }],
          [{ type: "text", color: T.ink, text: `  ${t.summary}\n` }],
          [{ type: "text", color: T.cyan, text: `  ${t.tags.map((x) => "#" + x.toLowerCase().replace(/\s+/g, "-")).join("  ")}\n` }],
          ...(i < CV.timeline.length - 1 ? [[{ type: "text", color: T.dim, text: "\n" }]] : []),
        ])
      ),
    };

    c.exp = { desc: "Alias: experience", run: () => c.experience.run([]) };
    c.work = { desc: "Alias: experience", run: () => c.experience.run([]) };

    c.skills = {
      desc: "Skills with proficiency bars",
      run: () => {
        const max = Math.max(...CV.skills.map((s) => s.level));
        const groups = [...new Set(CV.skills.map((s) => s.group))];
        const out: Segment[][] = [];
        for (const g of groups) {
          out.push([{ type: "text", color: T.amber, text: `\n${g}\n` }]);
          for (const s of CV.skills.filter((x) => x.group === g)) {
            const w = Math.round((s.level / max) * 28);
            const bar = "█".repeat(w) + "░".repeat(28 - w);
            out.push([
              { type: "text", color: T.dim, text: `  ${String(s.years).padStart(2, " ")}y  ` },
              { type: "text", color: T.ink, text: s.name.padEnd(24, " ") },
              { type: "text", color: T.green, text: bar.slice(0, w) },
              { type: "text", color: T.dim, text: bar.slice(w) },
              { type: "text", color: T.green, text: `  ${s.level}%\n` },
            ]);
          }
        }
        return renderBlock(out);
      },
    };

    c.projects = {
      desc: "Selected work",
      run: () => renderBlock(
        CV.highlights.flatMap((h, i) => [
          [{ type: "text", color: T.amber, text: `[${String(i + 1).padStart(2, "0")}] ${h.title}\n` }],
          [{ type: "text", color: T.ink, text: `     ${h.body}\n` }],
          [{ type: "text", color: T.cyan, text: `     ${h.tags.map((x) => "#" + x.toLowerCase()).join("  ")}\n\n` }],
        ])
      ),
    };

    c.contact = {
      desc: "Reach me",
      run: () => renderBlock([
        [{ type: "text", color: T.amber, text: "email     " }, { type: "link", color: T.cyan, text: CV.email, href: `mailto:${CV.email}` }, { type: "text", color: T.ink, text: "\n" }],
        [{ type: "text", color: T.amber, text: "phone     " }, { type: "text", color: T.cyan, text: CV.phone + "\n" }],
        [{ type: "text", color: T.amber, text: "site      " }, { type: "link", color: T.cyan, text: CV.site, href: `https://${CV.site}` }, { type: "text", color: T.ink, text: "\n" }],
        [{ type: "text", color: T.amber, text: "github    " }, { type: "link", color: T.cyan, text: CV.github, href: `https://${CV.github}` }, { type: "text", color: T.ink, text: "\n" }],
        [{ type: "text", color: T.amber, text: "linkedin  " }, { type: "link", color: T.cyan, text: CV.linkedin, href: `https://${CV.linkedin}` }],
      ]),
    };

    c.education = {
      desc: "Education",
      run: () => {
        const e = CV.timeline.find((t) => t.tags.includes("Education"))!;
        return renderBlock([
          [{ type: "text", color: T.amber, text: `${e.year}\n` }],
          [{ type: "text", color: T.green, text: `${e.role} ` }, { type: "text", color: T.dim, text: `@ ${e.org}\n` }],
          [{ type: "text", color: T.ink, text: e.summary }],
        ]);
      },
    };

    c.languages = {
      desc: "Spoken languages",
      run: () => renderBlock(CV.languages.map((l) => [
        { type: "text", color: T.green, text: `  ▸ ${l.name.padEnd(10, " ")}` },
        { type: "text", color: T.dim, text: l.level + "\n" },
      ])),
    };

    c.stack = {
      desc: "Tech stack at a glance",
      run: () => renderBlock([
        [{ type: "text", color: T.amber, text: "Languages: " }, { type: "text", color: T.cyan, text: CV.proglangs.join(" · ") + "\n" }],
        [{ type: "text", color: T.amber, text: "Industries: " }, { type: "text", color: T.cyan, text: CV.industries.join(" · ") + "\n" }],
        [{ type: "text", color: T.amber, text: "Cloud: " }, { type: "text", color: T.cyan, text: "AWS · OCI\n" }],
        [{ type: "text", color: T.amber, text: "Orchestration: " }, { type: "text", color: T.cyan, text: "Kubernetes (K3s) · Docker · Temporal · Airflow\n" }],
        [{ type: "text", color: T.amber, text: "Data: " }, { type: "text", color: T.cyan, text: "PostgreSQL · Qdrant · Kafka · ELK\n" }],
        [{ type: "text", color: T.amber, text: "AI: " }, { type: "text", color: T.cyan, text: "AWS Bedrock · LLM/RAG · Agentic AI · vLLM · OCR · NVIDIA DGX" }],
      ]),
    };

    c.neofetch = {
      desc: "ASCII profile card",
      run: () => {
        const left = banners[bannerRef.current];
        const info = [
          { k: "user", v: "nasser@subhi-tech" },
          { k: "role", v: CV.role },
          { k: "loc", v: CV.location },
          { k: "exp", v: "7+ years" },
          { k: "team", v: "60+ engineers led" },
          { k: "lang", v: CV.proglangs.slice(0, 3).join(", ") + "..." },
          { k: "infra", v: "K3s · AWS · OCI · DGX" },
          { k: "ai", v: "Bedrock · RAG · Agentic" },
        ];
        const rows = Math.max(left.length, info.length);
        const out: Segment[][] = [];
        for (let i = 0; i < rows; i++) {
          out.push([
            { type: "text", color: T.cyan, text: (left[i] || "").padEnd(54, " ") },
            ...(info[i]
              ? [
                  { type: "text", color: T.amber, text: `  ${info[i].k.padEnd(6, " ")}` },
                  { type: "text", color: T.dim, text: " · " },
                  { type: "text", color: T.ink, text: info[i].v },
                ]
              : []),
            { type: "text", color: T.ink, text: "\n" },
          ]);
        }
        return renderBlock(out);
      },
    };

    c.banner = {
      desc: "Switch ASCII banner: block | slant | minimal",
      run: (args) => {
        const which = args[0];
        if (!which || !banners[which]) {
          return renderText(`usage: banner <${Object.keys(banners).join("|")}>`, T.pink);
        }
        setBannerStyle(which);
        return renderText(`banner → ${which}`, T.green);
      },
    };

    c.theme = {
      desc: "Switch theme: default | matrix | ocean | paper",
      run: (args) => {
        const which = args[0] as ThemeName;
        if (!which || !(which in themeColors)) {
          return renderText(`usage: theme <${Object.keys(themeColors).join("|")}>`, T.pink);
        }
        setTheme(which);
        return renderText(`theme → ${which}`, T.green);
      },
    };

    c.ls = {
      desc: "List sections",
      run: () => renderBlock([
        [{ type: "text", color: T.cyan, text: "about.md  experience.md  skills.md  projects.md  contact.md  education.md  stack.md\n" }],
      ]),
    };

    c.cat = {
      desc: "cat <file> — print a section",
      run: (args) => {
        const f = (args[0] || "").replace(/\.md$/, "");
        if (!f) return renderText("usage: cat <file>", T.pink);
        if (c[f]) return c[f].run([]);
        return renderText(`cat: ${args[0]}: No such file`, T.pink);
      },
    };

    c.open = {
      desc: "open <site|github|linkedin|email>",
      run: (args) => {
        const target = args[0];
        const map: Record<string, string> = {
          site: `https://${CV.site}`,
          github: `https://${CV.github}`,
          linkedin: `https://${CV.linkedin}`,
          email: `mailto:${CV.email}`,
        };
        if (!target || !map[target]) return renderText(`usage: open <${Object.keys(map).join("|")}>`, T.pink);
        openLink(map[target]);
        return renderText(`opening ${target} →`, T.green);
      },
    };

    c.date = {
      desc: "Current time",
      run: () => renderText(new Date().toString(), T.ink),
    };

    c.history = {
      desc: "Show command history",
      run: () => renderBlock(historyRef.current.map((h, i) => [
        { type: "text", color: T.dim, text: `  ${String(i + 1).padStart(3, " ")}  ` },
        { type: "text", color: T.ink, text: h + "\n" },
      ])),
    };

    c.clear = {
      desc: "Clear the screen",
      run: () => { setLines([]); return []; },
    };

    c.joke = {
      desc: "Engineering joke",
      run: () => {
        const jokes = [
          "There are only two hard things in CS: cache invalidation, naming things, and off-by-one errors.",
          "I'd tell you a UDP joke, but you might not get it.",
          "99 little bugs in the code · take one down, patch it around · 127 little bugs in the code.",
          "A SQL query walks into a bar, walks up to two tables and asks: \"can I JOIN you?\"",
          "Why do programmers prefer dark mode? Because light attracts bugs.",
        ];
        return renderText(jokes[Math.floor(Math.random() * jokes.length)], T.amber);
      },
    };

    c.sudo = {
      desc: "Try it.",
      run: () => renderText("nasser is not in the sudoers file. This incident will be reported.", T.pink),
    };

    c.matrix = {
      desc: "Enter the matrix",
      run: () => {
        setTheme("matrix");
        return renderBlock([
          [{ type: "text", color: "#39d353", text: "Wake up, Nasser…\n" }],
          [{ type: "text", color: "#39d353", text: "The Matrix has you.\n" }],
          [{ type: "text", color: "#39d353", text: "Follow the white rabbit. 🐇" }],
        ]);
      },
    };

    c.exit = {
      desc: "Try to leave",
      run: () => renderBlock([
        [{ type: "text", color: T.dim, text: "There is no exit. Only " }],
        [{ type: "text", color: T.amber, text: "hire me." }],
      ]),
    };

    return c;
  }, [T, renderText, renderBlock]);

  const runCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      setLines((ls) => [...ls, { prompt: true, text: "" }]);
      return;
    }
    setHistory((h) => [...h, trimmed]);
    const [name, ...args] = trimmed.split(/\s+/);
    const cmd = cmds[name];
    const echo: Line = { prompt: true, text: trimmed };
    if (!cmd) {
      setLines((ls) => [...ls, echo, {
        segments: [
          { type: "text", color: T.pink, text: `command not found: ${name}\n` },
          { type: "text", color: T.dim, text: "type " },
          { type: "text", color: T.amber, text: "help" },
          { type: "text", color: T.dim, text: " to see what's available." },
        ],
      }]);
      return;
    }
    const out = cmd.run(args);
    if (out.length === 0) return;
    setLines((ls) => [...ls, echo, { segments: out }]);
  }, [cmds, T]);

  useEffect(() => {
    const t = setTimeout(() => {
      runCommand("neofetch");
      runCommand("help");
      setReady(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    }, 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, input]);

  const handleAreaClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "A") return;
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (!ready) { e.preventDefault(); return; }
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      setHistIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const h = historyRef.current;
      if (h.length === 0) return;
      const next = histIdx < 0 ? h.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(h[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const h = historyRef.current;
      if (histIdx < 0) return;
      const next = histIdx + 1;
      if (next >= h.length) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(next); setInput(h[next]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      if (parts.length === 1) {
        const matches = Object.keys(cmds).filter((n) => n.startsWith(parts[0]));
        if (matches.length === 1) setInput(matches[0] + " ");
        else if (matches.length > 1) {
          setLines((ls) => [...ls,
            { prompt: true, text: input },
            { segments: [{ type: "text", color: T.dim, text: matches.join("  ") }] },
          ]);
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      onClick={handleAreaClick}
      style={{
        position: "fixed", inset: 0,
        background: T.bg, color: T.ink,
        fontFamily: '"JetBrains Mono", "SF Mono", Menlo, monospace',
        fontSize: 13, lineHeight: 1.55,
        display: "flex", flexDirection: "column",
        transition: "background .3s ease, color .3s ease",
      }}
    >
      {/* Window chrome */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 14px",
        background: T.panel,
        borderBottom: `1px solid ${T.border}`,
      }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
        <div style={{ flex: 1, textAlign: "center", color: T.dim, fontSize: 12 }}>
          ~/cv — nasser@subhi-tech — interactive
        </div>
        <div style={{ color: T.dim, fontSize: 11 }}>{theme}</div>
      </div>

      {/* Scrollback */}
      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: "auto", padding: "20px 24px 8px" }}
      >
        {/* Boot banner */}
        <div style={{ color: T.cyan, marginBottom: 16, fontSize: 11, lineHeight: 1.1, whiteSpace: "pre" }}>
          {banners[bannerStyle].join("\n")}
        </div>
        <div style={{ color: T.dim, marginBottom: 18 }}>
          Welcome to <span style={{ color: T.amber }}>nasser-os v7.04</span>. Type{" "}
          <span style={{ color: T.green }}>help</span> to see commands. Try{" "}
          <span style={{ color: T.green }}>experience</span>,{" "}
          <span style={{ color: T.green }}>skills</span>,{" "}
          <span style={{ color: T.green }}>projects</span>, or{" "}
          <span style={{ color: T.green }}>theme matrix</span>.
        </div>

        {lines.map((l, i) => (
          <div key={i} style={{ marginBottom: 4 }}>
            {l.prompt ? (
              <div>
                <Prompt T={T} />
                <span> {l.text}</span>
              </div>
            ) : (
              <div style={{ whiteSpace: "pre-wrap", paddingLeft: 0 }}>
                {l.segments?.map((s, j) =>
                  s.type === "link" ? (
                    <a key={j} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ color: s.color, textDecoration: "underline", textDecorationStyle: "dotted" }}
                    >{s.text}</a>
                  ) : (
                    <span key={j} style={{ color: s.color, whiteSpace: "pre-wrap" }}>{s.text}</span>
                  )
                )}
              </div>
            )}
          </div>
        ))}

        {/* Active prompt */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Prompt T={T} />
          <span style={{ marginLeft: 4 }}>{input}</span>
          <span style={{
            display: "inline-block", width: 8, height: 16,
            background: T.green, marginLeft: 1,
            animation: "cli-blink 1s steps(2) infinite",
          }} />
        </div>

        {/* Hidden real input */}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          autoFocus
          style={{
            position: "absolute", opacity: 0, pointerEvents: "none",
            width: 1, height: 1,
          }}
          aria-label="terminal input"
        />
      </div>

      {/* Status bar */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        padding: "6px 16px", fontSize: 11, color: T.dim,
        background: T.panel, borderTop: `1px solid ${T.border}`,
      }}>
        <span>↑↓ history · tab autocomplete · ctrl+l clear</span>
        <span>{CV.email}</span>
      </div>
    </div>
  );
}

function Prompt({ T }: { T: typeof themeColors.default }) {
  return (
    <span>
      <span style={{ color: T.green }}>nasser@subhi.tech</span>
      <span style={{ color: T.dim }}>:</span>
      <span style={{ color: T.cyan }}>~</span>
      <span style={{ color: T.dim }}>$</span>
    </span>
  );
}

export default Terminal;
