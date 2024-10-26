const { jsonResponse } = require("../services/jsonResponseService");
const { findAllMatchService, addMatchService } = require("../services/matchService");
const { json } = require('node:stream/consumers')

async function getMatches() {
    const matches = await findAllMatchService()
    const nameResponse = 'matches'
    return jsonResponse(nameResponse, matches)
}

async function addMatch(request) {
    const isGenerate = await json(request)
    await addMatchService(isGenerate)
}

module.exports = { getMatches, addMatch }