import type { RequestHandler } from "express";
import plantRepository from "./plantRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const plants = await plantRepository.readAll();

    res.json(plants);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const plantId = Number(req.params.id);
    const plant = await plantRepository.read(plantId);

    if (plant == null) {
      res.sendStatus(404);
    } else {
      res.json(plant);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
};
