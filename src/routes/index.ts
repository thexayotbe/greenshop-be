import { Router } from "express";
import authRouter from "./auth/auth";
import addressRouter from "./addrress";
import userRouter from "./user";
const router = Router();

router.use("/auth", authRouter);
router.use("/address", addressRouter);
router.use("/user", userRouter);
export default router;
