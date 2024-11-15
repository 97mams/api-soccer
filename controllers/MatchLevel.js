const { findTeamByPoint } = require("../services/matchLevelService");

async function getMatchLevels() {
    return await findTeamByPoint()
}

module.exports = { getMatchLevels }