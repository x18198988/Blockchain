// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract TicketMaster {

    IERC1155 private nftContract;

    constructor(address _nftAddress){
        nftContract = IERC1155(_nftAddress);
    }
    event TicketBought(address indexed buyer, uint256 indexed tokenId, uint256 indexed amount);

    mapping(address => uint256) private s_proceeds;

    uint256 constant ticketPrice = 10**15;

    function buyTicket(uint256 tokenId, uint256 amount, address ticketOwner) external payable {
        require(msg.value > ticketPrice * amount, "Ticket Price Not Met");
        require(nftContract.balanceOf(ticketOwner, tokenId) > amount, "Less Number of Remaning Ticket");
        nftContract.safeTransferFrom(ticketOwner, msg.sender, tokenId, amount, "");
        s_proceeds[ticketOwner] += msg.value;
        emit TicketBought(msg.sender, tokenId, amount);
    }

    function withdrawProceeds() external {
        uint256 proceeds = s_proceeds[msg.sender];
        require(proceeds > 0, "No Amount to withdraw");
        s_proceeds[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: proceeds}("");
        require(success, "Transfer failed");
    }
}