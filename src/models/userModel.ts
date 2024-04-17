import mongoose, { Schema, Types } from "mongoose";
import validator from "validator";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { IBillingAddress } from "./billingAddressModel";
import { user_db } from "../config/db";

export interface IUser extends Types.ObjectId {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  active?: boolean;
  verificationExpiresDate: string;
  verificationToken: string;
  billingAddress?: IBillingAddress[];
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
  createVerificationToken(): Promise<string>;
}

const user_model = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Email is required!"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide us valid email!"],
  },
  phoneNumber: {
    type: String,
    trim: true,
    default: "",
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  avatarUrl: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide us password!"],
    minLength: [8, "Password should have 8 characters!"],
    select: false,
  },
  passwordConfirm: {
    type: String || undefined,
    required: [true, "Please confirm password!"],
    validate: {
      validator: function (this: IUser, val: String): boolean {
        return val == this.password;
      },
      message: "Passwords are not same!",
    },
  },
  verificationToken: {
    type: String,
    select: false,
    required: false,
  },
  verificationExpireDate: {
    type: String,
    select: false,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  billingAddress: [{ type: Schema.ObjectId, ref: "billingAddress" }],
});
user_model.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.passwordConfirm = "";
  next();
});

user_model.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, userPassword);
};

user_model.methods.createVerificationToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.verification = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.verificationExpiresDate = Date.now() + 10 * 60 * 1000;

  console.log("this in createVerificationToken", this);
  console.log({ resetToken }, this.verificationToken);
  return resetToken;
};

export default user_db.model<IUser>("user", user_model);
