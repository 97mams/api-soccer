import { db } from "./connectDb.js";

/**
 * @returns {Promise<Matchs[]>}
 */
export async function allMatch() {
    const sql = "SELECT * FROM matchs"
    const [row] = await db.query(sql)
    return row[0];
}

/**
 * @param {object} data
 * @returns {Void}
 */
export async function creatMatchs(data) {
    const sql = "INSERT INTO matchs (team1,team2, groupName) VALUES(?,?,?)"
    await db.query(sql, [data.team1, data.team2, data.groupName])
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