import React from "react";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
