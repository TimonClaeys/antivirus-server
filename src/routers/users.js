import express from "express";
import {getUser, postUser} from "../controllers/users.js";

const router = express.Router();
router.route('/').post(postUser);
router.route('/:username').get(getUser);

export { router };