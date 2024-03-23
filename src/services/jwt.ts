import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default {
  sign: (payload: {
    username: string;
    email: string;
    _id: string;
  }): string | unknown => {
    try {
      const token = jwt.sign(payload, String(process.env.SECRET_KEY), {
        expiresIn: String(process.env.JWT_EXPIRES_IN),
      });
      return token;
    } catch (err) {
      console.log("jwt-sign error", err);
      return err;
    }
  },
  verify: () => {},
};
