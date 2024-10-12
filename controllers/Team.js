const { Team } = require("../models");
const { json } = require("node:stream/consumers");
// import { updateStat } from "./StatTeam.js";


async function getTeams(resquest, respose) {
    // return { total: await countTeam(), teams: await allTeam() }
    const teams = await Team.findAll()
    return teams
}

// export async function getTeam(resquest, respose, url) {
//     const data = url.searchParams.get('name');

//     let message
//     const teamName = data.toUpperCase();
//     const findTeam = (await allTeam()).find(team => team.name.toUpperCase() === teamName.trim());
//     if (!findTeam) {
//         message = "Team not found"
//         return jsonResponse(message, findTeam)
//     }
//     return findTeam;
// }

async function addTeam(resquest, respose) {
    const [team, created] = await Team.findOrCreate({
        where: { name: "mamisoa" },
        defaults: {
            wins: 0,
            losses: 0,
            draws: 0,
            point: 0,
        }
    })
    console.log(team.name); // 'sdepold'
    console.log(created); // The boolean indicating whether this instance was just created

    if (created) {
        return team
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

module.exports = { getTeams }