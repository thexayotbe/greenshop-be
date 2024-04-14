import { Router } from "express";
import authRouter from "./auth/auth";
import addressRouter from "./addrress";

const router = Router();

router.use("/auth", authRouter);
router.use("/address", addressRouter);

export default router;
