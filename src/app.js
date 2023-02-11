import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gameRouter from "./router/game.router.js";
import customerRouter from "./router/customer.router.js";
import rentalRouter from "./router/rental.router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use([gameRouter, customerRouter, rentalRouter]);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}...`);
});
