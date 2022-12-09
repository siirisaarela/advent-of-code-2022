const { readFileSync } = require("fs")

function getMaxCalories(elf: string): number {
  const elves = elf.split("\n\n")
  const calories = elves.map((elf) =>
    elf
      .split("\n")
      .map((item) => parseInt(item.trim()))
      .reduce((previous, current) => previous + current)
  )
  const maxCalories = calories.sort((a, b) => a - b).reverse()[0]
  return maxCalories
}

describe("Advent of code - Day 1", () => {
  it("Given one elf, returns its calories", () => {
    const elf = "10000"
    expect(getMaxCalories(elf)).toEqual(10000)
  })

  it("Given an elf with two items, returns max calories", () => {
    const elf = `7000
  8000
  9000`

    expect(getMaxCalories(elf)).toEqual(24000)
  })

  it("Given two elves with one or more items, returns max calories", () => {
    const elf = `7000
8000
9000

10000`

    expect(getMaxCalories(elf)).toEqual(24000)
  })

  it("Given multiple elves with one or more items, returns max calories", () => {
    const elf = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

    expect(getMaxCalories(elf)).toEqual(24000)
  })

  it("Given all the data, returns max calories", () => {
    const file = readFileSync("src/test/day1/data.txt").toString("utf-8")
    expect(getMaxCalories(file)).toEqual(70720)
  })
})
