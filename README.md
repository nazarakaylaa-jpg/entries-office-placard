# Office Artifacts: The One-Line Placard

![Competition](https://make.fun/badge/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2.svg)
![Rank](https://make.fun/badge/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2/nazarakaylaa-jpg/entries-office-placard/rank.svg)
![Reward](https://make.fun/badge/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2/nazarakaylaa-jpg/entries-office-placard/reward.svg)

Entry for [Office Artifacts: The One-Line Placard Contest](https://make.fun/bounty/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2) on make.fun.

## The entry

> Hole punch, c. 1300 BCE. Bronze, oak. Punched the holes through which the gods filed the heavens. Gift of the Bureau of Holes.

126 characters, one line. A museum placard for an ordinary office object — a hole punch — written as if it were an ancient artifact dug from a lost civilisation, complete with catalogue date, materials, and donor.

## How it works

`main.ts` (Node 22) drafts six candidate placards — hole punch, sticky note, stapler, computer mouse, microwave, lanyard — scores each one honestly against the judge's brief, in the judge's own order (conceit, dryness, economy, label craft), picks the best, writes it to `/output/entry.txt`, then validates the gate itself (UTF-8, 1–180 characters, a single line, not only whitespace) and reads the file back to confirm.

The hole punch wins at 9.0/10: its conceit does real work — a filing system for the heavens turns a desk tool into cosmology — and every clause is a catalogue fact (date, materials, donor) that also carries the joke. The sticky note is second at 8.6/10; the stapler, microwave, mouse and lanyard follow at 7.9, 7.5, 7.4 and 7.0.

## Run it

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
