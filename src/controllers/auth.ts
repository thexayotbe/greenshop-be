import { CookieOptions, NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import jwt from "../services/jwt";
import { IUser } from "../types/userTypes";
import { bodyRequirer } from "./body_require";
import { password_incorrect, userNotFound } from "./messages";
import { comparePassword, hashPassword } from "./password_controller";
import {
  sign_in_required_values,
  sign_up_required_values,
} from "./required_values";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import unVerifiedUserModal from "../models/unVerifiedUserModal";

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

// const loginController = async (
//   { body }: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { email, password } = body;
//   try {
//     await bodyRequirer({ body, requiredValue: sign_in_required_values });
//     const user = await UserModel.findOne({
//       email: body.email,
//     });
//     console.log(user);
//     // const pwCheck = await comparePassword(body.password, user.password);
//     if (UserModel.length) res.status(401).json(userNotFound);

//     // if (!pwCheck) res.status(401).json(password_incorrect);
//     //
//     return createAndSendToken(UserModel, 200, res);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user);

    if (
      user &&
      (await user?.correctPassword(password, String(user.password)))
    ) {
      return createAndSendToken(user, 200, res);
    }

    return next(new AppError("Incorrect email or password!", 401));
  },
);

// <------ REGISTER  ------->

// const registerController = async ({ body }: Request, res: Response) => {
//   try {
//     await bodyRequirer({ body, requiredValue: sign_up_required_values });

//     const hashed_password = await hashPassword(body.password);

//     const created_user = await UserModel.create({
//       password: body.password,
//       email: body.email,
//       username: body.username,
//     });

//     createAndSendToken(created_user, 201, res);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

const registerController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password, passwordConfirm } = req.body;

    const user = await unVerifiedUserModal.create({
      email,
      username,
      password,
      passwordConfirm,
    });
    res.send(user);
  },
);
export { loginController, registerController };
