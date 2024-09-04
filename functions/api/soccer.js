import { allTeam, createTeam, updateTeam } from "../soccerStorage.js"
import { json } from "node:stream/consumers";

export async function getTeams(resquest, respose) {
    return await allTeam()
}

export async function getTeam(resquest, respose, url) {
    const data = url.searchParams.get('name');
    const teamName = data.toUpperCase();
    const findTeam = (await allTeam()).find(team => team.name === teamName.trim());
    if (!findTeam) {
        return {
            "message": "Team not found"
        }
    }
    return findTeam;
}

export async function addTeam(resquest, respose) {
    const teamName = await json(resquest)
    const teamfindTeam = (await allTeam()).find(team => team.name === teamName.name);
    if (team) {
        return {
            message: "this name is also created"
        };
    }
    return createTeam(teamName);
}

export async function modifTeam(resquest, respose, url) {
    const id = url.searchParams.get('id');
    const params = await json(resquest)
    const team = getTeams()
    return updateTeam(team, id);
}