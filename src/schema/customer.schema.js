import Joi from "joi";

export default customerSchema = Joi.object({
	name: Joi.string().min(2).required(),
	phone: Joi.string().min(10).max(11).required(),
	cpf: Joi.string().min(11).max(11).required(),
	birthday: Joi.date().required(),
});
