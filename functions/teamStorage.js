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
 * @return {Promise<PouleTypes[]>}
 */
export async function getPouleTypes() {
    const sgl = "SELECT * FROM poule_types";
    const [row] = db.query(sgl);
    return row
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
    const [row] = await db.query(sql, [{
        wine: params.wine,
        lose: params.lose,
        equal: params.equal,
        point: params.point,
        match: params.match,
    }, {
        id: id
    }]);

    return row.changedRows;
}