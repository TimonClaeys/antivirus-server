import mysql from "mysql";

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'express',
    password: 'Azerty123',
    database: 'antivirus',
});