import { pool } from '../db.js'
export const addUser = (user) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw new Error(err)
        }
    })
}