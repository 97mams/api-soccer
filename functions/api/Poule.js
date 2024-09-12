import { createPoule, getPoule, getPouleTypes } from "../pouleStorage.js";
import { allTeam } from "../teamStorage.js";
import { countTeam } from "./Team.js";

async function pouleName() {
    return await getPouleTypes();
}

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
    const result = [];

    for (let index = 0; index < keys.length; index++) {
        result.push(teams[keys[index]].id);
    }
    return result;
}


function generateJsonPoule(arrayPouleName, arrayTeamKey, teams) {
    const result = [];
    arrayPouleName.forEach((poule, key) => {

        const json = {
            pouleId: poule.id, teamId: teamId(arrayTeamKey[key], teams)
        }
        result.push(json);

    });

    return result;


}



export async function generatRandomPoule() {
    const arrayPouleName = await pouleName();
    const numberTeamPoule = arrayPouleName.length - 1
    let teamArray = await allTeam();
    let keyArrayTeam = await randomKeyArrayTeam();

    const splitArray = spintArrayIntoChunks(keyArrayTeam, numberTeamPoule);
    const result = generateJsonPoule(arrayPouleName, splitArray, teamArray)
    return result;
}

function splitPoule(params) {
    for (let poule in params) {
        params[poule].teamId.forEach(id_team => {
            const id_poule = params[poule].pouleId

            createPoule({ id_poule, id_team })
        })
    }
}

export async function addPoule() {
    const generatePoule = await generatRandomPoule();
    splitPoule(generatePoule)
    return generatePoule
}

function splitTeam(teams) {
    const teamInPoule = []

    for (let team of teams) {

        const jsonTeam = {
            teamId: team.id_team,
            name: team.name,
            wine: team.wine,
            lose: team.lose,
            equal: team.equal,
            point: team.point,
        }
        teamInPoule.push(jsonTeam)
    }
    return teamInPoule

}

function jsonResponsPoule(poules) {
    const result = []
    for (let poule in poules) {
        const jsonTeam = splitTeam(poules)
        console.log(poules);

        // const json = {
        //     id: poules.id_poule,
        //     poule: poules.name_type,
        //     teams: jsonTeam
        // }
        // result.push(json)
    }

    console.log(result);


}

async function pouleFilterByName() {
    const poule = await getPoule()
    const name = await pouleName()

    const result = []
    name.forEach(pouleName => {
        const pouleByName = poule.filter(poule => pouleName.name_type = poule.name_type)
        jsonResponsPoule(pouleByName);
    })
    // console.log(jsonPoule

}

pouleFilterByName()

export async function allPoule() {
    return await getPoule();
}
