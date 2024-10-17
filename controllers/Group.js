const groupService = require('../services/groupService')

async function getGroup(request, response) {
    const groups = await groupService.findAllService()
    console.log(groups);

    if (groups !== null) {
        return { status: "success", data: { groups: groups } }
    }
    return { status: "error", message: "groups not found" }
}

module.exports = { getGroup }