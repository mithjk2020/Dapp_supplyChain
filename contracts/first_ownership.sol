// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./first_prac.sol";
import "./erc1155.sol";

contract ProductOwnership is supplyChain, ProductERC1155 {
    mapping(uint => uint) public productIdToTokenId;

    // Pass the initialOwner parameter to the ProductERC1155 constructor
    constructor(address initialOwner) ProductERC1155(initialOwner) {}

    // Resolve supportsInterface ambiguity: specify AccessControl and ERC1155
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControl, ERC1155)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Tokenize a product
    function tokenizeProduct(uint productId, uint256 amount) public {
        require(productToOwner[productId] == msg.sender, "Not the owner of the product");
        uint tokenId = currentTokenId;
        productIdToTokenId[productId] = tokenId;

        mint(msg.sender, amount, "");
    }

    // Transfer ownership of a product
    function transferProduct(uint productId, address to, uint256 amount) public {
        uint tokenId = productIdToTokenId[productId];
        require(balanceOf(msg.sender, tokenId) >= amount, "Not enough tokens");

        safeTransferFrom(msg.sender, to, tokenId, amount, "");
    }
}
