import { createPoule, getPoule, getPouleTypes } from "../pouleStorage.js";
import { allTeam } from "../teamStorage.js";
import { countTeam } from "./Team.js";

async function pouleName() {
    return await getPouleTypes();
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
        result.push(teams[keys[index]].id);
    }
    return result;
}

function generateJsonPoule(arrayPouleName, arrayTeamKey, teams) {
    const result = [];
    arrayPouleName.forEach((name, key) => {
        const json = {
            name: name, team: teamId(arrayTeamKey[key], teams)
        }
        result.push(json);

    });

    return result;


}



export async function generatRandomPoule() {
    const arrayPouleName = pouleName();
    const numberTeamPoule = pouleName().length - 1
    let teamArray = await allTeam();
    let keyArrayTeam = await randomKeyArrayTeam();


    const splitArray = spintArrayIntoChunks(keyArrayTeam, numberTeamPoule);
    const result = generateJsonPoule(arrayPouleName, splitArray, teamArray)
    return result;
}

function splitPoule(params) {
    for (let poule in params) {
        params[poule].team.forEach(id_team => {
            const name = params[poule].name
            createPoule({ name, id_team })
        })
    }
}

export async function addPoule() {
    const generatePoule = await generatRandomPoule();
    splitPoule(generatePoule)
    return generatePoule
}
export async function allPoule() {
    return getPoule();
}
