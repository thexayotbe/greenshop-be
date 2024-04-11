import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from "../Components/Home";
import Account from "../Components/Account";
const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </>
  );
};

export default Root;
