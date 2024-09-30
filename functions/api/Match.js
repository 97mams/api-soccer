import { allGroup } from "./Group.js"

const groups = await allGroup()


const buildMatch = (teams) => {
    let result = [];
    for (let team in teams) {
        const Indexkey = parseInt(team)
        const exitLoop = teams.length


        // result.push({ "team1": newArrayTeam[key].teamId, "team2": endValue.teamId });
        for (let key = Indexkey; key < exitLoop; key++) {
            const endValue = teams[key + 1] == undefined ? teams[0] : teams[key + 1];
            result.push([Indexkey, key + 1])
            // result.push({ team1: teams[Indexkey].teamId, team2: endValue.teamId });

        }
    }
    console.log(result);

    return result
}

export const getMatch = () => {
    const result = []
    console.log(groups[3].teams)
    result.push({ group: groups.group, matchs: buildMatch(groups[3].teams,) })
    for (let group of groups) {
    }
    return result
}