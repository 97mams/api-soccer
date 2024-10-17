const { TeamGroup, Team, group_type } = require('../models')

const findAllService = () => {
    return TeamGroup.findAll({
        attributes: ["id"],
        include: [
            { model: Team, as: "Teams", attributes: ["id", "name"] },
            { model: group_type, as: "groupTypes", attributes: ["name_type"] },
        ],
    })
}

module.exports = { findAllService }