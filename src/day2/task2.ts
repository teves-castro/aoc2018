import { ids } from "./input.json"
import { chainFrom } from "transducist/cjs"
import { zip } from "ramda"

const stringMatch = (s1: string, s2: string) =>
  zip(s1.split(""), s2.split(""))
    .filter(([c1, c2]) => c1 === c2)
    .map(([c1]) => c1)
    .join("")

const result = chainFrom(ids)
  .mapIndexed<[string, number]>((id, i) => [id, i])
  .flatMap(([id1, i]) =>
    chainFrom(ids)
      .drop(i)
      .map(id2 => stringMatch(id1, id2))
      .filter(matching => matching.length === id1.length - 1)
      .toIterator(),
  )
  .first()

console.log(result)
