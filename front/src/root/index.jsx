import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from "../Components/Home";
import Account from "../Components/Account";
import Form from "../Components/Account/Location/Form";
const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/account/location/:billingAddressId"
            element={<Form />}
          />
          <Route path="/account/location/create" element={<Form />} />
        </Route>
      </Routes>
    </>
  );
};

export default Root;
