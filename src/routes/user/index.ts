import Router from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../../controllers/userController";

const router = Router();

router.get("/get/:id", getUser);

router.post("/update/:id", updateUser);

router.delete("/delete/:id", deleteUser);

export default router;
