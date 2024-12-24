import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import TransferPage from "./pages/TransferPage";
import OwnershipHistoryPage from "./pages/OwnershipHistoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import './styles.css';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/ownership-history" element={<OwnershipHistoryPage />} />
          <Route path="/product-details" element={<ProductDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
