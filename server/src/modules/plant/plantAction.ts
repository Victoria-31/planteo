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

export default {
  browse,
};
