import { allTeam, createTeam } from "../soccerStorage.js"
import { json } from "node:stream/consumers";

export function getTeams() {
    return allTeam()
}

export async function addTeam(resquest, respose) {
    const teamName = await json(resquest)
    const team = (await getTeams()).find(team => team.name === teamName.name);
    if (team) {
        return {
            message: "this name is also created"
        };
    }

    return createTeam(teamName);
}