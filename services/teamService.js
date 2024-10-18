const { Team } = require("../models")

/**
 * calculer la somme du points ganger par chaque equipe
 * @param {number} win
 * @param {number} draw
 * @return {number}point
 */
function pointTeam(win, draw) {
    const point = (win * 3) + draw
    return point
}

/**
 * calculer les nombres du victoire d'un équipe
 * @param {number} getwin
 * @param {number} win
 * @return {number}
 */
function wineMatch(getWin, win) {
    return win + getWin
}

/**
 * calculer les nombres de defaite d'un équipe
 * @param {number} getLose
 * @param {number} lose
 * @returns {number}
 */
function loseMatch(getLose, lose) {
    return lose + getLose
}

/**
 * calculer les nombres du match null d'un équipe
 * @param {number} getdraw
 * @param {number} draw
 * @return {number} draw
 */
function totalDeaws(getdraw, draw) {
    return draw + getdraw
}

/**
 * calculer la total du match
 * @param {number} win
 * @param {number} lose
 * @param {number} draw
 * @return {number} match
 */
function totalMatch(win, lose, draw) {
    return draw + lose + win
}

/**
 * @param {Object} stat
 * @param {number} id
 *@return { Promise<Stat[]>}
 */
async function updateStat(param, name) {
    const teamByName = await Team.findOne({ where: { name: name } })
    if (teamByName === null) return null
    const team = teamByName.dataValues
    const win = wineMatch(team.wins, param.win)
    const draw = totalDeaws(team.draws, param.draw)
    const lose = loseMatch(team.losses, param.lose)
    const promise = new Promise(resolve => {
        const resultStat = {
            wins: win,
            losses: lose,
            draws: draw,
            point: pointTeam(win, draw),
            match: totalMatch(win, lose, draw)
        }
        resolve(resultStat)
    })
    return promise
}

async function findAllService() {
    const teams = await Team.findAll()
    if (teams.length === 0) return null
    return teams
}

async function getTeamByName(name) {
    const teamByName = await Team.findOne({
        where: { name: name }
    })
    return teamByName
}

async function createTeam(name) {
    const [team, created] = await Team.findOrCreate({
        where: name,
        defaults: {
            wins: 0,
            losses: 0,
            draws: 0,
            point: 0,
            match: 0
        }
    })
    if (created) {
        return team
    }
    return null
}

async function updateTeam(params, teamName) {
    const state = await updateStat(params, teamName)
    if (state === null) return null
    const team = await Team.update(
        state,
        { where: { name: teamName } }
    )
    return team
}

module.exports = { findAllService, getTeamByName, createTeam, updateTeam }