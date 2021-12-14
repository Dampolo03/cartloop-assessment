import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import paths from "./paths";

export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path={paths.root} element={<HomePage />} />
      </Routes>
    </Router>
  );
};
