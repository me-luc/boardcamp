import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {
	try {
		const table = await db.query(
			`SELECT rentals.*, 
				customers.id AS "customerId", 
				customers.name as "customerName",
				games.id AS "gameId", 
				games.name AS "gameName"
			FROM rentals 
			JOIN customers 
			ON rentals."customerId" = customers.id 
			JOIN games 
			ON rentals."gameId" = games.id;`
		);

		const formattedRentals = table.rows.map((row) => ({
			id: row.id,
			customerId: row.customerId,
			gameId: row.gameId,
			rentDate: row.rentDate,
			daysRented: row.daysRented,
			returnDate: row.returnDate, // troca pra uma data quando já devolvido
			originalPrice: row.originalPrice,
			delayFee: row.delayFee,
			customer: {
				id: row.customerId,
				name: row.customerName,
			},
			game: {
				id: row.gameId,
				name: row.gameName,
			},
		}));

		return res.status(201).send(formattedRentals);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal server error");
	}
}

export async function addRental() {}
