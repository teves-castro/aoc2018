import { instructions } from "./input.json"
import { Map } from "immutable"

type Dependency = [string | null, string | null]

const dependencies = instructions.map(i => i.split(" ")).map<[string, string]>(words => [words[1], words[7]])

const deps = dependencies.reduce(
  (m, [p, c]) => m.set(c, [p, ...(m.get(c) || [])]),
  Map<string, ReadonlyArray<string>>(),
)

const deps1 = dependencies.reduce((m, [p, _]) => (m.has(p) ? m : m.set(p, [])), deps)

const solve = (m: Map<string, ReadonlyArray<string>>, steps: ReadonlyArray<string>): string => {
  // tslint:disable-next-line:no-if-statement
  if (m.isEmpty()) {
    return steps.join("")
  } else {
    const possibleNext = m
      .filter((ds, k) => ds.length === 0)
      .sortBy((_, k) => k)
      .toArray()

    const next = possibleNext.length === 0 ? undefined : possibleNext[0][0]
    const withoutNext = m.filter((_, k) => !next || k !== next).mapEntries(([k, ds]) => [k, ds.filter(d => d !== next)])
    return solve(withoutNext, [...steps, ...(next ? [next] : [])])
  }
}

console.log(solve(deps1, []))
