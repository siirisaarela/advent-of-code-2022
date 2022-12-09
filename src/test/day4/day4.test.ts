import { IReadFiles, TextFileReader } from "../../FileReader"

describe("Advent of code day 4", () => {
  let fileReader: IReadFiles
  let realData: any
  let sampleData: any

  beforeEach(async () => {
    fileReader = new TextFileReader(__dirname)
    realData = await fileReader.readFile("data.txt")
    sampleData = await fileReader.readFile("sampleData.txt")
  })

  class DayFourSolver {
    readonly rawData: any
    formattedData: any

    constructor(rawData: any) {
      this.rawData = rawData
      this.formattedData = []
    }

    format(): string[][] {
      const formattedData = this.rawData.map((item: string) =>
        item.split(",").map((item: string) => item.split("-").map((item) => parseInt(item)))
      )
      this.formattedData = formattedData
      return formattedData
    }

    isFullyOverlappingSection(pair: number[][]): boolean {
      const section1 = pair[0]
      const section2 = pair[1]
      if (section1[0] <= section2[0] && section1[1] >= section2[1]) return true
      if (section2[0] <= section1[0] && section2[1] >= section1[1]) return true
      return false
    }

    getOutcomePartOne(): number {
      this.format()
      let count = 0
      this.formattedData.forEach((item: number[][]) => {
        if (this.isFullyOverlappingSection(item)) count++
      })
      return count
    }

    isOverlappingSection(pair: number[][]): boolean {
      const section1 = pair[0]
      const section2 = pair[1]
      if (section1[0] < section2[0] && section1[1] < section2[0]) return false
      if (section2[0] < section1[0] && section2[1] < section1[0]) return false
      return true
    }

    getOutcomePartTwo(): number {
      this.format()
      let count = 0
      this.formattedData.forEach((item: number[][]) => {
        if (this.isOverlappingSection(item)) count++
      })
      return count
    }
  }

  describe("Setup", () => {
    it("Formats data", async () => {
      const expectedFormat = [
        [
          [2, 4],
          [6, 8]
        ],
        [
          [2, 3],
          [4, 5]
        ],
        [
          [5, 7],
          [7, 9]
        ],
        [
          [2, 8],
          [3, 7]
        ],
        [
          [6, 6],
          [4, 6]
        ],
        [
          [2, 6],
          [4, 8]
        ]
      ]
      const solver = new DayFourSolver(sampleData)
      expect(solver.format()).toEqual(expectedFormat)
    })
  })

  describe("Part 1", () => {
    it("Computes if section fully overlaps", async () => {
      const solver = new DayFourSolver(sampleData)
      expect(
        solver.isFullyOverlappingSection([
          [2, 4],
          [6, 8]
        ])
      ).toEqual(false)
      expect(
        solver.isFullyOverlappingSection([
          [2, 8],
          [3, 8]
        ])
      ).toEqual(true)
      expect(
        solver.isFullyOverlappingSection([
          [6, 6],
          [4, 6]
        ])
      ).toEqual(true)
      expect(
        solver.isFullyOverlappingSection([
          [64, 75],
          [1, 76]
        ])
      ).toEqual(true)
    })

    it("Count number of pairs where there is full overlap", async () => {
      const sampleSolver = new DayFourSolver(sampleData)
      expect(sampleSolver.getOutcomePartOne()).toEqual(2)

      const solver = new DayFourSolver(realData)
      expect(solver.getOutcomePartOne()).toEqual(599)
    })
  })

  describe("Part 2", () => {
    it("Computes if section has any overlap", async () => {
      const solver = new DayFourSolver(sampleData)
      expect(
        solver.isOverlappingSection([
          [2, 4],
          [6, 8]
        ])
      ).toEqual(false)
      expect(
        solver.isOverlappingSection([
          [6, 6],
          [7, 8]
        ])
      ).toEqual(false)
      expect(
        solver.isOverlappingSection([
          [2, 8],
          [3, 8]
        ])
      ).toEqual(true)
      expect(
        solver.isOverlappingSection([
          [64, 75],
          [1, 76]
        ])
      ).toEqual(true)
      expect(
        solver.isOverlappingSection([
          [5, 7],
          [7, 9]
        ])
      ).toEqual(true)
    })

    it("Count number of pairs where there is any overlap", async () => {
      const sampleSolver = new DayFourSolver(sampleData)
      expect(sampleSolver.getOutcomePartTwo()).toEqual(4)

      const solver = new DayFourSolver(realData)
      expect(solver.getOutcomePartTwo()).toEqual(928)
    })
  })
})
