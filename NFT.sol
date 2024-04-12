
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC1155URIStorage, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public TicketMaster;

    constructor() ERC1155("") Ownable(msg.sender){
        TicketMaster = address(0);
    }

    event Minted(uint256 indexed tokenId, address indexed to, string indexed tokenURI);

    function mint(string memory tokenURI, uint256 amount) external{
        uint256 newItemId =_tokenIds.current();
        _mint(msg.sender, newItemId, amount, "");
        _setURI(newItemId, tokenURI);
        _tokenIds.increment();
        setApprovalForAll(TicketMaster, true);
        emit Minted(newItemId, msg.sender, tokenURI);
    }

    function setTicketMasterAddress(address _ticketMaster) public onlyOwner{
        TicketMaster = _ticketMaster;
    }

    function getTokenCounter() public view returns (uint256){
        return _tokenIds.current();
    }
}