import { db } from "./connectDb.js";

/**
 * @returns {Promise<Matchs[]>}
 */
export async function allMatch() {
    const sql = "SELECT * FROM matchs JOIN score on matchs.id_match = score.id_match"
    const [row] = await db.query(sql)
    return row;
}

/**
 * @returns {Promise<Matchs[]>}
 */
export async function getMatchs() {
    const sql = "SELECT * FROM matchs"
    const [row] = await db.query(sql)
    return row;
}

/**
 * @returns {Promise<Score[]>}
 */
export async function getScore(id_soccer) {
    const sql = "SELECT * FROM score Where id_score = ?"
    const [row] = await db.query(sql, [id_soccer])
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
    const sqlMatch = "INSERT INTO matchs (team1,team2, groupName) VALUES(?,?,?)"
    const sqlScore = "INSERT INTO score (team1,team2, id_match) VALUES(?,?,?)"
    const [result] = await db.query(sqlMatch, [data.team1, data.team2, data.groupName])
    await db.query(sqlScore, [0, 0, result.insertId])
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