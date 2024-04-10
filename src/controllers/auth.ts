import { CookieOptions, NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import jwt from "../services/jwt";
import { IUser } from "../types/userTypes";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import unVerifiedUserModal from "../models/unVerifiedUserModal";
import { sendEmail } from "../utils/email";
import { generateRandomNumber } from "../utils/codeGenerator";

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

  res.status(statusCode).json({ status: "success", token, data: { user } });
};

const verifyEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    console.log(22, email);

    // const user = await User.findOne({ email });

    // if (!user) {
    //   return next(new AppError("There is no user with this email!", 404));
    // }
    // const emailVerificationCode = await user.createVerificationToken();
    const verificationCode = generateRandomNumber(6);
    await sendEmail({
      email: email,
      subject: "Verification code for email",
      text: verificationCode,
    });
    // console.log(user);
    res.status(200).json({
      message: "success",
    });
  },
);

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
//     const created_user = await User.create({
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
  async ({ body }: Request, res: Response, next: NextFunction) => {
    console.log(body);

    const { email, username, password, passwordConfirm } = body;
    const user = await unVerifiedUserModal.create({
      email,
      username,
      password,
      passwordConfirm,
    });

    res.send(user);
  },
);
export { loginController, registerController, verifyEmail };
