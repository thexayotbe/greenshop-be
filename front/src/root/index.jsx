import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Home from "../Components/Home";

const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default Root;
