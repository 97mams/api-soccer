import { allTeam, createTeam, updateTeam } from "../teamStorage.js"
import { json } from "node:stream/consumers";
import { updateStat } from "./StatTeam.js";

export async function getTeams(resquest, respose) {
    return { total: await countTeam(), teams: await allTeam() }
}

export async function getTeam(resquest, respose, url) {
    const data = url.searchParams.get('name');

    let message
    const teamName = data.toUpperCase();
    const findTeam = (await allTeam()).find(team => team.name.toUpperCase() === teamName.trim());
    if (!findTeam) {
        message = "Team not found"
        return jsonResponse(message, findTeam)
    }
    return findTeam;
}

export async function addTeam(resquest, respose) {
    const teamName = await json(resquest)
    let message = "Team successfully added";

    const teamfindTeam = (await allTeam()).find(team => team.name === teamName.name);
    if (teamfindTeam) {
        message = "this name is also created"
        return jsonResponse(message, teamfindTeam);
    }

    const newTeam = await createTeam(teamName);
    return jsonResponse(message, newTeam);

}

export async function modifTeam(resquest, respose, url) {
    const teamName = url.searchParams.get('name');
    const params = await json(resquest);
    const stat = await updateStat(params, teamName);
    const message = "Team success uptaded";

    const result = await updateTeam(stat, teamName)
    if (!result) return
    Object.assign(stat, { id })
    return jsonResponse(message, stat)
}

export async function countTeam() {
    const team = await allTeam();
    return team.length;
}

function jsonResponse(message, team) {
    const json = {
        message: message,
        team: team
    };
    return json;
}