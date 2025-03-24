import type { RequestHandler } from "express";
import plantRepository from "./plantRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const offers = await plantRepository.readAll();

    res.json(offers);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
};
