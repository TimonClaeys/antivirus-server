import express from "express";
import {getHighscores} from "../controllers/highscores.js";

const router = express.Router();
router.route('/')
    .get(getHighscores)

export { router }