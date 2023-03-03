// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./NFT.sol";

contract NFTFactory {
    event NFTCreated(address creator, address indexed contractAddress);

    address implementation;

    // constructor(address _implementation) {
    //     implementation = _implementation;
    // }

    constructor() {
        implementation = address(new NFT());
    }

    function createNFT(
        string memory _name,
        string memory _symbol,
        string memory baseTokenURI_
    ) public returns (address) {
        address clone = Clones.clone(implementation);
        emit NFTCreated(msg.sender, address(clone));
        NFT(address(clone)).initialize(_name, _symbol, baseTokenURI_);

        return address(clone);
    }
}
