pragma solidity ^0.5.0;

contract Ownable {

    address payable public owner;

    modifier onlyOwner {
        require(owner == msg.sender, "UnAuthorized");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address payable _newOwner) public onlyOwner {
      owner = _newOwner;
    }
}
