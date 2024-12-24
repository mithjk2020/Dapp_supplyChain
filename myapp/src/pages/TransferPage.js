import React, { useState } from "react";
import Web3 from "web3";
import contractData from "../contracts/contract.js";

function TransferPage() {
  const [productId, setProductId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [account, setAccount] = useState("");

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contractData.abi, contractData.address);

  const handleTransfer = async () => {
    if (productId && newOwner) {
      console.log("Transferring ownership of product:", productId, "to:", newOwner);
      try {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        await contract.methods
          .transferOwnership(productId, newOwner)
          .send({ from: accounts[0] });
        alert("Ownership transferred successfully!");
      } catch (error) {
        console.error(error);
        alert("Error transferring ownership");
      }
    } else {
      alert("Please fill in both fields");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Transfer Ownership</h1>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Owner"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
      />
      <br />
      <button className="green-button" onClick={handleTransfer}>
        Transfer
      </button>
    </div>
  );
}

export default TransferPage;
