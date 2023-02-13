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

export async function addRental(req, res) {
	const { customerId, gameId, daysRented } = req.body;

	try {
		const game = await db.query(`SELECT * FROM games WHERE id= $1`, [
			gameId,
		]);
		console.log("GAME");
		if (game.rowCount == 0) return res.sendStatus(400);

		const customer = await db.query(`SELECT * FROM games WHERE id= $1`, [
			customerId,
		]);
		console.log("CUSTOMER");
		if (customer.rowCount == 0) return res.sendStatus(400);
		console.log("DAYS");
		if (daysRented <= 0) return res.sendStatus(400);

		const gameArr = game.rows[0];
		const customerArr = customer.rows[0];

		const newRental = {
			customerId,
			gameId,
			daysRented,
			rentDate: Date.now(),
			originalPrice: gameArr.pricePerDay * daysRented,
			returnDate: null,
			delayFee: null,
		};
		await db.query(
			`INSERT INTO rentals (
				"customerId", 
				"gameId", 
				"daysRented", 
				"rentDate", 
				"originalPrice", 
				"returnDate", 
				"delayFee") 
				VALUES ($1, $2, $3, $4, $5, $6, $7)`,
			[
				customerId,
				gameId,
				daysRented,
				Date.now(),
				gameArr.pricePerDay * daysRented,
				null,
				null,
			]
		);
		return res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal server error");
	}
}
