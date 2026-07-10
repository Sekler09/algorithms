import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type Difficulty = "Easy" | "Medium" | "Hard";

interface Problem {
  id: number;
  slug: string;
  title: string;
  difficulty: Difficulty;
  dir: string;
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROBLEMS_DIR = path.join(ROOT, "src", "problems");
const CACHE_PATH = path.join(ROOT, "scripts", "difficulty-cache.json");
const README_PATH = path.join(ROOT, "README.md");

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Easy: "#1cbaba",
  Medium: "#ffb700",
  Hard: "#f63737",
};

async function loadCache(): Promise<Record<string, Difficulty>> {
  try {
    const raw = await readFile(CACHE_PATH, "utf8");
    return JSON.parse(raw) as Record<string, Difficulty>;
  } catch {
    return {};
  }
}

async function saveCache(cache: Record<string, Difficulty>): Promise<void> {
  const sorted = Object.fromEntries(
    Object.entries(cache).sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeFile(CACHE_PATH, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
}

async function fetchDifficulty(slug: string): Promise<Difficulty | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: `query($titleSlug:String!){question(titleSlug:$titleSlug){difficulty}}`,
        variables: { titleSlug: slug },
      }),
    });

    if (!res.ok) return null;

    const json = (await res.json()) as {
      data?: { question?: { difficulty?: Difficulty } };
    };
    return json.data?.question?.difficulty ?? null;
  } catch {
    return null;
  }
}

function parseFolder(name: string): { id: number; slug: string } | null {
  const match = name.match(/^(\d+)-(.+)$/);
  if (!match) return null;
  return { id: Number(match[1]), slug: match[2] };
}

function parseTitle(source: string, id: number): string | null {
  const match = source.match(new RegExp(`\\[${id}\\]\\s+(.+)`));
  return match?.[1]?.trim() ?? null;
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function difficultyBadge(difficulty: Difficulty): string {
  const color = DIFFICULTY_COLORS[difficulty].slice(1);
  return `![${difficulty}](https://img.shields.io/badge/-${difficulty}-${color})`;
}

async function collectProblems(
  cache: Record<string, Difficulty>,
): Promise<{ problems: Problem[]; cacheDirty: boolean }> {
  const entries = await readdir(PROBLEMS_DIR, { withFileTypes: true });
  const problems: Problem[] = [];
  let cacheDirty = false;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const parsed = parseFolder(entry.name);
    if (!parsed) continue;

    const solutionPath = path.join(PROBLEMS_DIR, entry.name, "solution.ts");
    let title = titleFromSlug(parsed.slug);

    try {
      const source = await readFile(solutionPath, "utf8");
      title = parseTitle(source, parsed.id) ?? title;
    } catch {
      // keep slug-derived title
    }

    let difficulty = cache[parsed.slug];
    if (!difficulty) {
      const fetched = await fetchDifficulty(parsed.slug);
      if (fetched) {
        difficulty = fetched;
        cache[parsed.slug] = fetched;
        cacheDirty = true;
      } else {
        console.warn(
          `Unknown difficulty for ${parsed.slug}; defaulting to Medium`,
        );
        difficulty = "Medium";
      }
    }

    problems.push({
      id: parsed.id,
      slug: parsed.slug,
      title,
      difficulty,
      dir: entry.name,
    });
  }

  problems.sort((a, b) => a.id - b.id);
  return { problems, cacheDirty };
}

function renderReadme(problems: Problem[]): string {
  const total = problems.length;
  const byDifficulty: Record<Difficulty, number> = {
    Easy: 0,
    Medium: 0,
    Hard: 0,
  };

  for (const problem of problems) {
    byDifficulty[problem.difficulty] += 1;
  }

  const levels = ["Easy", "Medium", "Hard"] as Difficulty[];
  const generatedAt = new Date().toISOString().slice(0, 10);

  const pieColors = levels
    .map((level, index) => `"pie${index + 1}": "${DIFFICULTY_COLORS[level]}"`)
    .join(", ");
  const init = `%%{init: {"themeVariables": {${pieColors}}}}%%`;
  const pieSlices = levels
    .map((level) => `    "${level}" : ${byDifficulty[level]}`)
    .join("\n");

  const chart = `\`\`\`mermaid
${init}
pie showData
    title Solved by difficulty
${pieSlices}
\`\`\``;

  const rows = problems
    .map((problem) => {
      const leetcode = `https://leetcode.com/problems/${problem.slug}/`;
      const local = `./src/problems/${problem.dir}/solution.ts`;
      return `| ${problem.id} | [${problem.title}](${leetcode}) | ${difficultyBadge(problem.difficulty)} | [solution](${local}) |`;
    })
    .join("\n");

  return `# Algorithms

TypeScript solutions to LeetCode problems, each with Vitest coverage.

## Progress

**${total}** problems solved

${chart}

## Problem index

| # | Problem | Difficulty | Code |
| -: | ------- | ---------- | ---- |
${rows}

---

<sub>Generated by \`npm run readme\` · ${generatedAt}</sub>
`;
}

async function main(): Promise<void> {
  const cache = await loadCache();
  const { problems, cacheDirty } = await collectProblems(cache);

  if (cacheDirty) {
    await saveCache(cache);
  }

  const readme = renderReadme(problems);
  await writeFile(README_PATH, `${readme.trimEnd()}\n`, "utf8");

  console.log(`Wrote README.md with ${problems.length} problems`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
