import { IReadFiles, TextFileReader } from '../../FileReader';

describe("Advent of code day 3", () => {
  let fileReader: IReadFiles

  beforeEach(() => {
    fileReader = new TextFileReader(__dirname)
  })

  it("Part 1 - Count rucksack value", async () => {
   const rucksacks1 = ["vJrwpWtwJgWrhcsFMMfFFhFp"]
   const rucksacks2 = [
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw"
   ]
    const rucksacks = await fileReader.readFile('data.txt');

    let pointsMap: { [key: string]: number } = {}
    const pointsArray = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

     // @ts-ignore
    pointsArray.reduce((accumulator, currentValue, currentIndex) => {
     pointsMap = {
         ...pointsMap,
         [currentValue]: currentIndex + 1
     }
    }, pointsArray[0])


    function getOutcome(rucksacks: string[]) {
     let totalPoints = 0

     for (let i = 0; i < rucksacks.length; i++) {
      const rucksack = rucksacks[i]
      const compartment1 = rucksack.substring(0, rucksack.length / 2).split("");
      const compartment2 = rucksack.substring(rucksack.length / 2, rucksack.length).split("");

      const map = compartment1.map((item) => compartment2.includes(item))
      const index = map.indexOf(true)
      const matchingValue = index !== -1 ? compartment1[index] : false

      let rucksackPoints = 0
      if(matchingValue) {
        rucksackPoints = pointsMap[matchingValue]
      }
      totalPoints += rucksackPoints
     }

     return totalPoints

    }

    expect(getOutcome(rucksacks1)).toEqual(16)
    expect(getOutcome(rucksacks2)).toEqual(157)
    expect(getOutcome(rucksacks)).toEqual(7691)
  });

  it("Part 2 - Count badge value", async () => {
   const rucksacks1 = [
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw"
   ]
    const rucksacks = await fileReader.readFile('data.txt');

    let pointsMap: { [key: string]: number } = {}
    const pointsArray = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

     // @ts-ignore
    pointsArray.reduce((accumulator, currentValue, currentIndex) => {
     pointsMap = {
         ...pointsMap,
         [currentValue]: currentIndex + 1
     }
    }, pointsArray[0])


    function getOutcome(rucksacks: string[]) {

     const groupsArray: any[] = []
     // @ts-ignore
     rucksacks.reduce((accumulator) => {
        if (!rucksacks[accumulator]) return groupsArray
        groupsArray.push([
         rucksacks[accumulator].split(""), 
         rucksacks[accumulator+1].split(""),  
         rucksacks[accumulator+2].split("")
        ])
        return accumulator + 3
    }, 0)

    const matchingCharacters: any[] = []
    groupsArray.forEach((group) => { 
     // @ts-ignore
     const matchingCharacter = group.reduce((p,c) => p.filter(e => c.includes(e)))[0]
     matchingCharacters.push(matchingCharacter)
    } )
    
     let totalPoints = 0
     matchingCharacters.forEach((character) => totalPoints += pointsMap[character])
     return totalPoints

    }

    expect(getOutcome(rucksacks1)).toEqual(70)
    expect(getOutcome(rucksacks)).toEqual(2508)
  });
});
