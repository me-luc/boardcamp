import { Router } from "express";

const clientRouter = Router();

clientRouter.get("/customers");
clientRouter.get("/customers/:id");
clientRouter.post("/customers");
clientRouter.put("/customers/:id");

export default clientRouter;
