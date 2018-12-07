import { ids } from "./input.json"
import { chainFrom } from "transducist/cjs"

const countLetter = (s: string) => (letter: string) =>
  chainFrom(s)
    .filter(c => c === letter)
    .count()

const [twoes, threes] = chainFrom(ids)
  .map(s =>
    chainFrom(s)
      .map(countLetter(s))
      .toArray(),
  )
  .map(counts => [counts.includes(2) ? 1 : 0, counts.includes(3) ? 1 : 0])
  .reduce(([sumTwo, sumThree], [two, three]) => [sumTwo + two, sumThree + three], [0, 0])

console.log(twoes * threes)
