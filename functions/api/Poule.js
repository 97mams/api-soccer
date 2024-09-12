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

function splitTeam(teams, typePoule) {
    const teamInPoule = []

    for (let team of teams) {

        if (team.name_type === typePoule) {
            const jsonTeam = {
                pouleId: team.id_poule,
                teamId: team.id_team,
                name: team.name,
                wine: team.wine,
                lose: team.lose,
                equal: team.equal,
                point: team.point,
            }
            teamInPoule.push(jsonTeam)
        }
    }
    return teamInPoule

}

function jsonResponsPoule(poules, name) {
    const jsonTeam = splitTeam(poules, name)

    const json = {
        poule: name,
        teams: jsonTeam
    }

    return json;




}

async function pouleFilterByName() {
    const poule = await getPoule()
    const name = await pouleName()

    const result = []
    name.forEach(pouleName => {
        const type = pouleName.name_type
        const pouleByName = poule.filter(poule => type === poule.name_type)

        result.push(jsonResponsPoule(pouleByName, type))
    })

    return result
}

export async function allPoule() {
    const poules = await pouleFilterByName()
    return poules;
}
