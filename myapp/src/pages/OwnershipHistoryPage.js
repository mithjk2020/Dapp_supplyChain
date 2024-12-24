import React, { useState } from "react";
import Web3 from "web3"; 
import contractABI from "../path/to/your/contractABI.json"; 
import { contractAddress } from "../config"; 

function OwnershipHistoryPage() {
  const [productId, setProductId] = useState("");
  const [history, setHistory] = useState([]);

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const fetchHistory = async () => {
    if (!window.ethereum) {
      console.log("Ethereum provider is not available.");
      return;
    }
    try {
      await window.ethereum.enable(); 
      const accounts = await web3.eth.getAccounts(); 
      console.log("Fetching ownership history for product:", productId);
      const historyData = await contract.methods.getOwnershipHistory(productId).call();
      const formattedHistory = historyData.map((record) => ({
        owner: record.owner,
        date: new Date(record.timestamp * 1000).toLocaleDateString(),
      }));
      setHistory(formattedHistory);
    } catch (error) {
      console.error("Error fetching ownership history:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Ownership History</h1>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button className="green-button" onClick={fetchHistory}>
        Fetch History
      </button>
      <ul>
        {history.length > 0 ? (
          history.map((record, index) => (
            <li key={index}>
              {record.owner} - {record.date}
            </li>
          ))
        ) : (
          <li>No history available</li>
        )}
      </ul>
    </div>
  );
}

export default OwnershipHistoryPage;
