import { Router } from "express";
const router = Router();

import { songAdd, songFetch } from "../controllers/song.controller.js";
import { authenticateToken } from "../middlewares/Auth.middlewares.js";

router.route("/song-fetch").get(songFetch);
router.route("/song-add").post(authenticateToken, songAdd);

export default router;
