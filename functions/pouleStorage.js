import { db } from "./connectDb.js";
/**
 * get all poule
 * @return {Promise<Poule[]>}
 */
export async function getPoule() {
    const sql = "SELECT * FROM poule LIMITE 100";
    const row = await db.query(sql);
    return row;
}

/**
 * create a poule
 * @param {number | string} params 
 * @return {Promise<Poule[]>}
 */
export async function createPoule(params) {
    const sql = `INSERT INTO poule (name, id_team, create_at) VALUES (?,?,?)`
    const row = await db.query(sql, [{ params }])
    console.log(row);

}