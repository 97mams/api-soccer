import { getTeamById } from "../teamStorage.js";
import { allMatch, creatMatchs, getMatchByGroupName } from "../matchStorage.js"
import { allGroup } from "./Group.js"
import { json } from "node:stream/consumers"

const groups = await allGroup()

const buildMatch = (teams, groupName) => {
    for (let team in teams) {
        const indexKey = parseInt(team)
        const exitLoop = teams.length
        for (let key = indexKey; key < exitLoop; key++) {
            if (exitLoop !== key + 1) {
                const data = { team1: teams[indexKey].name, team2: teams[key + 1].name, groupName: groupName }
                creatMatchs(data)
            }
        }
    }
}

export const addMatch = () => {
    for (let group of groups) {
        buildMatch(group.teams, group.group)
    }
}

export const getMatchByGroup = async (request, response, url) => {
    const groupName = url.searchParams.get("group")
    return await getMatchByGroupName(groupName)
}

export const getMatch = async () => {
    const matchs = await allMatch()
    if (matchs.length === 0) {
        addMatch()
        return await getMatch()
    }
    return matchs
}

export const updateStatMatch = async (request, response, url) => {
    const matchId = url.searchParas.get("id");
    const team = await getTeamById()
    const data = await json("score")
    console.log(data)
    console.log(data)
}