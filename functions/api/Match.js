import { getTeamById } from "../teamStorage.js";
import { getMatchs, allMatch, creatMatchs, getMatchByGroupName, getScore } from "../matchStorage.js"
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

const jsonMatch = async () => {
    const matchwithScore = await allMatch()
    const matchs = await getMatchs()
    let result = []
    for (let match of matchwithScore) {
        const score = await getScore(match.id_score)
        const findMatch = matchs.filter(m => m.id_match === match.id_match)
        const json = {
            id: findMatch[0].id_match,
            team1: findMatch[0].team1,
            team2: findMatch[0].team2,
            score: {
                team1: score[0].team1,
                team2: score[0].team2
            },
            group: findMatch[0].groupName
        }
        result.push(json);

    }
    return result
}

const addMatch = () => {
    for (let group of groups) {
        if (group.teams.length === 0) {
            return
        }
        buildMatch(group.teams, group.group)
    }
}

export const getMatchByGroup = async (request, response, url) => {
    const groupName = url.searchParams.get("group")
    return await getMatchByGroupName(groupName)
}

export const getMatch = async () => {
    const matchs = await jsonMatch()
    if (groups[0].teams.length === 0) {
        return { status: "warning", message: "you must to add teams" }
    } else {
        if (matchs.length === 0) {
            addMatch()
            return await getMatch()
        }
        return matchs
    }
}

export const updateStatMatch = async (request, response, url) => {
    const matchId = url.searchParas.get("id");
    const team = await getTeamById()
    const data = await json("score")
    console.log(data)
    console.log(data)
}