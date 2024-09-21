import React from "react";
import Navbar from "./pages/Navbar";
import { AuthLayout } from "./layouts/AuthLayout";

const App = () => {
  return (
    <div>
      <Navbar />
      <AuthLayout/>
      
    </div>
  );
};

export default App;
