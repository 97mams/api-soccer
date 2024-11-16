const { Op } = require("sequelize");
const { Team } = require("../models");

const builderRulesMatch = async (params) => {
    //
}

const findTeamByPoint = async () => {
    return await Team.findAll(
        {
            where: {
                point: {
                    [Op.gte]: 3
                }
            }
        }
    )
}

module.exports = { findTeamByPoint };