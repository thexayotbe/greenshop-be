import { CookieOptions, Request, Response, Router } from "express";
import { user as UserModel } from "../models/userModel";
import jwt from "../services/jwt";
import oauth from "../services/oauth";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../types/userTypes";
import queryStringify from "../utils/queryStringify";
const tokenCreate = (user: IUser, res: Response) => {
  const tokenPayload = {
    username: user.username,
    email: user.email,
    _id: String(user._id),
  };

  const token = jwt.sign(tokenPayload);
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 3600 * 1000,
    ),
    secure: false,
  };
  res.cookie("token", token, cookieOptions);
  user.password = undefined;
  res.redirect(`http://localhost:3000?${queryStringify({ token })}`);
};

const loginGoogleController = (req: Request, res: Response) => {
  return oauth.googleSetup(res);
};

const callbackGoogle = async (req: Request, res: Response) => {
  const code = req.query.code;

  const { data }: any = await oauth.googleGetToken(String(code));

  const googleUser: any = await oauth.googleGetUser({
    access_token: data.access_token,
    id_token: data.id_token,
    res,
  });

  let user = await UserModel.findOne({ email: googleUser.email });

  if (!user) {
    const newPassword = uuidv4().slice(0, 8);
    user = await UserModel.create({
      email: googleUser.email,
      username: googleUser.given_name,
      password: newPassword,
      passwordConfirm: newPassword,
    });
  }
  tokenCreate(user, res);
};
const loginFacebookController = (req: Request, res: Response) => {
  return oauth.facebookSetUp(res);
};

const facebookCallbackController = async (req: Request, res: Response) => {
  const { code } = req.query;
  const data: any = await oauth.facebookGetToken(String(code));
  const faceBookUser = await oauth.facebookGetUser(data.access_token, res);
  let user = await UserModel.findOne({ email: faceBookUser.email });
  if (!user) {
    const newPassword = uuidv4().slice(0, 8);
    user = await UserModel.create({
      email: faceBookUser.email,
      username: faceBookUser.given_name,
      password: newPassword,
      passwordConfirm: newPassword,
    });
  }
  tokenCreate(user, res);
};

export {
  loginGoogleController,
  callbackGoogle,
  loginFacebookController,
  facebookCallbackController,
};
