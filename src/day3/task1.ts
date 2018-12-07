import { chainFrom } from "transducist/cjs"

const instructions: ReadonlyArray<string> = [
  "Step C must be finished before step A can begin.",
  "Step C must be finished before step F can begin.",
  "Step A must be finished before step B can begin.",
  "Step A must be finished before step D can begin.",
  "Step B must be finished before step E can begin.",
  "Step D must be finished before step E can begin.",
  "Step F must be finished before step E can begin.",
]

console.log(
  chainFrom(instructions)
    .map(i => i.split(" "))
    .map(words => [words[1], words[7]])
    .toArray(),
)
