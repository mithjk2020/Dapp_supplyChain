const hre = require("hardhat");

async function main() {
    const Contract1 = await hre.ethers.getContractFactory("Contract1");
    const contract1 = await Contract1.deploy();
    await contract1.deployed();
    console.log("Contract1 deployed to:", contract1.address);

    const Contract2 = await hre.ethers.getContractFactory("Contract2");
    const contract2 = await Contract2.deploy();
    await contract2.deployed();
    console.log("Contract2 deployed to:", contract2.address);

    const Contract3 = await hre.ethers.getContractFactory("Contract3");
    const contract3 = await Contract3.deploy();
    await contract3.deployed();
    console.log("Contract3 deployed to:", contract3.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
