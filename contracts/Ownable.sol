// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <=0.8.0;

contract Ownable {

    address payable public owner;

    modifier onlyOwner {
        require(owner == msg.sender, "UnAuthorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address payable _newOwner) public onlyOwner {
      owner = _newOwner;
    }
}
