const { findAllGroupService } = require('./teamGroupService')

const { match } = require('../models')
const { score } = require('../models')

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

module.exports = { findAllMatchService, addMatchService }