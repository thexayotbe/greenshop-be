import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "../Components/Navbar";

const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}></Route>
      </Routes>
    </>
  );
};

export default Root;
