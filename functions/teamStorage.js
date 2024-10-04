import { db } from "./connectDb.js"

/**
 * @return {Promise<Teams[]>}
 */
export async function allTeam() {
    const sql = "SELECT * from teams";
    const row = await db.query(sql);
    return row[0];
}

/**
 * @return {Promise<Team[]>}
 */
export async function getTeamById(id) {
    const sql = "SELECT * from teams where id_team = ?";
    const row = await db.query(sql, [id]);
    return row[0];
}

/**
 * @param {string} name
 * @param {Date} created_at
 * @return {Promise<Team[]>}
 */
export async function createTeam({ name, created_at = new Date() }) {
    const sql = `INSERT INTO teams (name, created_at) VALUE (?,?)`;
    const [result] = await db.query(sql, [name, created_at]);

    return {
        id: result.insertId,
        name,
        created_at
    };
}

/**
 * @param {string} name
 * @param {number} win
 * @param {number} lose
 * @param {number} point
 * @param {number} draw
 * @return {string}
 */
export async function updateTeam(params, name) {
    const sql = `
        UPDATE teams
        SET ?
        WHERE ?`
    const [row] = await db.query(sql, [{
        wins: params.win,
        losses: params.lose,
        draws: params.draws,
        point: params.point,
        match: params.match,
    }, {
        name: name
    }]);

    return row;
}
/**
 * @param {number}id
 * @returns {void}
 */
export async function deleteTeam(id) {
    const sql = "DELET from teams WHERE id_team = ?"
    await db.query(sql, [id])
}