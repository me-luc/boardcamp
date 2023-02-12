import { db } from "../database/database.connection.js";
import customerSchema from "../schema/customer.schema.js";

export async function getCustomers(req, res) {
	try {
		const customers = await db.query(`SELECT * FROM customers;`);

		return res.status(201).send(customers.rows);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal server error");
	}
}

export async function getCustomerById(req, res) {
	const { id } = req.params;

	try {
		const customer = await db.query(
			`SELECT * FROM customers WHERE id = $1`,
			[id]
		);

		if (customer.rowCount == 0) return res.sendStatus(404);
		return res.status(200).send(customer.rows);
	} catch (error) {}
}

export async function addCustomer(req, res) {
	const newCustomer = req.body;

	const { error } = customerSchema.validate(newCustomer);
	if (error) {
		const errors = error.details.map((detail) => detail.message);
		return res.status(400).send(errors);
	}

	try {
		const { name, phone, cpf, birthday } = newCustomer;

		const customerExists = await db.query(
			`SELECT * FROM customers WHERE cpf = $1`,
			[cpf]
		);
		if (customerExists.rowCount > 0) return res.sendStatus(409);

		await db.query(
			`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
			[name, phone, cpf, birthday]
		);
		return res.status(201);
	} catch (error) {
		console.log("ERROR ADDING CUSTOMER ->", error);
		return res.status(500).send("Internal server error");
	}
}
