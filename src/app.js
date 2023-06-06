import express from 'express';
import { router as userRouter } from "./routers/users.js";
import { router as gamesRouter } from "./routers/games.js"
import { router as highscoreRouter } from "./routers/highscores.js"

const app = express();
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/highscores', highscoreRouter);

export { app }