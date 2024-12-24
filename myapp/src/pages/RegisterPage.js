import React, { useState } from "react";
import Web3 from "web3";
import contractData from "../contracts/contract.js"; // Import your contract ABI and address

function RegisterPage() {
  const [productId, setProductId] = useState("");
  const [productMetadata, setProductMetadata] = useState("");
  const [account, setAccount] = useState("");

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contractData.abi, contractData.address);

  const handleRegister = async () => {
    if (productId && productMetadata) {
      console.log("Registering product:", productId, "with metadata:", productMetadata);
      try {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        await contract.methods
          .registerProduct(productId, productMetadata)
          .send({ from: accounts[0] });
        alert("Product registered successfully!");
      } catch (error) {
        console.error(error);
        alert("Error registering product");
      }
    } 
    else {
      alert("Please fill in both fields");
    }
  };
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Register Product</h1>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <textarea
        placeholder="Metadata"
        value={productMetadata}
        onChange={(e) => setProductMetadata(e.target.value)}
      />
      <br />
      <button className="green-button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default RegisterPage;
