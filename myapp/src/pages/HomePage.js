import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ fontWeight: "bold", textTransform: "uppercase" }}>Supply Chain DApp</h1>
      <div>
        <Link to="/register">
          <button className="green-button">Register</button>
        </Link>
        <Link to="/transfer">
          <button className="green-button">Transfer</button>
        </Link>
        <Link to="/ownership-history">
          <button className="green-button">Check Ownership History</button>
        </Link>
        <Link to="/product-details">
          <button className="green-button">Product Details</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
