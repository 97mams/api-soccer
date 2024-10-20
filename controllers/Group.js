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

async function getGroupByname(request, response, url) {
    const name = url.searchParams.get('type')
    const group = await groupService.findGroupTeamOrberBynameService(name)
    const nameResponse = "group"
    return jsonResponse(nameResponse, group)
}

module.exports = { getGroup, addTeamGroup, getGroupByname }