// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <=0.8.0;

import {Ownable} from "./Ownable.sol";

contract Mortal is Ownable {

    function terminateContract() external payable onlyOwner {
        selfdestruct(owner);
    }

}
