const { jsonResponse } = require("../services/jsonResponseService");
const { findAllMatchService, addMatchService, updateStatMatchService } = require("../services/matchService");
const { json } = require('node:stream/consumers')

async function getMatches() {
    const matches = await findAllMatchService()
    const nameResponse = 'matches'
    return jsonResponse(nameResponse, matches)
}

async function addMatch(request) {
    const isGenerate = await json(request)
    const match = await addMatchService(isGenerate)
    const nameResponse = 'matches'
    return jsonResponse(nameResponse, match)
}

async function updateMatch(request, url) {
    const match = await updateStatMatchService(request, url)
    const nameResponse = "match"
    return jsonResponse(nameResponse, match)
}

module.exports = { getMatches, addMatch, updateMatch }