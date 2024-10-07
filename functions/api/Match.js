import { getTeamById, updateTeam } from "../teamStorage.js";
import { getMatchs, allMatch, creatMatchs, getMatchByGroupName, getScore, updateScore } from "../matchStorage.js"
import { allGroup } from "./Group.js"
import { teamWiner, teamLosser, isDraw } from "./checkResults.js";
import { json } from "node:stream/consumers"
import { updateStat } from "./StatTeam.js";
import { countTeam } from "./Team.js";

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
    if (await countTeam() < 8) {
        return { status: "warning", message: "you must to add more 8 teams" }
    } else {
        if (matchs.length === 0) {
            addMatch()
            return await getMatch()
        }
        return matchs
    }
}

/**
 * update states for each teams
 * @param {object} match 
 * @param {object} score 
 * @returns {stat[]}
 */
const resultMatch = (match, score) => {
    let json
    if (isDraw(score.team1, score.team2)) {
        json = [{
            team: match.team1,
            data: { win: 0, lose: 0, draw: 1 }
        }, {
            team: match.team2,
            data: { win: 0, lose: 0, draw: 1 }
        }]

    } else {
        let teamWine = teamWiner(match, score)
        const teamLose = teamLosser(match, score)
        json = [{
            team: teamWine,
            data: { win: 1, lose: 0, draw: 0 }
        }, {
            team: teamLose,
            data: { win: 0, lose: 1, draw: 0 }
        }
        ]
    }
    return json
}


export const updateStatMatch = async (request, response, url) => {
    const matchs = await getMatchs()
    const matchId = parseInt(url.searchParams.get("id"))
    const match = matchs.find(m => m.id_match === matchId)
    const data = await json(request)
    updateScore(matchId, data)
    const results = resultMatch(match, data)
    for (let result of results) {
        const stat = await updateStat(result.data, result.team)
        updateTeam(stat, result.team)
    }


}