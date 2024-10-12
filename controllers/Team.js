const { Team } = require("../models");
const { json } = require("node:stream/consumers");
// import { updateStat } from "./StatTeam.js";


async function getTeams(resquest, respose) {
    const teams = await Team.findAll()
    return { status: "success", datas: teams }
}

async function getTeam(resquest, respose, url) {
    const name = url.searchParams.get('name');
    const teamByName = await Team.findOne({
        where: { name: name }
    })
    if (teamByName === null) return { message: "Team not found" }
    return teamByName
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
}
// export async function modifTeam(resquest, respose, url) {
//     const teamName = url.searchParams.get('name');
//     const params = await json(resquest);
//     const stat = await updateStat(params, teamName);
//     const message = "Team success uptaded";

//     const result = await updateTeam(stat, teamName)
//     if (!result) return
//     Object.assign(stat, { id })
//     return jsonResponse(message, stat)
// }

// export async function countTeam() {
//     const team = await allTeam();
//     return team.length;
// }

// function jsonResponse(message, team) {
//     const json = {
//         message: message,
//         team: team
//     };
//     return json;
// }

module.exports = { addTeam, getTeams, getTeam }