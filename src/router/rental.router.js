import { Router } from "express";

const rentalRouter = Router();

rentalRouter.get("/rentals");
rentalRouter.post("/rentals");
rentalRouter.post("/rentals/:id/return");
rentalRouter.delete("/rentals/:id");

export default rentalRouter;
