import { Router } from "express";
import {
  loginController,
  registerController,
  verifyEmail,
} from "../../controllers/auth";
import {
  callbackGoogle,
  facebookCallbackController,
  loginFacebookController,
  loginGoogleController,
} from "../../controllers/oauth";
import { sendEmail } from "../../utils/email";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
// router.post("/verify-email", async (req, res) => {
//   await sendEmail(req.body);
//   res.status(200).json({
//     message: "success",
//     options: req.body,
//   });
// });

router.post("/verify-email", verifyEmail);

router.get("/login/google", loginGoogleController);
router.get("/google/callback", callbackGoogle);

router.get("/login/facebook", loginFacebookController);
router.get("/facebook/callback", facebookCallbackController);
export default router;
