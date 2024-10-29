const { findAllGroupService } = require('./teamGroupService')
const { json } = require('node:stream/consumers')

const { match } = require('../models')
const { score } = require('../models')
const { updateTeam } = require('./teamService')

const buildMatch = async (teams, groupName) => {
    let result = []
    for (let team in teams) {
        const indexKey = parseInt(team)
        const exitLoop = teams.length
        for (let key = indexKey; key < exitLoop; key++) {
            if (exitLoop !== key + 1) {
                const data = { team1: teams[indexKey], team2: teams[key + 1], teamGroup: groupName }
                result.push(data)
                const matches = await match.create(data)
                await score.create({ team1: 0, team2: 0, matchId: matches.id })

            }
        }
    }
}

const addMatchService = async (bool) => {
    const groups = await findAllGroupService()
    const result = []
    if (bool) {
        for (let key in groups) {
            const created = buildMatch(groups[key].teams, groups[key].name)
            result.push(created)
        }
    }
    return result
}

const isDraw = (team1, team2) => {
    if (team1 === team2) return true
    return false
}

const teamWinner = (team1, team2) => {
    let wine = "team2"
    if (team1 > team2) {
        wine = "team1"
    }
    return wine
}

const teamLosser = (team1, team2) => {
    let lose = "team1"
    if (team1 > team2) {
        wine = "team2"
    }
    return lose
}

const resultMatch = (score) => {
    let json
    if (isDraw(score.team1, score.team2)) {
        json = [{
            team: "team1",
            data: { win: 0, lose: 0, draw: 1 }
        }, {
            team: "team2",
            data: { win: 0, lose: 0, draw: 1 }
        }]
    } else {
        let teamWine = teamWinner(score.team1, score.team2)
        const teamLose = teamLosser(score.team1, score.team2)
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

const findByIdMatch = async (id) => {
    const matchById = await match.findOne({
        attributes: ["id", "team1", "team2", "teamGroup", "completed"],
        include: {
            model: score, as: 'scores', attributes: ["team1", "team2"]
        },
        where: { id }
    })
    return matchById
}

const getMatchByGroupService = async (url) => {
    const name = url.searchParams.get('group')
    const matchBygroup = await match.findAll({
        attributes: ["id", "team1", "team2", "teamGroup", "completed"],
        include: {
            model: score, as: 'scores', attributes: ["team1", "team2"]
        },
        where: { teamGroup: name },
        limit: 100
    })
    const json = { groupName: name, totalMatch: matchBygroup.length, matches: matchBygroup }
    return json
}

const updateStateTeam = async (data, id) => {
    const matchCurr = await match.findOne({ attributes: ["team1", "team2"], where: { id } })
    const teamsName = [data[0].team, data[1].team]
    for (const key in teamsName) {
        await updateTeam(data[key].data, matchCurr[teamsName[key]])
    }
    return findByIdMatch(id)
}

const updateStatMatchService = async (request, url) => {
    const id = parseInt(url.searchParams.get("id"))
    const body = await json(request)
    const data = resultMatch(body)
    const [updateScore] = await score.update(body, {
        where: { matchId: id }
    })
    if (updateScore) {
        await match.update({ completed: true }, {
            where: { id: id }
        })
        return await updateStateTeam(data, id)
    }
}

const findAllMatchService = async () => {
    const matches = await match.findAll({
        attributes: ["id", "team1", "team2", "teamGroup", "completed"],
        include: {
            model: score, as: 'scores', attributes: ["team1", "team2"]
        }
    })
    if (matches.length === 0) {
        return null
    }
    return matches
}

module.exports = { findAllMatchService, addMatchService, getMatchByGroupService, updateStatMatchService, findByIdMatch }