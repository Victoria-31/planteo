import type { RequestHandler } from "express";
import plantUserRepository from "./plantUserRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const plantUser = await plantUserRepository.readAll();

    res.json(plantUser);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newPlantUser = {
      plant_id: req.body.plant_id,
    };

    const insertId = await plantUserRepository.create(newPlantUser);

    res.status(201).json({ insertId });
  } catch (err) {
    if (typeof err === "object" && err !== null && "code" in err) {
      const error = err as { code: string };

      if (error.code === "ER_DUP_ENTRY") {
        void res
          .status(400)
          .json({ error: "Cette plante est déjà dans votre jardin." });
        return;
      }
    }
    next(err);
  }
};

export default {
  browse,
  add,
};
