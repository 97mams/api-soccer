import { allTeam } from "../teamStorage.js"

/**
 * calculer la somme du points ganger par chaque equipe
 * @param {number} wine
 * @param {number} equal
 * @return {number}point
 */
function pointTeam(wine, equal) {
    const point = (wine * 3) + equal
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
 * @param {number} getEqual
 * @param {number} equal
 * @return {number} equal
 */
function equalMatch(getEqual, equal) {
    return equal + getEqual
}

/**
 * calculer le total du match
 * @param {number} wine
 * @param {number} lose
 * @param {number} equal
 * @return {number} match
 */
function totalMatch(wine, lose, equal) {
    return equal + lose + wine
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
    const equal = equalMatch(team.equal, param.equal)
    const lose = loseMatch(team.lose, param.lose)
    const promise = new Promise(resolve => {
        const resultStat = {
            wine: wine,
            lose: lose,
            equal: equal,
            point: pointTeam(wine, equal),
            match: totalMatch(wine, lose, equal)
        }
        resolve(resultStat)

    })
    return promise
}