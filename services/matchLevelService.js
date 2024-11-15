const Team = require("../models");

const builderRulesMatch = async (params) => {
    //
}

const findTeamByPoint = async () => {
    return await Team.findOne()
}

module.exports = { findTeamByPoint };