const { group, Team, group_type } = require('../models')

const findAllService = () => {
    return group.findAll()
}

module.exports = { findAllService }