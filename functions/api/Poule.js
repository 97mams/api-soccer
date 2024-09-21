import { json } from "node:stream/consumers";
import { creategroup, getGroup, getGroupTypes } from "../groupStorage.js";
import { allTeam } from "../teamStorage.js";
import { countTeam } from "./Team.js";

async function groupName() {
    return await getGroupTypes();
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
        result.push(teams[keys[index]].id_team);
    }
    return result;
}


function generateJsongroup(arrayGroupName, arrayTeamKey, teams) {
    const result = [];
    arrayGroupName.forEach((group, key) => {
        const json = {
            groupId: group.id_type, teamId: teamId(arrayTeamKey[key], teams)
        }
        result.push(json);
    });
    return result;
}

export async function generatRandomGroup() {
    const arrayGroupName = await groupName();
    const numberTeamGroup = arrayGroupName.length - 1
    let teamArray = await allTeam();
    let keyArrayTeam = await randomKeyArrayTeam();

    const splitArray = spintArrayIntoChunks(keyArrayTeam, numberTeamGroup);
    const result = generateJsongroup(arrayGroupName, splitArray, teamArray)
    return result;
}

function splitgroup(params) {
    for (let group in params) {
        params[group].teamId.forEach(id_team => {
            const id_group = params[group].groupId
            creategroup({ id_group, id_team })
        })
    }
}

export async function addgroup(request, response, url) {
    const data = await json(request)
    if (data.bool) {
        const generategroup = await generatRandomGroup();
        // console.log(generategroup);

        // splitgroup(generategroup)
        // return generategroup
    }

    const generategroup = await generatRandomGroup();

    splitgroup(generategroup)
    return "ok";
}


function splitTeam(teams, typeGroup) {
    const teamIngroup = []

    for (let team of teams) {
        if (team.name_type === typeGroup) {
            const jsonTeam = {
                groupId: team.id_group,
                teamId: team.id_team,
                name: team.name,
                win: team.wins,
                lose: team.losses,
                draws: team.draws,
                point: team.point,
            }
            teamIngroup.push(jsonTeam)
        }
    }
    return teamIngroup
}

function jsonResponsgroup(groups, name) {
    const jsonTeam = splitTeam(groups, name)

    const json = {
        group: name,
        teams: jsonTeam
    }

    return json;
}

async function groupFilterByName() {
    const group = await getGroup()
    const name = await groupName()

    const result = []
    name.forEach(groupName => {
        const type = groupName.name_type
        const groupByName = group.filter(group => type === group.name_type)

        result.push(jsonResponsgroup(groupByName, type))
    })

    return result
}

export async function getGroupByType(request, response, url) {
    const typeGroup = url.searchParams.get('type');
    const groups = await groupFilterByName();
    const findGroup = groups.find(group => group.group === typeGroup);
    return findGroup
}

export async function allgroup() {
    const groups = await groupFilterByName()
    return groups;
}
