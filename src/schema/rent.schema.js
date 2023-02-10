import Joi from "joi";

export default rentSchema = Joi.object({
	rentDate: Joi.date().required(),
	daysRented: Joi.number().min(1).required(),
	returnDate: Joi.date().required(),
	originalPrice: Joi.number().min(1).required(),
	delayFee: Joi.number().min(0).required(),
});
