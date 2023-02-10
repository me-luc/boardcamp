import Joi from "joi";

export default clientSchema = Joi.object({
	name: Joi.string().min(2).required(),
	phone: Joi.string().min(5).required(),
	cpf: Joi.string().min(11).max(11).required(),
	birthday: Joi.date().required(),
});
