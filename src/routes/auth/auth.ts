import { Router } from "express";
import {
  loginController,
  registerController,
  resendEmail,
  verifyUser,
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

router.post("/verify-email", verifyUser);
router.post("/resend-email", resendEmail);

router.get("/login/google", loginGoogleController);
router.get("/google/callback", callbackGoogle);

router.get("/login/facebook", loginFacebookController);
router.get("/facebook/callback", facebookCallbackController);
export default router;
