/**
 * 
 * @param {number} team1 
 * @param {number} team2
 * @returns {string} nameTeam
 */
export const teamWiner = (team1, team2) => {
    let winner = "team1"
    if (team1 < team2) {
        winner = "team2"
    }
    return winner
}

/**
 * 
 * @param {number} team1 
 * @param {number} team2
 * @returns {string} nameTeam
 */
export const isLosser = (team1, team2) => {
    let losser = "team1"
    if (team1 < team2) {
        losser = "team2"
    }
    return losser
}

/**
 * 
 * @param {number} team1 
 * @param {number} team2
 * @returns {object}
 */
export const isDraw = (team1, team2) => {
    if (team1 === team2) return true
}