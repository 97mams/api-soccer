import { db } from "./connectDb.js"

/**
 * @return {Promise<Team[]>}
 */
export async function allTeam() {
    const query = "SELECT * from teams";
    const row = await db.query(query);
    return row[0];
}

/**
 * @param {string} name
 * @returns @return {Promise<Team[]>}
 */
export async function createTeam({ name }) {
    const query = `INSERT INTO teams (name) VALUE (?)`;
    const [result] = await db.query(query, [name]);

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
 * @return {Promise<Team[]>}
 */
export async function updateTeam(params) {
    console.log(params);

}