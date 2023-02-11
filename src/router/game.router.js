import { Router } from "express";
import { addGames, getGames } from "../controller/game.controller.js";

const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.post("/games", addGames);

export default gameRouter;
