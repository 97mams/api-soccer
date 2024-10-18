const groupService = require('../services/teamGroupService')
const { jsonResponse } = require('../services/jsonResponseService')

async function getGroup(request, response) {
    const groups = await groupService.findAllService()
    return jsonResponse({ groups })
}

async function addTeamGroup(request, response) {
    const teamGroups = await groupService.createTeamGroupService(request, response)
    return jsonResponse({ teamGroups })
}

module.exports = { getGroup, addTeamGroup }