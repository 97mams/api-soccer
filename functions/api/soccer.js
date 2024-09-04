import { allTeam, createTeam, updateTeam } from "../soccerStorage.js"
import { json } from "node:stream/consumers";

export function getTeams(resquest, respose) {
    return allTeam()
}

export function getTeam(resquest, respose, url) {
    const id = parseInt(url.searchParams.get('id'), 10);
    return findTeam(await json(resquest), id);
}

export async function addTeam(resquest, respose) {
    const teamName = await json(resquest)
    const team = (await allTeam()).find(team => team.name === teamName.name);
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
    return updateTeam(, id);
}