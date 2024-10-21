const { jsonResponse } = require("../services/jsonResponseService");
const { findAllMatchService, addMatchService } = require("../services/matchService");
const { json } = require('node:stream/consumers')

async function getMatches(request, response) {
    const matches = await findAllMatchService()
    const nameResponse = 'matches'
    return jsonResponse(nameResponse, matches)
}

async function addMatch(request, response) {
    const data = json(request)
    await addMatchService(data)
}

module.exports = { getMatches, addMatch }