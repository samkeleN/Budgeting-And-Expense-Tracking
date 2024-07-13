// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^4.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CeloNFT is ERC721, Ownable {
    using Strings for uint256;

    struct NFTMetadata {
        string title;
        string description;
        string image;  // Store image reference as a string
    }

    mapping(uint256 => NFTMetadata) private _tokenMetadata;
    uint256 private _tokenIdCounter;

    event NFTMinted(uint256 indexed tokenId, string title, string description, string image, address owner);

    constructor() ERC721("CeloNFT", "CNFT") {}

    function safeMint(string memory title, string memory description, string memory image) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(msg.sender, tokenId);
        _setTokenMetadata(tokenId, title, description, image);
        _tokenIdCounter++;
        emit NFTMinted(tokenId, title, description, image, msg.sender);
    }

    function _setTokenMetadata(uint256 tokenId, string memory title, string memory description, string memory image) private {
        _tokenMetadata[tokenId] = NFTMetadata(title, description, image);
    }

    function getTokenMetadata(uint256 tokenId) public view returns (NFTMetadata memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenMetadata[tokenId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        NFTMetadata memory metadata = _tokenMetadata[tokenId];
        string memory json = string(
            abi.encodePacked(
                '{"title": "', metadata.title, '", ',
                '"description": "', metadata.description, '", ',
                '"image": "', metadata.image, '"}'
            )
        );
        string memory baseURI = "https://your-metadata-api-url/"; // Replace with your metadata base URI
        return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
    }
}
