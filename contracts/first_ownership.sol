// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./first_prac.sol";
import "./erc1155.sol";

contract ProductOwnership is supplyChain, ProductERC1155 {
    mapping(uint => uint) public productIdToTokenId;
    struct OwnershipRecord {
        address owner;
        uint timestamp;
    }
    mapping(uint => OwnershipRecord[]) public ownershipHistory;
    constructor(address initialOwner) ProductERC1155(initialOwner) {}
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControl, ERC1155)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenizeProduct(uint productId, uint256 amount) public {
        require(productToOwner[productId] == msg.sender, "Not the owner of the product");
        uint tokenId = currentTokenId;
        productIdToTokenId[productId] = tokenId;
        mint(msg.sender, amount, "");
    }

    function transferProduct(uint productId, address to, uint256 amount) public {
        uint tokenId = productIdToTokenId[productId];
        require(balanceOf(msg.sender, tokenId) >= amount, "Not enough tokens");
        ownershipHistory[productId].push(OwnershipRecord({
            owner: to,
            timestamp: block.timestamp
        }));
        safeTransferFrom(msg.sender, to, tokenId, amount, "");
    }
    function getOwnershipHistory(uint productId) public view returns (OwnershipRecord[] memory) {
        return ownershipHistory[productId];
    }
}
