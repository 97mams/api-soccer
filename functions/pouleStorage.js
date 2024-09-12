import { db } from "./connectDb.js";

/**
 * get all poule
 * @return {Promise<Poule[]>}
 */
export async function getPoule() {
    const asql = "SELECT * FROM poule JOIN poule_types JOIN teams on poule_types.id_type = poule.id_type AND teams.id_team = poule.id_team ";
    const sql = "SELECT * FROM poule";
    const [row] = await db.query(asql);
    return row;
}

/**
 * @return {Promise<PouleTypes[]>}
 */
export async function getPouleTypes() {
    const sgl = "SELECT * FROM poule_types";
    const [row] = await db.query(sgl);
    return row
}

/**
 * create a poule
 * @param {number | string} params 
 * @return {Promise<Poule[]>}
 */
export async function createPoule(params) {
    const created_at = new Date()
    const sql = `INSERT INTO poule (id_type, id_team,created_at) VALUES (?,?,?)`

    const row = await db.query(sql, [params.id_poule, params.id_team, created_at])
    console.log(row);

}