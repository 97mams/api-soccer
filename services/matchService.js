const { findAllGroupService } = require('./teamGroupService')

const { match } = require('../models')

const buildMatch = async (teams, groupName) => {
    const toArrayTeam = [teams]
    console.log(toArrayTeam);

    for (let team in toArrayTeam) {
        const indexKey = parseInt(team)
        const exitLoop = teams.length
        for (let key = indexKey; key < exitLoop; key++) {
            if (exitLoop !== key + 1) {
                const data = { team1: toArrayTeam[indexKey], team2: toArrayTeam[key + 1], groupName: groupName }
                //    const createdMatch = await match.create(data)
                // console.log(data);

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
    return { total: matchs.length, matchs: [result] }
}

const addMatchService = async (bool) => {
    const groups = await findAllGroupService()
    if (bool) {
        for (let group of groups) {
            buildMatch(group.team, group.groupe)
        }
        return { message: "ok" }
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

const updateStatMatch = async (request, response, url) => {
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
    return { message: "successfull" }
}

const findAllMatchService = async () => {
    const matches = await match.findAll()
    if (matches.length === 0) {
        return null
    }
    return matches
}

module.exports = { findAllMatchService, addMatchService }