import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import billingAddressModel, {
  IBillingAddress,
} from "../models/billingAddressModel";

const postBillingAddressController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const billingAddress = await billingAddressModel.create(req.body);

    const user = await User.findById<IUser>(id);
    await User.findByIdAndUpdate<IUser>(id, {
      billingAddress: [
        ...(user?.billingAddress as Array<IBillingAddress>),
        billingAddress,
      ],
    });

    res.status(200).json({
      billingAddress,
      message: "Billing address has been updated successfully",
      status: "success",
    });
  },
);

const getBillingAddressController = catchAsync(
  async (req: Request, res: Response) => {
    const { id, billingAddressId } = req.params;
    const billingAddress = await billingAddressModel.findById(billingAddressId);

    if (!billingAddress) {
      throw new AppError("Billing address not found", 404);
    }

    res.status(200).json({
      data: billingAddress,
      status: "success",
    });
  },
);

const deleteBillingAddressController = catchAsync(
  async (req: Request, res: Response) => {
    const { id, billingAddressId } = req.params;

    await billingAddressModel.findByIdAndDelete(billingAddressId);

    res.status(200).json({
      status: "success",
      message: "Billing address has been deleted successfully",
    });
  },
);

const updateAddressController = catchAsync(
  async (req: Request, res: Response) => {
    const { id, billingAddressId } = req.params;
    const billingAddress = await billingAddressModel.findByIdAndUpdate(
      billingAddressId,
      req.body,
    );

    res.status(200).json({
      data: billingAddress,
      message: "Billing address has been updated successfully",
      status: "success",
    });
  },
);

const getBillingAddressesController = catchAsync(
  async (req: Request, res: Response) => {
    const { id, billingAddressId } = req.params;

    const user = await User.findById(id).populate("billingAddress");
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const billingAddresses = user.billingAddress;
    res.status(200).json({
      data: billingAddresses,
      status: "success",
    });
  },
);
export {
  updateAddressController,
  getBillingAddressController,
  postBillingAddressController,
  deleteBillingAddressController,
  getBillingAddressesController,
};
