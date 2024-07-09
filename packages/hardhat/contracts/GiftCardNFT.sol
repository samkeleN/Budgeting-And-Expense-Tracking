// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^4.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GiftCardNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Giftcard {
        string title;
        string description;
        string image;  // Store image reference
        address payable owner;
    }

    mapping(uint256 => Giftcard) public giftcards;

    event GiftcardCreated(
        uint256 indexed tokenId,
        string title,
        string description,
        string image,
        address payable owner
    );

    constructor() ERC721("GiftCardNFT", "GCN") Ownable() {}

    function safeMint(string memory _title, string memory _description, string memory _image) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

        giftcards[tokenId] = Giftcard(_title, _description, _image, payable(msg.sender));

        emit GiftcardCreated(tokenId, _title, _description, _image, payable(msg.sender));
    }

    function transferGiftcard(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this gift card");
        _transfer(msg.sender, to, tokenId);
        giftcards[tokenId].owner = payable(to);
    }

    function getGiftcard(uint256 tokenId) public view returns (Giftcard memory) {
        return giftcards[tokenId];
    }
}