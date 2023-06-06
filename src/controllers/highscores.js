import {pool} from "../db.js";

export const getHighscores = (req, res) => {
    const userId = req.query['user_id'];
    const gameId = req.query['game_id'];
    let query = "SELECT * FROM highscores";
    let values = [];
    if (userId) {
        query = "SELECT * FROM highscores WHERE user_id = ?"
        values.push(userId);
    }
    if (gameId) {
        query = "SELECT * FROM highscores WHERE game_id = ?"
        values.push(gameId);
    }
    if (gameId && userId) {
        query = "SELECT * FROM highscores WHERE user_id = ? AND game_id = ?"
    }

    console.log(query);
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the DB')
            return res.status(500).json({status: 'error', message: 'Internal server error'})
        }
        connection.query(query, values, (err, result) => {
            connection.release();
            if (err) {
                console.error('Error executing querry', err);
                return res.status(500).json({status: 'error', message: 'Internal server error'});
            }
            return res.status(200).json({status: 'succes', data: result})
        })
    })
}

export const postHighscore = (req, res) => {
    const query = 'INSERT INTO highscores (user_id, game_id, time) VALUES (?,?,?)';
    const values = [req.body['user_id'], req.body['game_id'], req.body['time']];

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the DB')
            return res.status(500).json({status: 'error', message: 'Internal server error'})
        }
        connection.query(query, values, (err, result) => {
          connection.release();
            if (err) {
                console.error('Error executing querry', err);
                return res.status(500).json({status: 'error', message: 'Internal server error'});
            }
            console.log(result.changedRows)
            return res.status(201).json({
                status: 'succes',
                data: {
                    'user_id': req.body['user_id'],
                    'game_id': req.body['game_id'],
                    'time': req.body['time']
                }
            })
        })
    })
}