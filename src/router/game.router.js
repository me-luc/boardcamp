import { Router } from "express";

const gameRouter = Router();

gameRouter.get("/games");
gameRouter.post("/game");

export default gameRouter;
