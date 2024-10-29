const { jsonResponse } = require("../services/jsonResponseService");
const { findAllTeamService, getTeamByName, createTeam, updateTeam } = require("../services/teamService")
const { json } = require("node:stream/consumers");

async function getTeams() {
    const teams = await findAllTeamService();
    const nameRespnse = "teams"

    return jsonResponse(nameRespnse, teams);
}

async function getTeam(url) {
    const name = url.searchParams.get('name');
    const team = await getTeamByName(name)
    const nameRespnse = "team"
    return jsonResponse(nameRespnse, team)
}

async function addTeam(resquest) {
    const name = await json(resquest)
    const team = await createTeam(name)
    const nameRespnse = "team"
    return jsonResponse(nameRespnse, team)
}

async function modifTeam(resquest, url) {
    const teamName = url.searchParams.get('name')
    const params = await json(resquest)
    const team = await updateTeam(params, teamName)
    const nameRespnse = "team"
    return jsonResponse(nameRespnse, team)
}

module.exports = { addTeam, getTeams, getTeam, modifTeam }