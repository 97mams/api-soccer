import { db } from "./connectDb.js";

/**
 * @returns {Promise<Matchs[]>}
 */
export async function allMatch() {
    const sql = "SELECT * FROM matchs"
    const [row] = await db.query(sql)
    return row;
}

/**
 * @returns {Promise<Matchs[]>}
 */
export async function getMatchByGroupName(groupName) {
    const sql = "SELECT * FROM matchs Where groupName = ?"
    const [row] = await db.query(sql, [groupName])
    return row;
}

/**
 * @param {object} data
 * @returns {Void}
 */
export async function creatMatchs(data) {
    const sql = "INSERT INTO matchs (team1,team2, groupName) VALUES(?,?,?)"
    const [row] = await db.query(sql, [data.team1, data.team2, data.groupName])
}

/**
 * @returns {Void}
 */
export async function updateMatchs(data) {
    const sql = `
        UPDATE matchs
        Set ?
        Where ?
    `
    const [row] = await db.query(sql, [data])
    return row[0];
}