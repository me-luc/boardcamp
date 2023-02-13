import { Router } from "express";
import { getRentals } from "../controller/rental.controller.js";

const rentalRouter = Router();

rentalRouter.get("/rentals", getRentals);
rentalRouter.post("/rentals");
rentalRouter.post("/rentals/:id/return");
rentalRouter.delete("/rentals/:id");

export default rentalRouter;
