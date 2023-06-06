import express from "express";
import {getHighscores, postHighscore, putHighscore} from "../controllers/highscores.js";

const router = express.Router();
router.route('/')
    .get(getHighscores)
    .post(postHighscore)
    .put(putHighscore);

export { router }