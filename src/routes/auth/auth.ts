import { Router } from "express";
import { loginController, registerController } from "../../controllers/auth";
import { callbackGoogle, loginGoogleController } from "../../controllers/oauth";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);

router.get("/login/google", loginGoogleController);
router.get("/google/callback", callbackGoogle);
export default router;
