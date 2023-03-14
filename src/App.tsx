import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../src/store/firebase";
import { SignInPage, SignUpPage, ProductListPage } from "./pages/index";

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ProductListPage />} /> */}
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        {isLoggedIn ? <Route path="/" element={<ProductListPage />} /> : <Route path="/" element={<Navigate to="/register" />} />}
      </Routes>
    </Router>
  );
}

export default App;
