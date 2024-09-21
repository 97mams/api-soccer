import { db } from "./connectDb.js";

/**
 * get all group
 * @return {Promise<group[]>}
 */
export async function getGroup() {
    const sql = "SELECT * FROM soccer.group JOIN group_types JOIN teams on group_types.id_type = group.id_type AND teams.id_team = group.id_team ";
    const [row] = await db.query(sql);
    return row;
}

/**
 * @return {Promise<groupTypes[]>}
 */
export async function getGroupTypes() {
    const sgl = "SELECT * FROM group_types";
    const [row] = await db.query(sgl);
    return row
}

/**
 * create a group
 * @param {number | string} params 
 * @return {Promise<group[]>}
 */
export async function createGroup(params) {
    const created_at = new Date()
    const sql = `INSERT INTO group (id_type, id_team,created_at) VALUES (?,?,?)`

    const row = await db.query(sql, [params.id_group, params.id_team, created_at])

}