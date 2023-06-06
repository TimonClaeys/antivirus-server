import {pool} from "../db.js";

export const postUser = (req, res) => {
    const querry = "INSERT INTO users (id, username, email, password) VALUES (null, ?, ?, ?)";
    const values = [req.body.username, req.body.email, req.body.password];
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({
                status: 'error',
                message: "Error connecting to database"
            })
        }
        connection.query(querry, values, (err, result) => {
            connection.release();
            if (err) {
                console.error(err, err)
                res.status(500).json({
                    status: 'error',
                    message: "Error inserting user"
                })
                return;
            }
            res.status(201).json({
                status: 'succes',
                data: {
                    id: result.insertId,
                    username: req.body.username,
                    email: req.body.email
                }
            })
        })
    })
};

export const getUser = (req, res) => {
    const query = "SELECT * FROM users WHERE username = ?";
    const values = [req.params.username];
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the DB', err);
            return res.status(500).json({status: 'error', message: 'Internal server error'});
        }
        connection.query(query, values, (err, result) => {
            connection.release();
            if (err) {
                console.error('Error executing querry');
                return res.status(500).json({status: 'error', message: 'Internal server error'})
            }
            return res.status(200).json({status: 'succes', data: result});
        })
    })
}