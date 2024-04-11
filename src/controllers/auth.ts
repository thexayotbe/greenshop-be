import { NextFunction, Request, Response } from "express";
import jwt from "../services/jwt";
import { IUser } from "../types/userTypes";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import unVerifiedUserModal from "../models/unVerifiedUserModal";
import { sendEmail } from "../utils/email";
import { generateRandomNumber } from "../utils/codeGenerator";
import userModel from "../models/userModel";

// Utility function to create and send token
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
  const cookieOptions = {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 3, // 3 days
    secure: true,
  };
  res.cookie("token", token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({ status: "success", token, data: { user } });
};

// Controller to resend verification email
const resendEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const verificationCode = generateRandomNumber(6);

    await sendEmail({
      email: email,
      subject: "Verification code for email",
      text: verificationCode,
    });

    await unVerifiedUserModal.findOneAndUpdate(
      { email: email },
      { verificationCode: verificationCode },
    );
    res.status(200).json({
      message: "success",
    });
  },
);

// Controller to verify user
const verifyUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, userVerificationCode, passwordConfirm, password, username } =
      req.body;
    const user = await unVerifiedUserModal.findOne({ email });

    if (userVerificationCode == user?.verificationCode) {
      const verifiedUser = await userModel.create({
        username,
        email,
        password,
        passwordConfirm,
      });
      createAndSendToken(verifiedUser, 201, res);
    } else {
      return next(new AppError("Verification code expired", 401));
    }
  },
);

// Controller for user login
const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (
      user &&
      (await user?.correctPassword(password, String(user.password)))
    ) {
      return createAndSendToken(user, 200, res);
    }

    return next(new AppError("Incorrect email or password!", 401));
  },
);

// Controller for user registration
const registerController = catchAsync(
  async ({ body }: Request, res: Response, next: NextFunction) => {
    const { email, username, password, passwordConfirm } = body;

    const verificationCode = generateRandomNumber(6);

    await unVerifiedUserModal.create({
      email,
      username,
      password,
      passwordConfirm,
      verificationCode,
    });

    await sendEmail({
      email: email,
      subject: "Verification code for email",
      text: verificationCode,
    });

    res.send({ message: "User registered successfully" });
  },
);

export { loginController, registerController, verifyUser, resendEmail };
