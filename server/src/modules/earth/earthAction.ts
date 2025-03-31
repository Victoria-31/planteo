import type { RequestHandler } from "express";
import earthRepository from "./earthRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const earth = await earthRepository.readAll();

    res.json(earth);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
};
