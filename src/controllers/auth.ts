import { CookieOptions, Request, Response } from "express";
import { user as UserModel } from "../models/userModel";
import jwt from "../services/jwt";
import { hashPassword, comparePassword } from "./password_controller";
// import { password_incorrect, userNotFound } from "./messages";
import { bodyRequirer } from "./body_require";
import {
  sign_in_required_values,
  sign_up_required_values,
} from "./required_values";
import { IUser } from "../types/userTypes";

const createAndSendToken = (
  user: IUser,
  statusCode: 200 | 201,
  res: Response,
) => {
  const tokenPayload = {
    username: user.username,
    email: user.email,
    _id: String(user._id),
  };

  const token = jwt.sign(tokenPayload);
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 3,
    secure: true,
    // signed: true,
  };
  res.cookie("token", token, cookieOptions);
  user.password = undefined;
  console.log(22);
  res.status(statusCode).json({ status: "success", token, data: { user } });
};

// <------ Login  ------->

const loginController = async ({ body }: Request, res: Response) => {
  console.log(21);

  try {
    await bodyRequirer({ body, requiredValue: sign_in_required_values });
    const user = await UserModel.findOne({
      email: body.email,
    });
    console.log(user);
    // const pwCheck = await comparePassword(body.password, user.password);
    if (user.length) res.status(401).json(userNotFound);

    // if (!pwCheck) res.status(401).json(password_incorrect);

    return createAndSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json(error);
  }
};

// <------ REGISTER  ------->

const registerController = async ({ body }: Request, res: Response) => {
  try {
    await bodyRequirer({ body, requiredValue: sign_up_required_values });

    const hashed_password = await hashPassword(body.password);

    const created_user = await UserModel.create({
      password: body.password,
      email: body.email,
      username: body.username,
    });
    createAndSendToken(created_user, 201, res);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { loginController, registerController };
