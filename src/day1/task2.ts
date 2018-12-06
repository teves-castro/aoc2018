import { input } from "./input.json"
import { chainFrom, reduced } from "transducist/cjs"

function* infiniteInput(): IterableIterator<number> {
  yield* input
  yield* infiniteInput()
}

const values = () => chainFrom(infiniteInput())

type State = [Set<number>, number]
const [_, sum] = values().reduce<State>(
  ([set, sum], df) => {
    const nextSum = sum + df
    return set.has(nextSum) ? reduced<State>([set, nextSum]) : [set.add(sum), nextSum]
  },
  [new Set(), 0],
)

console.log(sum)
