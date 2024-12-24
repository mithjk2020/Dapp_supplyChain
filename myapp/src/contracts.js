import web3 from "./web3";
import ProductERC1155 from "../build/contracts/ProductERC1155.json";
import ProductOwnership from "../build/contracts/ProductOwnership.json";
import SupplyChain from "../build/contracts/supplyChain.json";

const productERC1155 = new web3.eth.Contract(
  ProductERC1155.abi,
  "YOUR_PRODUCT_ERC1155_CONTRACT_ADDRESS"
);

const productOwnership = new web3.eth.Contract(
  ProductOwnership.abi,
  "YOUR_PRODUCT_OWNERSHIP_CONTRACT_ADDRESS"
);

const supplyChain = new web3.eth.Contract(
  SupplyChain.abi,
  "YOUR_SUPPLY_CHAIN_CONTRACT_ADDRESS"
);

export { productERC1155, productOwnership, supplyChain };
