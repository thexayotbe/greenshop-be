import { Router } from "express";
import { loginController, registerController } from "../../controllers/auth";
import {
  callbackGoogle,
  facebookCallbackController,
  loginFacebookController,
  loginGoogleController,
} from "../../controllers/oauth";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);

router.get("/login/google", loginGoogleController);
router.get("/google/callback", callbackGoogle);
router.get("/login/facebook", loginFacebookController);
router.get("/facebook/callback", facebookCallbackController);
export default router;
