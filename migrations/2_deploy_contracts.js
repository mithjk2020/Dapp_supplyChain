const SupplyChain = artifacts.require("supplyChain");
const ProductERC1155 = artifacts.require("ProductERC1155");
const ProductOwnership = artifacts.require("ProductOwnership");

module.exports = async function (deployer, network, accounts) {
  const owner = accounts[0]; // Default owner from Ganache
  
  await deployer.deploy(SupplyChain);
  await deployer.deploy(ProductERC1155, owner);
  await deployer.deploy(ProductOwnership, owner);
};
