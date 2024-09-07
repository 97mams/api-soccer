import { getPoule } from "../pouleStorage.js";
import { allTeam } from "../teamStorage.js";
import { countTeam } from "./Team.js";

function pouleName() {
    return ["A", "B", "C", "D"];
}

pouleName()

async function randomKeyArrayTeam() {
    const numberTeam = await countTeam()
    let breakLoop = numberTeam
    const team = []

    for (let index = 0; index < breakLoop; index++) {
        const random = ~~(Math.random() * numberTeam)
        if (team.includes(random)) {
            breakLoop++
        } else {
            team.push(random)
        }
    }
    return team;

}


function spintArrayIntoChunks(array, chunkSize) {
    const result = [];
    for (let index = 0; index < array.length; index += chunkSize) {
        const chunk = array.slice(index, index + chunkSize)
        result.push(chunk)
    }
    return result
}

function teamId(keys, teams) {
    const result = []
    for (let index = 0; index < keys.length; index++) {
        result.push({ teamId: teams[keys[index]].id });
    }
    return result;
}

function generateJsonPoule(arrayPouleName, arrayTeamKey, teams) {
    console.log(arrayTeamKey);

    arrayPouleName.forEach((name, key) => {
        const result = {
            name: name, team: teamId(arrayTeamKey[key], teams)
        }
        console.log(result);

    });


}

export async function allPoule() {
    return await getPoule();
}


export async function generatRandomPoule() {
    const arrayPouleName = pouleName();
    const numberTeamPoule = pouleName().length - 1
    let teamArray = await allTeam();
    let keyArrayTeam = await randomKeyArrayTeam();


    const splitArray = spintArrayIntoChunks(keyArrayTeam, numberTeamPoule);
    const result = generateJsonPoule(arrayPouleName, splitArray, teamArray)

}

generatRandomPoule();