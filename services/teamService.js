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

module.exports = { updateStat }