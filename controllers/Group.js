const groupService = require('../services/teamGroupService')
const { jsonResponse } = require('../services/jsonResponseService')

async function getGroup(request, response) {
    const groups = await groupService.findAllGroupService()
    const nameResponse = "groups"
    return jsonResponse(nameResponse, groups)
}

async function addTeamGroup(request, response) {
    const teamGroups = await groupService.createTeamGroupService(request, response)
    const nameResponse = "teamGroups"
    return jsonResponse(nameResponse, teamGroups)
}

module.exports = { getGroup, addTeamGroup }