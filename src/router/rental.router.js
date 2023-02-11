import { Router } from "express";

const userRouter = Router();

userRouter.get("/rentals");
userRouter.post("/rentals");
userRouter.post("/rentals/:id/return");
userRouter.delete("/rentals/:id");

export default userRouter;
