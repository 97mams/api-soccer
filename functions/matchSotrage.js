import { db } from "./connectDb.js";

/**
 * @returns {Promise<Matchs[]>}
 */
async function allMatch() {
    const sql = "SELECT * FROM matchs"
    const [row] = db.query(sql)
    return row[0];
}

/**
 * @param {object} data
 * @returns {Void}
 */
async function creatMatchs(data) {
    const sql = "INSERT INTO matchs (team1,team2,score1,score2, groupName) VALUES(?,?,?,?,?)"
    const [row] = db.query(sql, [data])
    return row[0];
}

/**
 * @returns {Void}
 */
async function updateMatchs(data) {
    const sql = `
        UPDATE matchs
        Set ?
        Where ?
    `
    const [row] = db.query(sql, [data])
    return row[0];
}