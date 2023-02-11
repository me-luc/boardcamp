import { db } from "../database/database.connection.js";

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
