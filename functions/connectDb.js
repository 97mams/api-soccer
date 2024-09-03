import mysql from "mysql2";

export const db = mysql.createPool({
    host: "localhost",
    database: "soccer",
    password: "",
    user: "root"
}).promise();