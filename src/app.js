import express from 'express';
import { router as userRouter } from "./routers/users.js";
import { router as gamesRouter } from "./routers/games.js"

const app = express();
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/games', gamesRouter)

export { app }