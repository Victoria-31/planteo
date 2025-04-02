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

const browseByCategory: RequestHandler = async (req, res, next) => {
  try {
    const conditions: Record<string, string | string[]> = {};

    for (const [key, value] of Object.entries(req.query)) {
      if (typeof value === "string") {
        conditions[key] = value;
      } else if (Array.isArray(value)) {
        conditions[key] = value.filter(
          (v): v is string => typeof v === "string",
        );
      }
    }

    const plants = await plantRepository.readByCategory(conditions);
    res.json(plants);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  browseByCategory,
  read,
};
