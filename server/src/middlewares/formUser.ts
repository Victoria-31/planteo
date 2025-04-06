import type { RequestHandler } from "express";
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "string.max": "Le nom ne peut pas dépasser 50 caractères.",
    "string.empty": "Le nom est obligatoire.",
    "any.required": "Le nom est obligatoire.",
  }),

  email: Joi.string().required().messages({
    "string.empty": "L'email est obligatoire.",
    "any.required": "L'email est obligatoire.",
  }),
  password: Joi.string().min(8).max(100).label("password").required().messages({
    "string.empty": "Le champ ne peut pas être vide",
    "string.min": "Une longueur de 8 caractères est demandée",
    "any.required": "Le champ est obligatoire",
    "string.pattern":
      "Le mot de passe doit contenir des majuscules, minuscules et caractères spéciaux",
  }),
  password_confirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({ messages: { any: { allowOnly: "must match password" } } }),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    res.json(error.details[0].message);
  } else {
    next();
  }
};

export default { validate };
