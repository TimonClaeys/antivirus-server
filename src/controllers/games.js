import {pool} from "../db.js";

export const getGames = (res, req) => {
    const query =
        'SELECT *, difficulty.name FROM games ' +
        'INNER JOIN difficulty ON games.id = difficulty.id ';

    pool.getConnection((err, connection) => {
        if (err) {
            return req.status(500).json({
                status: 'error',
                message: "Error connecting to database"
            })
        }
        connection.query(query, (err, result) => {
            connection.release();
            if (err) {
                console.error('SQL error: ', err)
                return req.status(500).json({
                    status: 'error',
                    message: "Error executing query"
                })
            }
            req.status(200).json(result)
        })
    })
}

export const getGame = (req, res) => {
    const query =
        'SELECT *, difficulty.name FROM games ' +
        'INNER JOIN difficulty ON games.id = difficulty.id ' +
        'WHERE games.id = ?';
    const values = [req.params.id];
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('connection error: ', err)
            return res.status(500).json({
                status: 'error',
                message: "Error connecting to database"
            })
        }
        connection.query(query, values, (err, result) => {
            connection.release();
            if (err) {
                console.error('SQL error: ', err)
                return res.status(500).json({
                    status: 'error',
                    message: "Error executing query"
                })
            }
            res.status(200).json(result)
        })
    })
}