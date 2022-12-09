import { IReadFiles, TextFileReader } from "../../FileReader"

describe("Advent of code day 1", () => {
  let fileReader: IReadFiles

  beforeEach(() => {
    fileReader = new TextFileReader(__dirname)
  })

  it("Part 1 - Get highest calories", async () => {
    const array = await fileReader.readFile("data.txt")

    const testArray1 = ["1", "1", "1", "", "2", "2", "2", "", "3"]
    const testArray2 = ["1", "1", "1", "", "2", "2", "2", "", "5", "90"]

    function getHighestCalories(array: any) {
      let highestCalories = 0
      let currentCalories = 0

      for (let i = 0; i < array.length; i++) {
        const groupEnded = array[i] === ""
        if (groupEnded) {
          if (currentCalories > highestCalories) highestCalories = currentCalories
          currentCalories = 0
        } else {
          currentCalories = currentCalories + +array[i]
        }
      }

      if (highestCalories < currentCalories) highestCalories = currentCalories

      return highestCalories
    }

    expect(getHighestCalories(testArray1)).toEqual(6)
    expect(getHighestCalories(testArray2)).toEqual(95)
    expect(getHighestCalories(array)).toEqual(70720)
  })

  it("Part 2 - Get highest calories of top 3 reindeer", async () => {
    const array = await fileReader.readFile("data.txt")

    const testArray1 = ["1", "1", "", "1", "1", "1", "", "1", "1", "1", "1", "", "1", "1", "1", "1", "1"]
    const testArray2 = ["50", "25", "25", "", "2", "2", "2", "", "10", "90", "", "50", "50"]

    function getHighestCalories(array: any) {
      let currentCalories = 0
      const calorieGroups: number[] = []

      for (let i = 0; i < array.length; i++) {
        const groupEnded = array[i] === ""
        if (groupEnded) {
          calorieGroups.push(currentCalories)
          currentCalories = 0
        } else {
          currentCalories = currentCalories + +array[i]
        }
      }
      calorieGroups.push(currentCalories)

      const topThreeCalories = calorieGroups.sort((a, b) => b - a).slice(0, 3)
      const topThreeCaloriesSum = topThreeCalories.reduce((a, b) => a + b, 0)

      return topThreeCaloriesSum
    }

    expect(getHighestCalories(testArray1)).toEqual(12)
    expect(getHighestCalories(testArray2)).toEqual(300)
    expect(getHighestCalories(array)).toEqual(207148)
  })
})
