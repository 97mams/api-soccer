import mysql from "mysql2"

const db = mysql.createPool({
    host: "12.0.0.1",
    database: "soccer",
    user: "root",
    password: ""
})

console.log(db);


/**
 * @return {Promise<Todo[]>}
 */
export function allTeam() {
    //
}