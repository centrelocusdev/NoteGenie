import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

import Home from "./pages/general/Home";
import Signup from "./pages/general/Signup";
import Signin from "./pages/general/Signin";
import PrivateRoutes from "./PrivateRoutes";
import Templates from "./pages/dashboard/Templates";
import Editor from "./pages/dashboard/Editor";

function App() {
  return (
    <section className="bg-primary-light min-h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen bg-light-2 text-center text-4xl font-bold">
            <FaSpinner className="text-primary-dark" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Templates />} />
            <Route path="/dashboard/editor/:id" element={<Editor />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </section>
  );
}

export default App;
