import { allTeam } from "../soccerStorage"

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
    const wine = wineMatch(team.wine, param)
    const equal = equalMatch(team.wine, param)
    const team = (await teams).find(team => team.id === id)
    const resultStat = {
        wine: wine,
        lose: loseMatch(team.wine, param),
        equal: equal,
        point: pointTeam(wine, equal)
    }
    console.log(resultStat);

}