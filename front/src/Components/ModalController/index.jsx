import React from "react";
import { useSelector } from "react-redux";
import AuthSection from "../Auth";
import { EmailVerification } from "../Auth/EmailVerification";

const ModalController = () => {
  const { authModalVisibility, emailVerificationModalVisibility } = useSelector(
    (state) => state.modal,
  );
  return (
    <>
      {/* Contolling auth : login & signup */}
      {authModalVisibility && <AuthSection />}
      {emailVerificationModalVisibility && <EmailVerification />}
      {}
    </>
  );
};

export default ModalController;
