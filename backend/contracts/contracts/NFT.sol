// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract NFT is ERC721Upgradeable {
    // _tokenIdCounter
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIdCounter;

    // metadata URI
    string private _baseTokenURI;

    function initialize(
        string memory name_,
        string memory symbol_,
        string memory baseTokenURI_
    ) public initializer {
        __ERC721_init(name_, symbol_);
        _baseTokenURI = baseTokenURI_;
    }

    function mint() external {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string calldata baseURI) external {
        _baseTokenURI = baseURI;
    }
}
