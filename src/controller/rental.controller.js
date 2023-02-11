import { db } from "../database/database.connection";

export async function getRentals(req, res) {
	try {
		const rentals = await db.query(`SELECT * FROM rentals;`);

		return res.status(201).send(rentals.rows);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal server error");
	}
}
