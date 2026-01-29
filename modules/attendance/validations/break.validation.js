const Joi = require("joi");

const startBreakSchema = Joi.object({
  break_type: Joi.string().valid("lunch", "tea", "other").required(),
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
  reason: Joi.string().max(255).optional(),
});

const endBreakSchema = Joi.object({
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
});

module.exports = { startBreakSchema, endBreakSchema };
