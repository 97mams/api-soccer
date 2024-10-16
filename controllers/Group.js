const groupService = require('../services/groupService')

function getGroup(request, response) {
    const groups = groupService.findAllService()

    if (groups === null) {
        return { status: "success", data: { groups: groups } }
    }
    return { status: "error", message: "groups not found" }
}

module.exports = { getGroup }