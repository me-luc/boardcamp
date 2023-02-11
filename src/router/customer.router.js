import { Router } from "express";
import {
	getCustomerById,
	getCustomers,
} from "../controller/customer.controller.js";

const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomerById);
customerRouter.post("/customers");
customerRouter.put("/customers/:id");

export default customerRouter;
