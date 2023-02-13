import dayjs from "dayjs";
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
				dayjs().format("YYYY-MM-DD"),
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

export async function finishRental(req, res) {
	const { id } = req.params;

	try {
		const result = await db.query("SELECT * FROM rentals WHERE id = $1", [
			id,
		]);
		if (result.rowCount == 0) return res.sendStatus(404);
		const rental = result.rows[0];

		if (rental.returnDate) return res.sendStatus(400);

		const game = await db.query(`SELECT * FROM games WHERE id = $1`, [
			rental.gameId,
		]);

		const start = rental.rentDate;
		const end = dayjs();
		const delayedDays =
			Math.abs(dayjs(start).diff(end, "day")) - rental.daysRented;
		const delayFee = delayedDays * game.rows[0].pricePerDay;

		await db.query(
			`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
			[end.format("YYYY-MM-DD"), delayFee, id]
		);
		return res.sendStatus(200);
	} catch (error) {}
}

export async function deleteRental(req, res) {
	const { id } = req.params;

	try {
		const result = await db.query(`SELECT * FROM rentals WHERE id = $1`, [
			id,
		]);
		if (result.rowCount == 0) return res.sendStatus(404);

		const rental = result.rows[0];

		if (rental.returnDate) return res.sendStatus(400);

		await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
		return res.sendStatus(200);
	} catch (error) {}
}
