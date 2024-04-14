import { Router } from "express";
import {
  deleteBillingAddressController,
  getBillingAddressController,
  getBillingAddressesController,
  postBillingAddressController,
  updateAddressController,
} from "../../controllers/billingAddressController";

const router = Router();

//  GET METHODS
router.get("/get-addresses/:id", getBillingAddressesController);
router.get("/get-address/:id/:billingAddressId", getBillingAddressController);

//  POST METHODS

router.post("/create/:id", postBillingAddressController);
router.post("/update/:id/:billingAddressId", updateAddressController);

//  DELETE METHODS

router.delete("/delete/:id/:billingAddressId", deleteBillingAddressController);
export default router;
