import { IReadFiles, TextFileReader } from '../../FileReader';
import { Solver } from '../../Solver'

type Crates = { [key: number]: string[] }

const initialCrates: Crates = {
 1: ["D", "T", "R", "B", "J", "L", "W", "G"],
 2: ["S", "W", "C"],
 3: ["R", "Z", "T", "M"],
 4: ["D", "T", "C", "H", "S", "P", "V"],
 5: ["G", "P", "T", "L", "D", "Z"],
 6: ["F", "B", "R", "Z", "J", "Q", "C", "D"],
 7: ["S", "B", "D", "J", "M", "F", "T", "R"],
 8: ["L", "H", "R", "B", "T", "V", "M"],
 9: ["Q", "P", "D", "S", "V"]
}

const initialCrates2: Crates = {
 1: ["Z", "N"],
 2: ["M", "C", "D"],
 3: ["P"]
}

describe("Advent of code day 5", () => {
 let fileReader: IReadFiles
  let realData: any
  let sampleData: any
  let sampleCrates: any

  beforeEach(async () => {
    fileReader = new TextFileReader(__dirname)
    realData = await fileReader.readFile('data.txt');
    sampleData = await fileReader.readFile('sampleData.txt');
    sampleCrates = initialCrates2
  })

class DayFiveSolver extends Solver {
 crates: any

 constructor(sampleData: any, crates: any) {
  super(sampleData)
  this.crates = crates
}

 format(): string[][] {
  const formattedData = this.rawData
   .map((item: string) => item.split(" "))
   .map((item: string[]) => { return { move: parseInt(item[1]), from: parseInt(item[3]), to: parseInt(item[5]) } })
  this.formattedData = formattedData
  return formattedData
 }

 applyStack(useCrateMover9001: boolean): any {
  this.formattedData.forEach((instruction: any) => {
    const fromArray = this.crates[instruction.from]
    const numberToRemove = instruction.move
    const toArray = this.crates[instruction.to]

    const removedCrates = fromArray.splice(fromArray.length - numberToRemove, numberToRemove)
    if (useCrateMover9001) { 
     toArray.push(...removedCrates)
    } else { 
     toArray.push(...removedCrates.reverse())
    }
  })
  
  return this.crates
 }

 getTopStacks(): string {
  const keys = Object.keys(this.crates)
  let topStacks = ''
  keys.forEach((key) => {
   const character = this.crates[key][this.crates[key].length - 1]
   topStacks += character
  })
  return topStacks
 }

}

describe("Setup", () => {
 it("Formats data", async () => {
  const expectedFormat = [ 
   { move: 1, from: 2, to: 1 },
   { move: 3, from: 1, to: 3 },
   { move: 2, from: 2, to: 1 },
   { move: 1, from: 1, to: 2 },
  ]

  const solver = new DayFiveSolver(sampleData, sampleCrates)
  expect(solver.format()).toEqual(expectedFormat)
 });
});

 it("Applies stacks to sample data", async () => {
  const solver = new DayFiveSolver(sampleData, sampleCrates)
  solver.format()

  const rearrangedCrates = {
   1: ["C"],
   2: ["M"],
   3: ["P", "D", "N", "Z"]
  }

  expect(solver.applyStack(false)).toEqual(rearrangedCrates)
  expect(solver.getTopStacks()).toEqual("CMZ")

 });

 it("Applies stacks to real data", async () => {
  const solver = new DayFiveSolver(realData, initialCrates)
  solver.format()

  const partTwoFlag = true
  if (partTwoFlag) {
   // Part two
   expect(solver.applyStack(true)).toEqual(expect.any(Object))
   expect(solver.getTopStacks()).toEqual("VRZGHDFBQ")
  } else {
   // Part one
   expect(solver.applyStack(false)).toEqual(expect.any(Object))
   expect(solver.getTopStacks()).toEqual("SHMSDGZVC")
  }
 });
});
