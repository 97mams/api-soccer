import { allTeam } from "../teamStorage.js"

/**
 * calculer la somme du points ganger par chaque equipe
 * @param {number} wine
 * @param {number} draw
 * @return {number}point
 */
function pointTeam(wine, draw) {
    const point = (wine * 3) + draw
    return point
}

/**
 * calculer la nombre du victoire d'un équipe
 * @param {number} getwine
 * @param {number} wine
 * @return {number}
 */
function wineMatch(getWine, wine) {
    return wine + getWine
}

/**
 * calculer la nombre de defaite d'un équipe
 * @param {number} getLose
 * @param {number} lose
 * @returns {number}
 */
function loseMatch(getLose, lose) {
    return lose + getLose
}

/**
 * calculer la nombre du match null d'un équipe
 * @param {number} getdraw
 * @param {number} draw
 * @return {number} draw
 */
function totalDeaws(getdraw, draw) {
    return draw + getdraw
}

/**
 * calculer le total du match
 * @param {number} wine
 * @param {number} lose
 * @param {number} draw
 * @return {number} match
 */
function totalMatch(wine, lose, draw) {
    return draw + lose + wine
}

/**
 * @param {Object} stat
 * @param {number} id
 *@return { Promise<Stat[]>}
 */
export async function updateStat(param, id) {
    const teams = allTeam();
    const team = (await teams).find(team => team.id_team === parseInt(id))

    const wine = wineMatch(team.wine, param.wine)
    const draw = totalDeaws(team.draw, param.draw)
    const lose = loseMatch(team.lose, param.lose)
    const promise = new Promise(resolve => {
        const resultStat = {
            wine: wine,
            lose: lose,
            draws: draw,
            point: pointTeam(wine, draw),
            match: totalMatch(wine, lose, draw)
        }
        resolve(resultStat)

    })
    return promise
}