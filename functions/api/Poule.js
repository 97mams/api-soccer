import { getPoule } from "../pouleStorage.js";
import { allTeam } from "../teamStorage.js";
import { countTeam } from "./Team.js";

function pouleName() {
    const a = ["A", "B", "C", "D", "E", "F"];

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
    console.log(team);

}

export async function allPoule() {
    return await getPoule();
}

export async function generatRandomPoule() {
    const arrayPouleName = ["A", "B", "C", "D", "E", "F"];
    let teamArray = await allTeam();
    let poule = [];
    let keyArrayTeam = await randomKeyArrayTeam();
    const counter = await countTeam();
    for (let index = 0; index < counter; index++) {
        const teamId = teamArray.find(team => team.id === teamArray[keyArrayTeam].id);
        const name = arrayPouleName[index];
        poule[index] = { name: name, teamId: teamId.id }
    }
    console.log(keyArrayTeam);

}

randomKeyArrayTeam()