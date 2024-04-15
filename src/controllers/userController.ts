import { Request, Response } from "express";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import bcrypt from "bcrypt";
const checkPassword = async (
  user: any,
  password: string,
  target: string,
  newPassword: string,
  confirmPassword: string,
) => {
  console.log(password, target);
  return (
    (await user?.correctPassword(password, String(target))) &&
    newPassword === confirmPassword
  );
};

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, userName, password, email, phoneNumber } =
    req.body;
  const user = await User.findById(id).select("+password");

  if (user) {
    if (!Object.keys(req.body.password).length) {
      await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        userName,
        email,
        phoneNumber,
      });
    } else {
      if (
        await checkPassword(
          user,
          password.currentPassword,
          String(user.password),
          password.newPassword,
          password.passwordConfirm,
        )
      ) {
        await User.findByIdAndUpdate(id, {
          firstName,
          lastName,
          userName,
          email,
          phoneNumber,
          password: await bcrypt.hash(password.newPassword, 12),
          passwordConfirm: undefined,
        });
      } else {
        throw new AppError("Password didn`t match", 400);
      }
    }
    res.status(200).json({
      status: "success",
      message: "User has been updated successfully",
    });
  }
  throw new AppError("User not found", 404);
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({
    data: user,
    status: "success",
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError("User not found", 404);

  res.status(202).json({
    status: "success",
  });
});

export { getUser, updateUser, deleteUser };
