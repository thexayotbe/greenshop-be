import React from "react";
import { useSelector } from "react-redux";
import AuthSection from "../Auth";

const ModalController = () => {
  const { authModalVisibility } = useSelector((state) => state.modal);
  return (
    <>
      {/* Contolling auth : login & signup */}
      {authModalVisibility && <AuthSection />}
    </>
  );
};

export default ModalController;
