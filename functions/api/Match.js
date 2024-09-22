import { allGroup } from "./Group.js"

const groups = await allGroup()

/**
 * count number teams in the group
 * @param {Array} teams 
 * @returns number
 */
const countTeamInGroup = (teams) => {
    // const totalTeamINGroup = teams.lenght
    // return totalTeamINGroup
    if (teams) {
        return teams.length;
    }
    return

}


/**
 * total match for a team in the group
 * @param {number} teams
 * @returns number
 */
const countMatchTeam = (teams) => {
    const matchTotalTeam = teams - 1
    return matchTotalTeam
}

/**
 * total match for a group
 * @returns number
 */
const countMatchGroup = (teams) => {
    const numberMacht = teams * 2
    return numberMacht
}

const buildMacht = (teams) => {
    let result = [];
    for (let team in teams) {
        const key = parseInt(team)
        const endValue = teams[key + 1] == undefined ? teams[0] : teams[key + 1];
        result.push({ "team1": teams[key].teamId, "team2": endValue.teamId });
    }
    return result
}

export const getMatch = () => {
    const result = []
    for (let group of groups) {
        result.push({ group: group.group, matchs: buildMacht(group.teams) })
    }
    return result
}

export function callandrie() {
    const matchs = getMatch()
    const result = [];
    for (let key in matchs) {
        const json = {
            "day": key + 1,
            "matchs": {
                "groupe": matchs[key].group,
                "teams": matchs[key].matchs[key]
            }
        }
        result.push(json)

    }
    return result
}




