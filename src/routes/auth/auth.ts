import { Request, Response, Router } from "express";
import { user } from "../../models/userModel";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/login", (req: Request, res: Response) => {
  return res.send("Hello world");
});
router.post("/register", async ({ body }: Request, res: Response) => {
  try {
    const foundUser = await user.find({ email: body.email });
    if (foundUser.length)
      return res.status(406).json({
        message: "error",
        extraMessage:
          "User with same email already exists. Please make sure email is unique",
      });

    const created_user = await user.create({
      name: body.name,
      surname: body.surname,
      password: body.password,
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

export default router;
