import { db } from "./connectDb.js"

/**
 * @return {Promise<Team[]>}
 */
export async function allTeam() {
    const sql = "SELECT * from teams";
    const row = await db.query(sql);
    return row[0];
}

/**
 * @param {string} name
 * @returns @return {Promise<Team[]>}
 */
export async function createTeam({ name }) {
    const sql = `INSERT INTO teams (name) VALUE (?)`;
    const [result] = await db.query(sql, [name]);

    return {
        id: result.insertId,
        name,
    };
}

/**
 * @param {string} name
 * @param {number} number
 * @param {number} lose
 * @param {number} point
 * @return {string}
 */
export async function updateTeam(params, id) {
    const sql = `
        UPDATE teams
        SET ?
        WHERE ?`
    await db.query(sql, [{ win: params.win, lose: params.lose, point: params.point }, { id: id }]);

    return { message: "success" };

}