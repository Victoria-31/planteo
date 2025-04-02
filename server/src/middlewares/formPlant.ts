import type { RequestHandler } from "express";
import Joi from "joi";

const plantSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  name: Joi.string().max(255).required().messages({
    "string.max": "Le nom ne peut pas dépasser 255 caractères.",
    "string.empty": "Le nom est obligatoire.",
    "any.required": "Le nom est obligatoire.",
  }),
  words: Joi.string().max(100).required().messages({
    "string.max": "Les mots-clés ne peuvent pas dépasser 100 caractères.",
    "string.empty": "Les mots-clés sont obligatoires.",
    "any.required": "Les mots-clés sont obligatoires.",
  }),
  background: Joi.string().required().messages({
    "string.empty": "L'arrière-plan est obligatoire.",
    "any.required": "L'arrière-plan est obligatoire.",
  }),
  description: Joi.string().required().messages({
    "string.empty": "La description est obligatoire.",
    "any.required": "La description est obligatoire.",
  }),
  watering: Joi.string().max(100).required().messages({
    "string.max": "L'arrosage ne peut pas dépasser 100 caractères.",
    "string.empty": "L'arrosage est obligatoire.",
    "any.required": "L'arrosage est obligatoire.",
  }),
  earth_id: Joi.number().integer().positive().required().messages({
    "number.base": "Le champ de la terre doit être un nombre.",
    "number.integer": "Le champ de de la terre doit être un entier.",
    "number.positive": "Le champ de de la terre doit être positif.",
    "any.required": "Le champ de de la terre est obligatoire.",
  }),
  seedling_months: Joi.array().items(
    Joi.number().integer().min(1).max(12).required().messages({
      "number.base": "Chaque mois de semis doit être un nombre.",
      "number.integer": "Chaque mois de semis doit être un entier.",
      "number.min": "Chaque mois de semis doit être compris entre 1 et 12.",
      "number.max": "Chaque mois de semis doit être compris entre 1 et 12.",
      "any.required": "Les mois de semis ne peuvent pas être vides.",
    }),
  ),
  harvest_months: Joi.array().items(
    Joi.number().integer().min(1).max(12).required().messages({
      "number.base": "Chaque mois de récolte doit être un nombre.",
      "number.integer": "Chaque mois de récolte doit être un entier.",
      "number.min": "Chaque mois de récolte doit être compris entre 1 et 12.",
      "number.max": "Chaque mois de récolte doit être compris entre 1 et 12.",
      "any.required": "Les mois de récolte ne peuvent pas être vides.",
    }),
  ),
});
const validate: RequestHandler = (req, res, next) => {
  const { error } = plantSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

export default { validate };
