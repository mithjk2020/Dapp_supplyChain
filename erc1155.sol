// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProductERC1155 is ERC1155, Ownable {
    uint public currentTokenId;

    constructor() ERC1155("https://api.example.com/metadata/{id}.json") {}

    function mint(address to, uint256 amount, bytes memory data) public onlyOwner {
        _mint(to, currentTokenId, amount, data);
        currentTokenId++;
    }

    function burn(address from, uint256 id, uint256 amount) public onlyOwner {
        _burn(from, id, amount);
    }
}
