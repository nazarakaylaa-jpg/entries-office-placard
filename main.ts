// Office Artifacts: The One-Line Placard Contest
// u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2
//
// A program that drafts several one-line museum placards for ordinary office
// objects recast as ancient artifacts, scores each one honestly against the
// judge's brief (in order: conceit, dryness, economy, label craft), picks the
// best, and writes it to /output/entry.txt.
//
// Judge criteria, most important first:
//   1. Conceit: the object recast as an artifact with a specific, surprising
//      imagined history, not a generic office joke.
//   2. Dryness: deadpan curator's voice; the joke lands without straining.
//   3. Economy: one line inside 180 characters, every word earning its place.
//   4. Label craft: catalogue details (date, material, provenance, donor)
//      used to sell the joke.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Scores = {
  conceit: number; // 0-10: specific, surprising imagined history
  dryness: number; // 0-10: deadpan, unstrained
  economy: number; // 0-10: every word earns its place, reads well aloud
  craft: number; // 0-10: date / material / provenance / donor sell the joke
};

type Candidate = {
  object: string;
  text: string;
  scores: Scores;
  notes: string;
};

const candidates: Candidate[] = [
  {
    object: "hole punch",
    text: "Hole punch, c. 1300 BCE. Bronze, oak. Punched the holes through which the gods filed the heavens. Gift of the Bureau of Holes.",
    scores: { conceit: 9, dryness: 9, economy: 9, craft: 9 },
    notes:
      "The conceit does real work: a filing system for the heavens turns a desk tool into cosmology. 'Bureau of Holes' is dry and specific, and every clause is a catalogue fact (date, materials, donor) that also carries the joke. No wasted words.",
  },
  {
    object: "sticky note",
    text: "Sticky note, c. 900 BCE. Papyrus, beeswax. A reminder the scribe could not commit to stone. Gift of the Ministry of Second Thoughts.",
    scores: { conceit: 9, dryness: 8, economy: 9, craft: 8 },
    notes:
      "Strong conceit: impermanence as a feature, not a flaw. 'Could not commit to stone' is dry and true to the object. Loses a little to the hole punch because 'Ministry of Second Thoughts' explains the joke a touch more than 'Bureau of Holes' does.",
  },
  {
    object: "stapler",
    text: "Stapler, c. 1400 BCE. Iron, bone. Bound the scrolls the empire could not afford to lose. Gift of the Department of Binding.",
    scores: { conceit: 8, dryness: 8, economy: 8, craft: 7 },
    notes:
      "Solid but the most predictable of the set: binding scrolls is the first idea a stapler suggests, and 'Department of Binding' restates the object instead of surprising. Good label craft, no wasted words.",
  },
  {
    object: "computer mouse",
    text: "Mouse, c. 1100 BCE. Bronze, cedar. Guided the priest's hand across the clay of the first spreadsheet. Gift of the Office of Small Movements.",
    scores: { conceit: 8, dryness: 7, economy: 7, craft: 7 },
    notes:
      "'First spreadsheet' is a nice anachronism, but the line leans on it and runs long; 'Office of Small Movements' is cute rather than dry. The conceit is a hand guiding, which is thinner than the punch's cosmology.",
  },
  {
    object: "microwave",
    text: "Microwave, c. 800 BCE. Clay, obsidian. Warmed the offerings of the god of leftovers. Gift of the Temple of the Second Helping.",
    scores: { conceit: 7, dryness: 8, economy: 8, craft: 7 },
    notes:
      "'God of leftovers' is dry and funny, but warming food is what a microwave does: the recasting is shallow, and 'Second Helping' is a second joke on the same note instead of a new one.",
  },
  {
    object: "lanyard",
    text: "Lanyard, c. 1500 BCE. Linen, gold thread. Bore the name of a courtier no one remembers. Gift of the Keepers of the Badge.",
    scores: { conceit: 7, dryness: 7, economy: 7, craft: 7 },
    notes:
      "A name nobody remembers is a good dry beat, but the object does almost nothing in the line: any badge could wear this placard. The conceit is generic where the hole punch's is specific.",
  },
];

// Weighted total, following the judge's order: conceit first, then dryness,
// economy, then label craft.
function total(s: Scores): number {
  return s.conceit * 0.4 + s.dryness * 0.25 + s.economy * 0.2 + s.craft * 0.15;
}

function charCount(text: string): number {
  return [...text].length; // code points, so the gate's character count matches
}

function validate(text: string): string[] {
  const problems: string[] = [];
  if (charCount(text) < 1 || charCount(text) > 180) {
    problems.push(`length ${charCount(text)} outside 1-180`);
  }
  if (text.trim().length === 0) problems.push("only whitespace");
  if (text.includes("\n") || text.includes("\r")) {
    problems.push("more than one line");
  }
  // A JS string is already Unicode; the real check is that it round-trips
  // through UTF-8 encoding unchanged (no lone surrogates, no loss).
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    problems.push("does not round-trip through UTF-8");
  }
  return problems;
}

const ranked = candidates
  .map((c) => ({ ...c, total: total(c.scores), chars: charCount(c.text) }))
  .filter((c) => validate(c.text).length === 0)
  .sort((a, b) => b.total - a.total || a.chars - b.chars);

for (const c of ranked) {
  console.log(
    `${c.total.toFixed(1)}/10  (${c.chars} chars)  ${c.object}: ${c.text}`,
  );
  console.log(`   conceit ${c.scores.conceit}, dryness ${c.scores.dryness}, economy ${c.scores.economy}, craft ${c.scores.craft} — ${c.notes}`);
}

if (ranked.length === 0) throw new Error("no valid candidate");

const winner = ranked[0];
console.log(`\nWinner: ${winner.object} — ${winner.chars} characters`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.text, "utf8");

// Read back and confirm the gate passes on exactly what was written.
const written = readFileSync("/output/entry.txt", "utf8");
const problems = validate(written);
if (written !== winner.text) throw new Error("read-back differs from winner");
if (problems.length > 0) {
  throw new Error(`gate failed: ${problems.join("; ")}`);
}
console.log(`Wrote /output/entry.txt (${charCount(written)} chars): ${written}`);
