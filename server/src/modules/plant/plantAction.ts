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

const edit: RequestHandler = async (req, res, next) => {
  try {
    const plant = {
      id: Number(req.params.id),
      name: req.body.name,
      words: req.body.words,
      background: req.body.background,
      description: req.body.description,
      watering: req.body.watering,
      earth_id: req.body.earth_id,
      seedling_months: req.body.seedling_months,
      harvest_months: req.body.harvest_months,
    };

    const affectedRows = await plantRepository.update(plant);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await plantRepository.delete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  browseByCategory,
  edit,
  read,
  destroy,
};
