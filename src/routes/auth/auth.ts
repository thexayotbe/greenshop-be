import { Request, Response, Router } from "express";
import { user } from "../../models/userModel";
import jwt from "jsonwebtoken";
const router = Router();
import { hashPassword, comparePassword } from "../../controllers/auth_user";
import { password_incorrect, userNotFound } from "../../controllers/messages";
import { bodyRequirer } from "../../controllers/body_require";
import { sign_in_required_values } from "../../controllers/required_values";
import passport from "passport";

router.post("/login", async ({ body }: Request, res: Response) => {
  try {
    await bodyRequirer({ body, requiredValue: sign_in_required_values });
    const data = await user.findOne({
      email: body.email,
    });

    const pwCheck = await comparePassword(body.password, data.password);

    if (data.length) res.status(401).json(userNotFound);

    if (!pwCheck) res.status(401).json(password_incorrect);

    const token = jwt.sign({ user: data }, String(process.env.SECRET_KEY));
    res.status(200).json({
      message: "success",
      token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/register", async ({ body }: Request, res: Response) => {
  try {
    await bodyRequirer({ body, requiredValue: sign_in_required_values });

    const foundUser = await user.find({ email: body.email });

    if (foundUser.length) return res.status(406).json(userNotFound);

    const hashed_password = await hashPassword(body.password);

    const created_user = await user.create({
      name: body.name,
      surname: body.surname,
      password: hashed_password,
      email: body.email,
      username: body.username,
    });

    const token = jwt.sign(
      { user: created_user },
      String(process.env.SECRET_KEY),
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });
    return res.status(200).json({
      message: "Success",
      token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  },
);

export default router;
