import { Router } from "express";
import {
	addRental,
	deleteRental,
	finishRental,
	getRentals,
} from "../controller/rental.controller.js";
import validateSchema from "../middleware/validateSchema.js";
import { rentalSchema } from "../schema/rental.schema.js";

const rentalRouter = Router();

rentalRouter.get("/rentals", getRentals);
rentalRouter.post("/rentals", validateSchema(rentalSchema), addRental);
rentalRouter.post("/rentals/:id/return", finishRental);
rentalRouter.delete("/rentals/:id", deleteRental);

export default rentalRouter;
