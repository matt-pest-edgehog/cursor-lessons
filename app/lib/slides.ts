export type SlideCitation = {
  label: string;
  url: string;
};

export type SlideSection = {
  heading?: string;
  points: string[];
};

export type Slide = {
  id: string;
  kicker: string;
  title: string;
  image?: { src: string; alt: string };
  sections: SlideSection[];
  citations: SlideCitation[];
};

export const slides: Slide[] = [
  // ── 0. Welcome ──────────────────────────────────────────────
  {
    id: "welcome",
    kicker: "Cursor Mastery Deck",
    title: "Modern Cursor Best Practices",
    sections: [
      {
        points: [
          "A practical playbook for shipping faster with Cursor 2.5 — built for a high-frequency market-making engineering team.",
          "Covers embeddings, context management, rules, skills, subagents, commands, plugins, MCP, model selection, modes, and team config.",
          "Every claim is cited. Every example maps to real Edgehog workflows.",
        ],
      },
    ],
    citations: [
      { label: "Cursor Docs", url: "https://cursor.com/docs" },
      { label: "Cursor 2.5 Changelog", url: "https://cursor.com/changelog" },
    ],
  },

  // ── 1. Quick LLM Mental Model ──────────────────────────────
  {
    id: "llm-mental-model",
    kicker: "Foundations (60-Second Version)",
    title: "The Only Background You Need",
    sections: [
      {
        heading: "Transformer → Instruction-Tuned → Agent",
        points: [
          "Transformers (2017) replaced sequential models with parallel attention — enabling modern LLMs.",
          "RLHF / Constitutional AI made them follow instructions safely instead of just predicting next tokens.",
          "Cursor wraps these models with tools, context, and rules — turning a chatbot into an autonomous coding agent.",
        ],
      },
      {
        heading: "Why this matters for you",
        points: [
          "You don't need to understand backprop. You need to understand that the model sees a fixed window of text (context), uses tools to act, and follows rules you set.",
          "Your leverage is in what you put INTO that context window and how precisely you scope the task.",
        ],
      },
    ],
    citations: [
      { label: "Attention Is All You Need (2017)", url: "https://arxiv.org/abs/1706.03762" },
      { label: "InstructGPT / RLHF", url: "https://openreview.net/forum?id=TG8KACxEON" },
      { label: "Constitutional AI", url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback" },
    ],
  },

  // ── 2. Embeddings ──────────────────────────────────────────
  {
    id: "embeddings",
    kicker: "Core Concept",
    title: "Embeddings: How Cursor Understands Your Codebase",
    image: { src: "/diagrams/embeddings-pipeline.png", alt: "Cursor embedding and indexing pipeline diagram" },
    sections: [
      {
        heading: "What are embeddings?",
        points: [
          "Embeddings convert code chunks into numerical vectors (\"fingerprints\") where similar code has nearby coordinates.",
          "Cursor trained a custom embedding model on agent session traces — it learns what code SHOULD have been retrieved.",
          "Result: 12.5% higher accuracy on codebase questions vs generic embeddings.",
        ],
      },
      {
        heading: "The indexing pipeline",
        points: [
          "1) File scan (respects .gitignore / .cursorignore) → 2) Semantic chunking (functions, classes) → 3) Vector embedding → 4) Local FAISS-like DB → 5) Query matching in milliseconds → 6) Context injection.",
          "Large repos use Merkle trees for incremental re-indexing — hours → seconds when sharing across teammates.",
        ],
      },
      {
        heading: "HFT example",
        points: [
          "Your order router spans 40+ files. When you ask \"where do we handle partial fills?\", embeddings find the exact handler in <200ms instead of you grep-ing through the codebase.",
        ],
      },
    ],
    citations: [
      { label: "Cursor: Improving agent with semantic search", url: "https://cursor.com/blog/semsearch" },
      { label: "Cursor: Secure codebase indexing", url: "https://cursor.com/blog/secure-codebase-indexing" },
      { label: "How Cursor indexes your codebase", url: "https://towardsdatascience.com/how-cursor-actually-indexes-your-codebase/" },
    ],
  },

  // ── 3. Context Window ──────────────────────────────────────
  {
    id: "context-window",
    kicker: "Core Concept",
    title: "Context Window: Your Token Budget",
    image: { src: "/diagrams/context-assembly.png", alt: "Cursor context assembly pipeline diagram" },
    sections: [
      {
        heading: "How context is assembled",
        points: [
          "Cursor builds a prompt from 6 sources: System prompt → Semantic search (RAG) → Open files → @-mentions → Project rules → Session history.",
          "Most models give you ~200k tokens. Practical sweet spot is <120k before quality degrades.",
        ],
      },
      {
        heading: "Where tokens go",
        points: [
          "Agent exploration (reading files): 50k+ tokens possible. Conversation history (10 msgs): 20–40k. A 500-line file: 3–5k tokens. Each always-apply rule: ~500–1k.",
          "RAG alone can consume 41k+ tokens for a single question — that's real budget.",
        ],
      },
      {
        heading: "Practical optimization",
        points: [
          "Audit your always-apply rules — convert to glob-scoped or agent-decided. This can save 2k+ tokens per turn.",
          "Use .cursorignore to exclude build artifacts, vendor dirs, and generated protobuf files from indexing.",
          "Start new conversations for distinct tasks — don't let history bloat eat your budget.",
        ],
      },
    ],
    citations: [
      { label: "Token Management guide", url: "https://developertoolkit.ai/en/cursor-ide/advanced-techniques/token-management/" },
      { label: "How Context Works in Cursor", url: "https://www.linkedin.com/pulse/how-context-works-cursor-from-rag-rules-token-sergey-smirnov-ka7hc" },
      { label: "Context Windows and Token Limits", url: "https://developertoolkit.ai/en/shared-workflows/context-management/context-windows/" },
    ],
  },

  // ── 4. Rules ───────────────────────────────────────────────
  {
    id: "rules",
    kicker: "Cursor Power Feature",
    title: "Rules: Persistent AI Instructions",
    sections: [
      {
        heading: "What are rules?",
        points: [
          "Rules are markdown files in .cursor/rules/ that inject system-level guidance into every (or targeted) agent session.",
          "They replace the legacy .cursorrules file and support frontmatter with description and globs.",
        ],
      },
      {
        heading: "Activation modes",
        points: [
          "Always Apply — injected every session (use sparingly, costs tokens).",
          "Apply Intelligently — agent decides based on description match.",
          "Apply to Specific Files — glob-scoped, e.g. *.proto, *.go.",
          "Apply Manually — only when @-mentioned.",
        ],
      },
      {
        heading: "Priority hierarchy",
        points: [
          "Team Rules (dashboard) → Project Rules (.cursor/rules/) → User Rules (global) → Legacy Rules → AGENTS.md.",
        ],
      },
      {
        heading: "HFT examples",
        points: [
          "A glob rule on *.proto: \"All protobuf changes must update the corresponding Go/Python stubs and version the schema.\"",
          "An always-apply rule: \"Never use floating point for price calculations. Use fixed-point decimal types.\"",
          "An intelligent rule for test files: \"All tests must mock external exchange connections. Never hit production endpoints.\"",
        ],
      },
    ],
    citations: [
      { label: "Cursor Rules docs", url: "https://cursor.com/docs/context/rules" },
      { label: "Cursor Rules deep dive", url: "https://design.dev/guides/cursor-rules/" },
    ],
  },

  // ── 5. Skills ──────────────────────────────────────────────
  {
    id: "skills",
    kicker: "Cursor Power Feature",
    title: "Skills: Teachable Agent Workflows",
    sections: [
      {
        heading: "Skills vs Rules",
        points: [
          "Rules = conventions (\"always do X\"). Skills = procedures (\"when asked to do Y, follow these steps\").",
          "Skills live in SKILL.md files (global or per-project in .cursor/skills/) and are triggered when the user's request matches the skill description.",
        ],
      },
      {
        heading: "What goes in a skill?",
        points: [
          "Step-by-step instructions, file templates, tool usage patterns, and validation checks.",
          "Skills enable dynamic context discovery — the agent reads the skill, then figures out what files/tools to pull in.",
        ],
      },
      {
        heading: "HFT examples",
        points: [
          "\"Create new strategy\" skill: scaffolds a strategy class, registers it in the strategy registry, creates a config template, and adds unit test stubs.",
          "\"Add gRPC endpoint\" skill: generates proto definition, runs buf generate, creates handler with standard error patterns, updates service registry.",
          "\"Analyze fill quality\" skill: queries the fills database, computes slippage metrics, generates a Grafana-compatible JSON dashboard.",
        ],
      },
    ],
    citations: [
      { label: "Claude Skills guide", url: "https://design.dev/guides/claude-skills/" },
      { label: "Cursor 2.4: Subagents, Skills, Image Gen", url: "https://cursor.com/changelog/2-4" },
    ],
  },

  // ── 6. Subagents ───────────────────────────────────────────
  {
    id: "subagents",
    kicker: "Cursor 2.5",
    title: "Subagents: Parallel Autonomous Workers",
    sections: [
      {
        heading: "What are subagents?",
        points: [
          "Independent agents that run in parallel with their own context window, custom prompts, and tool access.",
          "The parent agent delegates discrete subtasks; subagents report results back.",
          "In 2.5: subagents can run async (background) and spawn their own subagents — forming a work tree.",
        ],
      },
      {
        heading: "Built-in subagent types",
        points: [
          "generalPurpose — multi-step research and code tasks.",
          "explore — fast codebase exploration (quick / medium / very thorough).",
          "browser-use — web automation, UI testing, screenshot verification.",
        ],
      },
      {
        heading: "HFT example",
        points: [
          "\"Refactor risk limits\" — parent plans the change, spawns 3 subagents: one updates the limit engine, one updates the API layer, one updates tests. All run in parallel.",
          "\"Investigate latency regression\" — explore subagent searches the codebase while a browser subagent checks Grafana dashboards for timing anomalies.",
        ],
      },
    ],
    citations: [
      { label: "Cursor 2.4 changelog (subagents)", url: "https://cursor.com/changelog/2-4" },
      { label: "Cursor 2.5 changelog (async subagents)", url: "https://cursor.com/changelog" },
    ],
  },

  // ── 7. Commands ────────────────────────────────────────────
  {
    id: "commands",
    kicker: "Cursor Power Feature",
    title: "Custom Commands: Repeatable Workflows",
    sections: [
      {
        heading: "What are commands?",
        points: [
          "Slash commands stored in .cursor/commands/ that trigger specific agent workflows.",
          "They replaced the old \"Custom Modes\" system in Cursor 2.1.",
          "Commands can include tool restrictions, prompt templates, and file references.",
        ],
      },
      {
        heading: "HFT examples",
        points: [
          "/review-strategy — \"Review this strategy file. Check for: unhedged exposure, missing stop-loss, hardcoded magic numbers, and missing telemetry hooks. Use only search tools — do not edit.\"",
          "/deploy-check — \"Run lint, type-check, and unit tests. Summarize failures. Do not fix anything.\"",
          "/post-mortem — \"Read the linked incident log. Summarize root cause, timeline, and suggest 3 preventive measures.\"",
        ],
      },
    ],
    citations: [
      { label: "Cursor Commands docs", url: "https://cursor.com/docs/agent/chat/commands" },
      { label: "Cursor Modes docs", url: "https://cursor.com/docs/agent/modes" },
    ],
  },

  // ── 8. Plugins ─────────────────────────────────────────────
  {
    id: "plugins",
    kicker: "Cursor 2.5",
    title: "Plugins: Packaged Superpowers",
    sections: [
      {
        heading: "What are plugins?",
        points: [
          "Plugins bundle skills + subagents + MCP servers + hooks + rules into a single installable package.",
          "Browse at cursor.com/marketplace, install with /add-plugin.",
          "Launch partners: Amplitude, AWS, Figma, Linear, Stripe.",
        ],
      },
      {
        heading: "Why plugins matter",
        points: [
          "Before: you manually configured MCP servers, wrote skills, and wired hooks. Now a plugin does all of it in one step.",
          "Plugins are version-controlled and can be shared across your org.",
        ],
      },
      {
        heading: "HFT relevance",
        points: [
          "A \"Grafana\" plugin could expose dashboard queries, alert management, and annotation creation as MCP tools — your agent reads production metrics without you leaving the editor.",
          "A \"Slack\" plugin lets the agent post deployment summaries or incident alerts directly to your team channel.",
        ],
      },
    ],
    citations: [
      { label: "Cursor 2.5 changelog (plugins)", url: "https://cursor.com/changelog" },
      { label: "Cursor Marketplace", url: "https://cursor.com/marketplace" },
    ],
  },

  // ── 9. MCP Simple ──────────────────────────────────────────
  {
    id: "mcp-simple",
    kicker: "MCP",
    title: "MCP in Plain English",
    sections: [
      {
        heading: "The USB-C analogy",
        points: [
          "MCP (Model Context Protocol) is a universal plug for connecting AI agents to external systems.",
          "Instead of writing custom integrations for every tool, you implement one protocol and the agent can use any MCP server.",
          "Think of each MCP server as a capability pack: \"now I can talk to Slack\", \"now I can query Grafana\".",
        ],
      },
      {
        heading: "Three primitives",
        points: [
          "Tools — functions the agent can call (e.g. \"create_issue\", \"query_dashboard\", \"send_message\").",
          "Resources — read-only data the agent can access (e.g. file contents, DB schemas, API docs).",
          "Prompts — pre-built instruction templates for working with specific tools.",
        ],
      },
      {
        heading: "Our MCP servers (examples)",
        points: [
          "GitHub — create repos, push files, manage PRs and issues directly from the agent.",
          "Slack — post messages, read channels, manage threads without leaving the editor.",
          "Context7 — query up-to-date library docs for any framework (Next.js, React, etc.).",
          "Supabase / Neon — manage databases, run migrations, query data.",
          "Linear — create and manage engineering tickets from within your coding session.",
        ],
      },
    ],
    citations: [
      { label: "MCP Introduction", url: "https://modelcontextprotocol.io/introduction" },
      { label: "Cursor MCP docs", url: "https://cursor.com/docs/context/mcp" },
    ],
  },

  // ── 10. MCP Technical ──────────────────────────────────────
  {
    id: "mcp-technical",
    kicker: "MCP",
    title: "MCP: Technical Architecture",
    image: { src: "/diagrams/mcp-architecture.png", alt: "MCP client-host-server architecture diagram" },
    sections: [
      {
        heading: "Client-Host-Server model",
        points: [
          "Host = the AI app (Cursor). Client = a connection handler inside the host. Server = the external tool provider.",
          "Each host runs multiple clients, each with an isolated 1:1 connection to one server.",
          "All communication uses JSON-RPC 2.0 over stdio (local) or Streamable HTTP (remote).",
        ],
      },
      {
        heading: "Tool schema",
        points: [
          "Each tool has a name, description, and JSON Schema for inputs/outputs.",
          "The agent reads tool descriptors at startup and decides when to invoke them based on your prompt.",
          "Example: our GitHub MCP exposes create_repository(name, description, private) and push_files(owner, repo, branch, files, message).",
        ],
      },
      {
        heading: "Security model",
        points: [
          "Servers are isolated — they cannot see conversation history or other servers' data.",
          "Tool calls require user approval (or can be auto-approved via permission config).",
          "Enterprise: sandbox network egress policies control what servers can reach.",
        ],
      },
    ],
    citations: [
      { label: "MCP Architecture spec", url: "https://modelcontextprotocol.io/specification/2025-06-18/architecture/index" },
      { label: "MCP Server concepts", url: "https://modelcontextprotocol.io/docs/learn/server-concepts" },
      { label: "MCP Architecture overview", url: "https://modelcontextprotocol.io/docs/learn/architecture" },
    ],
  },

  // ── 11. Model Selection ────────────────────────────────────
  {
    id: "model-selection",
    kicker: "Practical Guide",
    title: "Model Selection: When to Pay Up",
    image: { src: "/diagrams/model-selection.png", alt: "Cursor model selection comparison chart" },
    sections: [
      {
        heading: "Claude Opus 4.6 variants",
        points: [
          "Non-Thinking, High Effort — your daily driver. Everyday coding, docs, research. Best quality/cost/speed balance.",
          "Thinking, High Effort — complex multi-step debugging, large codebase navigation, code review. Worth the premium.",
          "Thinking, Max Effort — frontier reasoning. Advanced algorithmic problems, subtle race conditions. Most expensive.",
          "Non-Thinking, Max Effort — deep agentic search. Finding needle-in-haystack across massive codebases.",
        ],
      },
      {
        heading: "Other models worth knowing",
        points: [
          "Claude Sonnet 4.5 — 1/5 the cost of Opus, 1M context window. Good for budget-conscious bulk work.",
          "Gemini 3 Pro — extreme context windows, multimodal (diagrams, screenshots). Use for visual analysis.",
          "Fast/Composer models — 4x faster iteration for quick edits. Use for straightforward changes.",
        ],
      },
      {
        heading: "Our team's approach",
        points: [
          "Default to Opus 4.6 non-thinking for daily work.",
          "Switch to Opus 4.6 thinking for: debugging production issues, reviewing complex PRs, architectural decisions.",
          "Use max effort sparingly — when accuracy matters more than speed (e.g. risk engine refactors).",
          "For simple formatting / rename tasks, a fast model saves time and money.",
        ],
      },
    ],
    citations: [
      { label: "Cursor model selection guide", url: "https://forum.cursor.com/t/choose-the-right-opus-4-6-model-in-cursor/151037" },
      { label: "Cursor Models docs", url: "https://cursor.com/docs/models" },
      { label: "Model Comparison", url: "https://developertoolkit.ai/en/appendices/model-comparison/" },
    ],
  },

  // ── 12. Cursor Modes ───────────────────────────────────────
  {
    id: "cursor-modes",
    kicker: "Practical Guide",
    title: "Modes: Match the Tool to the Task",
    sections: [
      {
        heading: "Agent mode (default)",
        points: [
          "Autonomous multi-file edits, terminal commands, error fixing. Use for implementation work.",
          "Example: \"Add a new gRPC health-check endpoint to the order service with tests.\"",
        ],
      },
      {
        heading: "Ask mode",
        points: [
          "Read-only exploration. Search tools only, no edits.",
          "Example: \"How does our position aggregator handle cross-venue netting?\" — get an answer without risking changes.",
        ],
      },
      {
        heading: "Plan mode",
        points: [
          "Design first, implement second. Agent researches, asks clarifying questions, produces a reviewable plan.",
          "Example: \"Plan a migration from our REST API to gRPC for the market data service.\" — review the plan, then let Agent execute.",
          "Tip: if Agent builds something wrong, revert and refine the plan instead of chasing fixes.",
        ],
      },
      {
        heading: "Debug mode",
        points: [
          "Hypothesis-driven debugging with runtime evidence. Adds log instrumentation, asks you to reproduce, analyzes logs.",
          "Example: \"Orders are occasionally rejected with INSUFFICIENT_MARGIN but the pre-trade check passes.\" — Debug mode instruments the margin calculator and traces the exact path.",
        ],
      },
    ],
    citations: [
      { label: "Cursor Modes docs", url: "https://cursor.com/docs/agent/modes" },
      { label: "Cursor Agent overview", url: "https://cursor.com/docs/agent/overview" },
    ],
  },

  // ── 13. Context Management ─────────────────────────────────
  {
    id: "context-management",
    kicker: "Practical Guide",
    title: "Context Management: Get More From Every Token",
    sections: [
      {
        heading: "@-mentions",
        points: [
          "Use @file, @folder, @web, @docs to explicitly pull in context. This is more token-efficient than letting the agent explore.",
          "Example: @src/risk/margin.go \"add a circuit breaker that halts trading when drawdown exceeds 2%\" — you skip the exploration phase entirely.",
        ],
      },
      {
        heading: ".cursorignore",
        points: [
          "Exclude build artifacts, node_modules, vendor/, generated protobuf stubs, and large data files from indexing.",
          "This reduces index size, speeds up semantic search, and prevents irrelevant results from consuming tokens.",
        ],
      },
      {
        heading: "Conversation hygiene",
        points: [
          "Start a new conversation for each distinct task. A 10-message history can consume 20–40k tokens.",
          "For multi-step work, use Plan mode to scope first, then a fresh Agent session to implement.",
          "Pin important context with @-mentions rather than relying on the agent to re-discover it.",
        ],
      },
    ],
    citations: [
      { label: "Token Management", url: "https://developertoolkit.ai/en/cursor-ide/advanced-techniques/token-management/" },
      { label: "Context Management", url: "https://developertoolkit.ai/en/shared-workflows/context-management/" },
    ],
  },

  // ── 14. Team Configuration ─────────────────────────────────
  {
    id: "team-config",
    kicker: "Team Setup",
    title: "Configuring Cursor for Your Team",
    sections: [
      {
        heading: "Shared project rules",
        points: [
          "Check .cursor/rules/ into version control. Every clone gets consistent AI behavior.",
          "Start with 3–5 foundational rules: code style, error handling patterns, test conventions, deployment safety.",
        ],
      },
      {
        heading: "Team Rules (dashboard)",
        points: [
          "On Team/Enterprise plans, use dashboard-managed Team Rules for org-wide standards.",
          "These have highest priority and can't be overridden by project or user rules.",
          "Example: \"All database migrations must be backward-compatible. Never drop columns without a deprecation period.\"",
        ],
      },
      {
        heading: "Rule maintenance",
        points: [
          "Treat rules like code: quarterly audits, update from code review findings, include in PR reviews.",
          "Split rules over 200 lines into separate files. Keep each rule focused and actionable.",
        ],
      },
      {
        heading: "Recommended settings",
        points: [
          "Enable codebase indexing (Settings → Features → Codebase Indexing).",
          "Configure .cursorignore early — it compounds over time.",
          "Set up MCP servers for your team's tools (GitHub, Slack, monitoring) before onboarding.",
          "Establish a shared /commands library for recurring workflows.",
        ],
      },
    ],
    citations: [
      { label: "Team setup docs", url: "https://docs.cursor.com/account/teams/setup" },
      { label: "Team Collaboration guide", url: "https://developertoolkit.ai/en/cursor-ide/advanced-techniques/team-collaboration/" },
      { label: "Cursor Rules guide", url: "https://design.dev/guides/cursor-rules/" },
    ],
  },

  // ── 15. MCP at Edgehog ─────────────────────────────────────
  {
    id: "mcp-edgehog",
    kicker: "Our Setup",
    title: "MCP Servers We Use at Edgehog",
    sections: [
      {
        heading: "Development workflow",
        points: [
          "GitHub MCP — create repos, push files, manage PRs without leaving the editor. Used to scaffold this very project.",
          "Linear MCP — create tickets, update status, link PRs to issues. Agent can auto-create a ticket when it finds a bug.",
          "Supabase / Neon MCP — manage database schemas, run queries, handle migrations during development.",
        ],
      },
      {
        heading: "Operations & monitoring",
        points: [
          "Slack MCP — post deployment summaries, incident alerts, and daily build reports to team channels.",
          "Context7 MCP — query live documentation for any library. Agent always has up-to-date API references.",
        ],
      },
      {
        heading: "How to add a new MCP server",
        points: [
          "Settings → Features → MCP → Add New MCP Server.",
          "Choose transport: stdio (local process) or SSE/HTTP (remote service).",
          "The agent auto-discovers available tools and uses them when relevant.",
          "Tip: read the tool descriptor JSON before first use — know what params are required.",
        ],
      },
    ],
    citations: [
      { label: "Cursor MCP docs", url: "https://cursor.com/docs/context/mcp" },
      { label: "MCP Server concepts", url: "https://modelcontextprotocol.io/docs/learn/server-concepts" },
    ],
  },

  // ── 16. Practical Loop ─────────────────────────────────────
  {
    id: "workflow-loop",
    kicker: "Execution Pattern",
    title: "The High-Leverage Cursor Loop",
    image: { src: "/diagrams/workflow-loop.png", alt: "5-step Cursor workflow loop diagram" },
    sections: [
      {
        heading: "The 5-step loop",
        points: [
          "1. Clarify — scope the task precisely. Ambiguity wastes tokens and produces wrong output.",
          "2. Plan — for non-trivial work, use Plan mode. Review before executing.",
          "3. Execute — use Agent with targeted @-mentions. Small checkpoints, not one massive prompt.",
          "4. Validate — lint, type-check, test. Use Debug mode for unexpected failures.",
          "5. Capture — distill learnings into rules, skills, or commands for next time.",
        ],
      },
      {
        heading: "HFT example: adding a new venue",
        points: [
          "1. Clarify: \"Add Venue X. It uses FIX 4.4, has rate limits of 50 msg/s, and requires TLS client certs.\"",
          "2. Plan: Agent maps affected files (connector, config, tests, docs), asks about order types supported.",
          "3. Execute: Agent scaffolds the connector, config schema, mock server, and integration tests.",
          "4. Validate: Run tests, check TLS handshake in dev, verify rate limiter.",
          "5. Capture: Update the \"Add venue\" skill with any new patterns learned.",
        ],
      },
    ],
    citations: [
      { label: "Cursor Plan mode", url: "https://cursor.com/docs/agent/modes" },
      { label: "Cursor Rules", url: "https://cursor.com/docs/context/rules" },
    ],
  },

  // ── 17. Anti-Patterns ──────────────────────────────────────
  {
    id: "anti-patterns",
    kicker: "Watch Out",
    title: "Common Mistakes (and Fixes)",
    sections: [
      {
        points: [
          "Vague prompts → Wasted tokens + wrong output. Fix: be specific about inputs, outputs, and constraints.",
          "Never starting new conversations → History bloat eats your context budget. Fix: fresh chat per task.",
          "Too many always-apply rules → 2k+ tokens consumed before you even type. Fix: use glob-scoped or intelligent activation.",
          "Skipping Plan mode for complex work → Agent goes in circles. Fix: plan first, implement second.",
          "Not using .cursorignore → Noisy search results, slow indexing. Fix: exclude build artifacts and generated files.",
          "Ignoring checkpoints → One bad agent run destroys 30 minutes of work. Fix: commit frequently, use git checkpoints.",
        ],
      },
    ],
    citations: [
      { label: "Cursor Agent overview", url: "https://cursor.com/docs/agent/overview" },
      { label: "Token Management", url: "https://developertoolkit.ai/en/cursor-ide/advanced-techniques/token-management/" },
    ],
  },

  // ── 18. Quick Reference ────────────────────────────────────
  {
    id: "quick-ref",
    kicker: "Cheat Sheet",
    title: "Cursor 2.5 Quick Reference",
    sections: [
      {
        heading: "Key shortcuts",
        points: [
          "Cmd/Ctrl+L — Open Agent chat.",
          "Cmd/Ctrl+. — Switch modes (Agent / Ask / Plan / Debug).",
          "Shift+Tab — Rotate to Plan mode from chat input.",
          "@ — Mention files, folders, docs, web, or codebase.",
          "/ — Run custom commands.",
        ],
      },
      {
        heading: "File locations",
        points: [
          ".cursor/rules/*.mdc — Project rules with frontmatter.",
          ".cursor/commands/*.md — Custom slash commands.",
          ".cursor/skills/*/SKILL.md — Agent skills.",
          ".cursorignore — Files to exclude from indexing.",
          "mcp.json or Settings → Features → MCP — MCP server config.",
        ],
      },
      {
        heading: "Model quick picks",
        points: [
          "Daily work → Opus 4.6 non-thinking.",
          "Hard debugging → Opus 4.6 thinking.",
          "Frontier reasoning → Opus 4.6 thinking, max effort.",
          "Budget bulk → Sonnet 4.5.",
          "Quick edits → Fast/Composer model.",
        ],
      },
    ],
    citations: [
      { label: "Cursor Docs", url: "https://cursor.com/docs" },
      { label: "Cursor Models", url: "https://cursor.com/docs/models" },
    ],
  },
];
