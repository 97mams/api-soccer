import { db } from "./connectDb.js";

/**
 * get all group
 * @return {Promise<group[]>}
 */
export async function getGroup() {
    // const sql = "SELECT * FROM soccer.group JOIN group_types JOIN teams on group_types.id_type = group.id_type AND teams.id_team = group.id_team ORDER BY point DESC";
    const sql = `
                SELECT g.*, gt.*, t.*
                FROM soccer.group AS g
                JOIN group_types AS gt ON gt.id_type = g.id_type
                JOIN teams AS t ON t.id_team = g.id_team
                ORDER BY point DESC
    `
    const [row] = await db.query(sql);
    return row;
}

/**
 * @return {Promise<groupTypes[]>}
 */
export async function getGroupTypes() {
    const sgl = "SELECT * FROM soccer.group_types";
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
    const sql = `INSERT INTO soccer.group (id_type, id_team,created_at) VALUES (?,?,?)`

    const row = await db.query(sql, [params.id_group, params.id_team, created_at])

}

export async function getGroupByPoint() {

}