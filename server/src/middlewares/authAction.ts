import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import userAction from "../modules/user/userAction";
import userRepository from "../modules/user/userRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await userRepository.readByEmailWithPassword(req.body.email);

    req.user = {
      password: user.hashed_password,
      id: user.id,
      email: user.email,
      role: user.role,
    };

    if (!req.user) {
      res.sendStatus(403);
    }

    const verified = await argon2.verify(req.user.password, req.body.password);

    if (!verified) {
      res.sendStatus(422);
    } else {
      const payload = {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      };

      if (!process.env.APP_SECRET) {
        throw new Error(
          "Vous n'avez pas configuré votre APP SECRET dans le .env",
        );
      }

      const token = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y",
      });
      res.cookie("auth", token).send({
        message: "Utilisateur connecté",
        role: req.user.role,
      });
    }
  } catch (error) {
    next(error);
  }
};

const logout: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("auth").send("Cookies supprimés");
  } catch (error) {
    next(error);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashed_password = hashedPassword;

    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};

const verifyUser: RequestHandler = async (req, res, next) => {
  if (!process.env.APP_SECRET) {
    throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
  }

  try {
    const { auth } = req.cookies;

    if (!auth) {
      res.sendStatus(403);
    }

    const resultPayload = await jwt.verify(auth, process.env.APP_SECRET);

    if (typeof resultPayload !== "object") {
      throw new Error("Token invalid");
    }

    // doute ici si il faut pas définir un id
    if (resultPayload.role === "user") {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const verifyAdmin: RequestHandler = async (req, res, next) => {
  if (!process.env.APP_SECRET) {
    throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
  }

  try {
    const { auth } = req.cookies;

    if (!auth) {
      res.sendStatus(403);
    }

    const resultPayload = await jwt.verify(auth, process.env.APP_SECRET);

    if (typeof resultPayload !== "object") {
      throw new Error("Token invalid");
    }

    if (resultPayload.role === "admin") {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default { login, logout, hashPassword, verifyUser, verifyAdmin };
