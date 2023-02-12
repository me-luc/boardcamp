import { Router } from "express";
import {
	addCustomer,
	getCustomerById,
	getCustomers,
	updateCustomer,
} from "../controller/customer.controller.js";
import validateSchema from "../middleware/validateSchema.js";
import { customerSchema } from "../schema/customer.schema.js";

const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomerById);
customerRouter.post("/customers", validateSchema(customerSchema), addCustomer);
customerRouter.put(
	"/customers/:id",
	validateSchema(customerSchema),
	updateCustomer
);

export default customerRouter;
