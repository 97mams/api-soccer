const { Team } = require("../models");
const { updateStat } = require("./StatTeam")
const { json } = require("node:stream/consumers");

async function getTeams(resquest, respose) {
    const teams = await Team.findAll()
    return { status: "success", data: { teams: teams } }
}

async function getTeam(resquest, respose, url) {
    const name = url.searchParams.get('name');
    const teamByName = await Team.findOne({
        where: { name: name }
    })
    if (teamByName === null) return { message: "Team not found" }
    return { status: "success", data: { team: teamByName } }
}

async function addTeam(resquest, respose) {
    const name = await json(resquest)
    const [team, created] = await Team.findOrCreate({
        where: name,
        defaults: {
            wins: 0,
            losses: 0,
            draws: 0,
            point: 0,
            match: 0
        }
    })
    if (created) {
        return { status: "success", data: team }
    }
    return { status: "faild", message: "team also created" }
}

async function modifTeam(resquest, respose, url) {
    const teamName = url.searchParams.get('name')
    const params = await json(resquest)
    const state = await updateStat(params, teamName)
    console.log(state);

    const team = await Team.update(
        state,
        { where: { name: teamName } }
    )

    return team
}

module.exports = { addTeam, getTeams, getTeam, modifTeam }