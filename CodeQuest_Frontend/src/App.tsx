import { useState } from "react";
import router from "./routes";

import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster/>
    </>
  );
}

export default App;
