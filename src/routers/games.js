import express from "express";
import { getGames, getGame } from "../controllers/games.js";

const router = express.Router();

router.route('/')
    .get(getGames)
router.route('/:id')
    .get(getGame)


export { router }