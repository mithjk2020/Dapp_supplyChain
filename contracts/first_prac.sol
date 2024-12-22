// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract supplyChain is AccessControl {
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");

    struct Product {
        string name;
        uint batch_number;
        uint productDna;
        uint32 rewardTime;  
        uint creationDate;
        string metadataHash; // IPFS or Arweave hash
    }

    mapping(uint => address) public productToOwner;
    mapping(address => uint) ownerProductCount;

    Product[] public products;

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint private batchNum = 1;

    event NewProduct(string name, uint serialno, uint productDna, string metadataHash);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MANUFACTURER_ROLE, msg.sender); // Owner is default manufacturer
    }

    function _createProduct(string memory _name, uint _dna, string memory _metadataHash) internal onlyRole(MANUFACTURER_ROLE) {
        products.push(Product(_name, batchNum, _dna, uint32(0), block.timestamp, _metadataHash));
        uint id = products.length - 1;
        productToOwner[id] = msg.sender;
        ownerProductCount[msg.sender]++;
        emit NewProduct(_name, batchNum, _dna, _metadataHash);
        if (batchNum % 10 == 0) batchNum = 1;
        else batchNum++;
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomProduct(string memory _name, string memory _metadataHash) public onlyRole(MANUFACTURER_ROLE) {
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - (randDna % 100);
        _createProduct(_name, randDna, _metadataHash);
    }
}
