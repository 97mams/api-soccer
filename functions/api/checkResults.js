/** 
 * @param {object} match 
 * @param {object} score 
 * @returns {string} nameTeam
 */
export const teamWiner = (match, score) => {
    const team1 = score.team1
    const team2 = score.team2
    let winner = match.team1
    if (team1 < team2) {
        winner = match.team2
    }
    return winner
}

/** 
 * @param {object} match
 * @param {object} score
 * @returns {string} nameTeam
 */
export const teamLosser = (match, score) => {
    const team1 = score.team1
    const team2 = score.team2
    let losser = match.team2
    if (team1 < team2) {
        losser = match.team1
    }
    return losser
}

/**
 * @param {number} scoreTeam1
 * @param {number}  socreTeam2
 * @returns {boolean}
 */
export const isDraw = (team1, team2) => {
    if (team1 === team2) return true
}