import { Router } from "express";
import { loginController, registerController } from "../../controllers/auth";
import {
  callbackGoogle,
  facebookCallbackController,
  loginFacebookController,
  loginGoogleController,
} from "../../controllers/oauth";
import passport from "passport";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);

router.get("/login/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Login failure",
  });
});

router.get("/login/success", (req, res) => {
  if (req.user)
    res.status(200).json({
      success: true,
      message: "Login success",
      user: req.user,
    });
});

// router.get(
//   "/login/google",
//   passport.authenticate(`google`, { scope: ["profile"] }),
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:3000/",
//     failureRedirect: "/login/failure",
//   }),
// );

router.get("/login/google", loginGoogleController);
router.get("/google/callback", callbackGoogle);

router.get("/login/facebook", loginFacebookController);
router.get("/facebook/callback", facebookCallbackController);
export default router;
