import { query } from "express";
import { db } from "../database/database.connection.js";
import { gameSchema } from "../schema/game.schema.js";

export async function getGames(req, res) {
	try {
		const game = await db.query(`SELECT * FROM games;`);

		return res.status(201).send(game.rows);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal server error");
	}
}

export async function addGames(req, res) {
	const newGame = req.body;

	const { error } = gameSchema.validate(newGame);
	if (error) {
		const errors = error.details.map((detail) => detail.message);
		return res.status(400).send(errors);
	}

	try {
		const gameExist = await db.query(
			`SELECT * FROM games WHERE name = $1`,
			[newGame.name]
		);

		if (gameExist.rowCount > 0)
			return res.status(409).send("Game name already exists");

		await db.query(
			`INSERT INTO games ( name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`,
			[
				newGame.name,
				newGame.image,
				newGame.stockTotal,
				newGame.pricePerDay,
			]
		);

		return res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal server error");
	}
}
