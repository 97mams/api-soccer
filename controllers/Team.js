const { jsonResponse } = require("../services/jsonResponseService");
const { findAllService, getTeamByName, createTeam, updateTeam } = require("../services/teamService")
const { json } = require("node:stream/consumers");

async function getTeams(resquest, respose) {
    const teams = await findAllService();
    const nameRespnse = "teams"

    return jsonResponse(nameRespnse, teams);
}

async function getTeam(resquest, respose, url) {
    const name = url.searchParams.get('name');
    const team = await getTeamByName(name)
    const nameRespnse = "team"
    return jsonResponse(nameRespnse, team)
}

async function addTeam(resquest, respose) {
    const name = await json(resquest)
    const team = await createTeam(name)
    const nameRespnse = "team"
    return jsonResponse(nameRespnse, team)
}

async function modifTeam(resquest, respose, url) {
    const teamName = url.searchParams.get('name')
    const params = await json(resquest)
    const team = await updateTeam(params, teamName)
    const nameRespnse = "team"
    return jsonResponse(nameRespnse, team)
}

module.exports = { addTeam, getTeams, getTeam, modifTeam }