import React, { useState } from "react";
import Web3 from "web3";
import contractData from "../contracts/contract.js";

function ProductDetailsPage() {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState("");
  const [account, setAccount] = useState("");

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contractData.abi, contractData.address);

  const fetchProductDetails = async () => {
    if (productId) {
      console.log("Fetching details for product:", productId);
      try {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        const productDetails = await contract.methods.getProductDetails(productId).call();
        setProductData(productDetails.metadata);
      } catch (error) {
        console.error(error);
        alert("Error fetching product details");
      }
    }
     else {
      alert("Please enter a product ID");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Product Details</h1>
      <input
        type="text"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button className="green-button" onClick={fetchProductDetails}>
        Fetch Details
      </button>
      {productData && (
        <div>
          <h2>Metadata:</h2>
          <p>{productData}</p>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
