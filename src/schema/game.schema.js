import Joi from "joi";

export const gameSchema = Joi.object({
	name: Joi.string().min(2).required(),
	image: Joi.string().uri().required(),
	stockTotal: Joi.number().min(1).required(),
	pricePerDay: Joi.number().min(1).required(),
});
