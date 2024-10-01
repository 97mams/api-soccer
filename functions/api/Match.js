import { allGroup } from "./Group.js"
import { json } from "node:stream/consumerss"

const groups = await allGroup()

const buildMatch = (teams) => {
    let result = [];
    for (let team in teams) {
        const Indexkey = parseInt(team)
        const exitLoop = teams.length
        for (let key = Indexkey; key < exitLoop; key++) {
            if (exitLoop !== key + 1) {
                result.push({ team1: teams[Indexkey].name, team2: teams[key + 1].name })
            }
        }
    }
    return result
}

export const getMatch = () => {
    const result = []
    for (let group of groups) {
        result.push({ group: group.group, matchs: buildMatch(group.teams) })
    }
    return result
}

export const updateStatMatch = async (request, response, url) => {
    const matchId = url.searchParas.get("id");
    const data = await json("score")
    console.log(data)
}