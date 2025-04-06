import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = req.user.id;
    const role = req.user.role;
    const user = await userRepository.read(id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    const user = await userRepository.readAll();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };

    const insertId = await userRepository.create(newUser);

    res.status(201).json({ insertId });
  } catch (err) {
    if (typeof err === "object" && err !== null && "code" in err) {
      const error = err as { code: string };

      if (error.code === "ER_DUP_ENTRY") {
        void res.status(400).json({ error: "Cet email est déjà utilisé." });
        return;
      }
    }
    next(err);
  }
};

export default { read, add, browse };
