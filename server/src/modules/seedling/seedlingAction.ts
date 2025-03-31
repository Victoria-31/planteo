import type { RequestHandler } from "express";
import seedlingRepository from "./seedlingRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const seedling = await seedlingRepository.readAll();

    res.json(seedling);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
};
