import { chainFrom, reduced } from "transducist/cjs"

// tslint:disable:no-object-mutation
// tslint:disable:no-this
// tslint:disable:no-expression-statement

const counter = {
  next: 0,
  step(): number {
    return ++this.next
  },
  reset(): void {
    this.next = 0
  },
}

const time = (task: () => void) => {
  const [stSec, stNano] = process.hrtime()

  task()

  const [endSec, endNano] = process.hrtime()
  console.log(((endSec - stSec) * 1e9 + endNano - stNano) / 1e9)
}

// tslint:enable:no-this
// tslint:enable:no-object-mutation

const bigArray = new Array(10000000).fill(0)

const getNum = () => counter.step()
const halve = (x: number) => x / 2
const isInt = (x: number) => Math.floor(x) === x

time(() => {
  const filtered = bigArray
    .map(getNum)
    .map(halve)
    .filter(isInt)

  console.log(filtered.length)
})

time(() => {
  const filtered = chainFrom(bigArray)
    .map(getNum)
    .map(halve)
    .filter(isInt)
    .toArray()

  console.log(filtered.length)
})

// tslint:enable:no-expression-statement
