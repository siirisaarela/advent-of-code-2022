import { IReadFiles, TextFileReader } from "../../FileReader"

type OpponentChoice = "A" | "B" | "C"
type MyChoice = "X" | "Y" | "Z"
type UnformattedGame = `${OpponentChoice} ${MyChoice}`
type Game = [OpponentChoice, MyChoice]

describe("Advent of code day 2", () => {
  let fileReader: IReadFiles

  beforeEach(() => {
    fileReader = new TextFileReader(__dirname)
  })

  it("Part 1 - Count rock paper scissors score", async () => {
    const winningMappings = {
      "A": "Y", // Rock, Paper
      "B": "Z", // Paper, Scissors
      "C": "X" // Scissors, Rock
    }

    const tieMappings = {
      "A": "X", // Rock, Rock
      "B": "Y", // Paper, Paper
      "C": "Z" // Scissors, Scissors
    }

    const pointsMappings = {
      "X": 1, // Rock
      "Y": 2, // Paper
      "Z": 3 // Scissors
    }
    const games1: UnformattedGame[] = ["A Y", "B X", "C Z"]
    const games = await fileReader.readFile("data.txt")

    function getOutcome(games: string[]) {
      let totalPoints = 0

      for (let index = 0; index < games.length; index++) {
        let points = 0
        const game = games[index].split(" ") as Game
        points += pointsMappings[game[1]]
        if (winningMappings[game[0]] === game[1]) {
          // If you win
          points += 6
        } else if (tieMappings[game[0]] === game[1]) {
          // If you tie
          points += 3
        }
        totalPoints += points
      }

      return totalPoints
    }

    expect(getOutcome(games1)).toEqual(15)
    expect(getOutcome(games)).toEqual(13009)
  })

  it("Part 2 - Change strategy", async () => {
    const outcomeMappings = {
      "X": 0, // Lose
      "Y": 3, // Draw
      "Z": 6 // Win
    }

    const choiceMappings = {
      "A": { Z: 2, X: 3, Y: 1 }, // Rock
      "B": { Z: 3, X: 1, Y: 2 }, // Paper
      "C": { Z: 1, X: 2, Y: 3 } // Scissors
    }

    const games1: UnformattedGame[] = ["A Y", "B X", "C Z"]
    const games = await fileReader.readFile("data.txt")

    function getOutcome(games: string[]) {
      let totalPoints = 0

      for (let index = 0; index < games.length; index++) {
        let points = 0
        const game = games[index].split(" ") as Game
        points += outcomeMappings[game[1]]
        points += choiceMappings[game[0]][game[1]]
        totalPoints += points
      }

      return totalPoints
    }
    expect(getOutcome(games1)).toEqual(12)
    expect(getOutcome(games)).toEqual(10398)
  })
})
