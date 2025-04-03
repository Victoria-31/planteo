import type { RequestHandler } from "express";
import plantUserRepository from "./plantUserRepository";

const browsePlantByUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const plantUser = await plantUserRepository.readAll(userId);

    res.json(plantUser);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newPlantUser = {
      user_id: req.user.id,

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

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const plantId = Number(req.params.id);
    const userId = req.user.id;

    await plantUserRepository.delete(plantId, userId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browsePlantByUser,
  add,
  destroy,
};
