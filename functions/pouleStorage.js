import { db } from "./connectDb.js";
/**
 * get all poule
 * @return {Promise<Poule[]>}
 */
export async function getPoule() {
    const sql = "SELECT * FROM poule INNER JOIN teams on poule.id_teams = teams.id";
    const [row] = await db.query(sql);
    return row;
}

/**
 * create a poule
 * @param {number | string} params 
 * @return {Promise<Poule[]>}
 */
export async function createPoule(params) {
    const created_at = new Date()
    const sql = `INSERT INTO poule (name, id_teams, created_at) VALUES (?,?,?)`

    const row = await db.query(sql, [params.name, params.id_team, created_at])
}