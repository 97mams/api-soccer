const { TeamGroup, Team, group_type } = require('../models')
const { json } = require('node:stream/consumers')

const findAllService = async () => {
    const teamGroup = await TeamGroup.findAll({
        attributes: ["id"],
        order: [['id', 'ASC']],
        include: [
            { model: Team, as: "Teams", attributes: ["name"] },
            { model: group_type, as: "groupTypes", attributes: ["name_type"] },
        ],
    })
    if (teamGroup.length === 0) {
        return null
    }
    let result = []
    for (let groups of teamGroup) {
        console.log(groups);
        result.push({ id: groups.id, team: groups.Teams.name, groupe: groups.groupTypes.name_type })
    }

    return result

}

const createTeamGroupService = async (request, response) => {
    const data = await json(request)
    if (data.bool) {
        const generateGroup = await generatRandomGroup();
        splitgroup(generateGroup)
        return generateGroup
    }
    return null;
}

function randomKeyArrayTeam(teams) {
    const numberTeam = teams.length
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

const isFloat = (number) => {
    let result = false
    if (number % 4) {
        result = true
    }
    return result
}

/**
 * trouver les derniers valuers dans un tabelau de team
 * @param {number[]} array 
 * @param {number} chunkSize 
 * @returns []
 */
const findLastValue = (array, chunkSize) => {
    const resteTeam = array.length - (chunkSize * chunkSize)
    let result = []
    for (let index = 0; index < array.length - resteTeam; index += chunkSize) {
        const chunk = array.slice(index, index + chunkSize)
        result.push(chunk)
    }
    for (let index = 0; index < resteTeam; index++) {
        result[index].push(array[array.length - resteTeam + index])
    }
    return result;
}

function spintArrayIntoChunks(array, chunkSize) {
    let result = [];
    if (isFloat(array.length)) {
        result = findLastValue(array, chunkSize)
    } else {
        for (let index = 0; index < array.length; index += chunkSize) {
            const chunk = array.slice(index, index + chunkSize)
            result.push(chunk)
        }
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


function generateJsongroup(groupTypes, arrayTeamKey, teams) {
    const result = [];
    groupTypes.forEach((group, key) => {
        const json = {
            groupId: group.id, teamId: teamId(arrayTeamKey[key], teams)
        }
        result.push(json);
    });
    return result;
}

async function generatRandomGroup() {
    const groupTypes = await group_type.findAll();
    const teams = await Team.findAll()
    const numberTeamGroup = parseInt(teams.length / groupTypes.length)
    let keyArrayTeam = randomKeyArrayTeam(teams);
    const splitArray = spintArrayIntoChunks(keyArrayTeam, numberTeamGroup);
    const result = generateJsongroup(groupTypes, splitArray, teams)
    return result;
}

async function splitgroup(params) {
    for (let group in params) {
        params[group].teamId.forEach(async (teamId) => {
            const groupTypeId = params[group].groupId
            // createGroup({ id_group, id_team })
            const a = await TeamGroup.create({ groupTypeId, teamId, createdAt: new Date(), udpdatedAt: new Date() })
            console.log(a);

        })
    }
}

module.exports = { findAllService, createTeamGroupService }