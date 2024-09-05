import { allTeam } from "../soccerStorage.js"

/**
 * calculer la somme du points ganger par chaque equipe
 * @param {int} params 
 * @return point
 */
function pointTeam(wine, equal) {
    const point = (wine * 3) + equal
    return point
}

/**
 * calculer la nombre du victoire d'un équipe
 * @param {number} getwine
 * @param {number} wine
 * @returns {number}
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
 * @returns {number}
 */
function equalMatch(getEqual, equal) {
    return equal + getEqual
}

/**
 *@return { Promise<Stat[]>}
 */
export async function updateStat(param, id) {
    const teams = allTeam();
    const team = (await teams).find(team => team.id === parseInt(id))

    const wine = wineMatch(team.wine, param.wine)
    const equal = equalMatch(team.equal, param.equal)
    const promise = new Promise(resolve => {
        const resultStat = {
            wine: wine,
            lose: loseMatch(team.lose, param.lose),
            equal: equal,
            point: pointTeam(wine, equal)
        }
        resolve(resultStat)

    })
    return promise
}