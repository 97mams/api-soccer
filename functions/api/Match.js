import { allGroup } from "./Group.js"

const groups = await allGroup()


const buildMatch = (teams) => {
    let result = [];
    for (let team in teams) {
        const Indexkey = parseInt(team)
        const exitLoop = teams.length
        for (let key = Indexkey; key < exitLoop; key++) {
            if (exitLoop !== key + 1) {
                result.push({ team1: teams[Indexkey].teamId, team2: teams[key + 1].teamId })
            }
        }
    }
    return result
}

export const getMatch = () => {
    const result = []
    console.log(groups[3].teams)
    result.push({ group: groups.group, matchs: buildMatch(groups[0].teams,) })
    for (let group of groups) {
    }
    return result
}