import express from "express";
import {getHighscores, postHighscore} from "../controllers/highscores.js";

const router = express.Router();
router.route('/')
    .get(getHighscores)
    .post(postHighscore);

export { router }