export type SlideCitation = {
  label: string;
  url: string;
};

export type Slide = {
  id: string;
  kicker: string;
  title: string;
  points: string[];
  citations: SlideCitation[];
};

export const slides: Slide[] = [
  {
    id: "welcome",
    kicker: "Cursor Mastery Deck",
    title: "Modern Cursor Best Practices",
    points: [
      "This mini-course focuses on practical AI-native software delivery: sound mental models, fast feedback loops, and tool-augmented workflows.",
      "You can use this as a team onboarding deck or a solo weekly refresh.",
    ],
    citations: [
      { label: "Cursor Agent overview", url: "https://cursor.com/docs/agent/overview" },
      { label: "Cursor modes", url: "https://cursor.com/docs/agent/modes" },
    ],
  },
  {
    id: "history",
    kicker: "AI / LLM Foundations",
    title: "From Sequence Models to Transformers",
    points: [
      "The Transformer architecture replaced recurrence with attention and became the base of modern LLMs.",
      "This architectural shift enabled stronger parallel training and rapid scaling in model capability.",
    ],
    citations: [
      { label: "Attention Is All You Need (2017)", url: "https://arxiv.org/abs/1706.03762" },
    ],
  },
  {
    id: "alignment",
    kicker: "AI / LLM Foundations",
    title: "Alignment: RLHF and Constitutional AI",
    points: [
      "Instruction-following models improved quality by training with human demonstrations and ranked preferences (RLHF).",
      "Constitutional AI introduced AI feedback guided by explicit principles, aiming for safer and less evasive behavior.",
    ],
    citations: [
      {
        label: "InstructGPT (OpenReview)",
        url: "https://openreview.net/forum?id=TG8KACxEON",
      },
      {
        label: "Anthropic Constitutional AI",
        url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback",
      },
    ],
  },
  {
    id: "risk",
    kicker: "AI / LLM Foundations",
    title: "Risk and Trustworthiness Basics",
    points: [
      "Production use needs governance and risk routines, not only model quality metrics.",
      "NIST AI RMF frames risk management as an ongoing lifecycle activity.",
    ],
    citations: [
      {
        label: "NIST AI Risk Management Framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
    ],
  },
  {
    id: "mcp",
    kicker: "Modern Terms and Tooling",
    title: "MCP: The Tooling Interface Layer",
    points: [
      "Model Context Protocol (MCP) is an open standard to connect AI applications to tools and data systems.",
      "Treat MCP servers like capability packs: search, data APIs, browsers, issue trackers, deployment helpers.",
    ],
    citations: [
      { label: "Model Context Protocol intro", url: "https://modelcontextprotocol.io/introduction" },
      { label: "Cursor MCP docs", url: "https://cursor.com/docs/context/mcp" },
    ],
  },
  {
    id: "cursor-modes",
    kicker: "Cursor Power Features",
    title: "Choose the Right Mode by Problem Shape",
    points: [
      "Agent mode: implementation with tools and edits.",
      "Ask mode: read-only exploration and understanding.",
      "Plan mode: design first, then execute once scoped.",
      "Debug mode: runtime evidence and root-cause first.",
    ],
    citations: [{ label: "Cursor modes", url: "https://cursor.com/docs/agent/modes" }],
  },
  {
    id: "cursor-rules",
    kicker: "Cursor Power Features",
    title: "Rules + MCP = Repeatable Team Throughput",
    points: [
      "Rules provide stable, reusable system guidance for project conventions and execution style.",
      "MCP integrations extend what the agent can do beyond local code: APIs, docs, repos, and platform operations.",
      "Best results come from combining clear rules with narrow, outcome-driven prompts.",
    ],
    citations: [
      { label: "Cursor rules", url: "https://cursor.com/docs/context/rules" },
      { label: "Cursor MCP docs", url: "https://cursor.com/docs/context/mcp" },
      { label: "Cursor agent overview", url: "https://cursor.com/docs/agent/overview" },
    ],
  },
  {
    id: "workflow",
    kicker: "Execution Pattern",
    title: "A High-Leverage Cursor Loop",
    points: [
      "1) Clarify scope and constraints. 2) Plan for non-trivial work. 3) Execute in small checkpoints.",
      "4) Validate with lint/tests/runtime checks. 5) Capture learnings into rules and reusable commands.",
      "This turns one-off wins into durable engineering velocity.",
    ],
    citations: [
      { label: "Cursor plan mode", url: "https://cursor.com/docs/agent/modes" },
      { label: "Cursor rules", url: "https://cursor.com/docs/context/rules" },
    ],
  },
];
