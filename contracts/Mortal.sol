pragma solidity ^0.5.0;

import {Ownable} from "./Ownable.sol";

contract Mortal is Ownable {

    function terminateContract() external payable onlyOwner {
        selfdestruct(owner);
    }

}
