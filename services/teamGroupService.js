const { TeamGroup, Team, group_type } = require('../models')
const { json } = require('node:stream/consumers')
const { findTeamByName } = require('./teamService')

async function randomKeyArrayTeam() {
    const countTeam = (await Team.findAll()).length
    let breakLoop = countTeam
    const team = []

    for (let index = 0; index < breakLoop; index++) {
        const random = ~~(Math.random() * countTeam)
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


function generateJsongroup(arrayGroupName, arrayTeamKey, teams) {
    const result = [];
    arrayGroupName.forEach((group, key) => {
        const json = {
            groupId: group.id, teamId: teamId(arrayTeamKey[key], teams)
        }
        result.push(json);
    });
    return result;
}

async function generateRandomGroup() {
    const arrayGroupName = await group_type.findAll({ attributes: ['id', "name_type"] })
    const teams = await Team.findAll()
    const numberTeamGroup = parseInt(teams.length / arrayGroupName.length)
    let keyArrayTeam = await randomKeyArrayTeam();
    const splitArray = spintArrayIntoChunks(keyArrayTeam, numberTeamGroup);
    const result = generateJsongroup(arrayGroupName, splitArray, teams)
    return result;
}

async function splitgroup(params) {
    for (let group in params) {
        params[group].teamId.forEach(async (teamId) => {
            const groupTypeId = params[group].groupId
            const createdAt = new Date()
            const updatedAt = new Date()
            const create = await TeamGroup.create({ teamId, groupTypeId, createdAt, updatedAt })
            return create
        })
    }
}

const splitGroupEachName = async (groups) => {
    const groupNames = await group_type.findAll({ attributes: ["name_type"] })
    const result = []
    for (const groupName of groupNames) {
        const name = groupName.name_type
        const groupEachNames = groups.filter(group => group.groupTypes.name_type === name)
        let teams = []
        for (const group of groupEachNames) {
            if (group.groupTypes.name_type === name) {
                const teamName = group.Teams.name
                teams.push(await findTeamByName(teamName))
            }
        }
        result.push({ name, teams: teams })
    }
    return result
}

const findAllGroupService = async () => {
    const teamGroups = await TeamGroup.findAll({
        attributes: ["id"],
        order: [['id', 'ASC']],
        include: [
            { model: Team, as: "Teams", attributes: ["name"] },
            { model: group_type, as: "groupTypes", attributes: ["name_type"] },
        ],
    })
    if (teamGroups.length === 0) {
        return null
    }
    return splitGroupEachName(teamGroups)
}

const createTeamGroupService = async (request, response) => {
    const data = await json(request)
    if (data.bool) {
        const generateGroup = await generateRandomGroup();
        return await splitgroup(generateGroup)
    }
    return null;
}

function jsonResponseFilterByName(group, name) {
    let teams = []
    for (const key in group) {
        const team = group[key].Teams;
        teams.push(team)
    }
    return { name, total: teams.length, teams }
}

async function findGroupTeamOrderBynameService(name) {
    const group = await TeamGroup.findAll({
        attributes: ['id'],
        include: [
            { model: Team, as: "Teams", attributes: ["id", "name", "wins", "losses", "draws", "point", "match"] },
            { model: group_type, as: "groupTypes", attributes: ["name_type"] },
        ],
        where: { '$name_type$': name },
    })
    return jsonResponseFilterByName(group, name)
}

async function findTeamsOrderByPointService() {
    const group = await TeamGroup.findAll({
        attributes: ['id'],
        include: [
            { model: Team, as: "Teams", attributes: ["id", "name", "wins", "losses", "draws", "point", "match"] },
            { model: group_type, as: "groupTypes", attributes: ["name_type"] },
        ],
        order: [
            ["Teams", "point", "DESC"]
        ]
    })
    return splitGroupEachName(group)
}

module.exports = { findAllGroupService, createTeamGroupService, findGroupTeamOrderBynameService, findTeamsOrderByPointService }   