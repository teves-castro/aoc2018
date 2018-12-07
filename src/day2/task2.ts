import { ids } from "./input.json"
import { chainFrom } from "transducist/cjs"
import { zip } from "ramda"

const stringDiff = ([s1, s2]: [string, string]) =>
  zip(s1.split(""), s2.split("")).filter(([c1, c2]) => c1 !== c2).length

const stringMatch = ([s1, s2]: [string, string]) => (
  console.log(`${s1}\n${s2}`),
  zip(s1.split(""), s2.split(""))
    .filter(([c1, c2]) => c1 === c2)
    .map(([c1]) => c1)
    .join("")
)

// console.log(stringDiff(["fghij", "fguij"]))

const result = ids.sort()

// console.log(result)

const ids1 = result.slice(1)
const ids2 = result.slice(undefined, result.length)

console.log(
  chainFrom(zip(ids1, ids2))
    .map(([s1, s2]) => [s1, s2, stringMatch([s1, s2])])
    .filter(([_, __, id]) => (console.log(id, id.length, "\n"), id.length > 23))
    .toArray(),
)

// console.log(stringMatch(["abbcdeefghijlmnopqrstuuwyz", "abbcddefghijlmnopqrstuvwyz"]), "abbcdefghijlmnopqrstuwyz")

const x =
[ [ 'xdegyjkpruszlbbqxfichvtneo',
    'xdegyjkpbuszlbbqwfichvtneo',
    'xdegyjkp uszlbbq fichvtneo' ],
  [ 'xdmgyjkpruszlbmqhfiohvtneo',
    'xdmgyjkpruszlbmqffidhvtneo',
    'xdmgyjkpruszlbmqf i hvtneo' ],
  [ 'xdmgyjkpruszlbpzwfichvteeo',
    'xdmgyjkpruszlbpqwficwvteeo',
    'xdmgyjkpruszlbpwficvteeo' ] ]
