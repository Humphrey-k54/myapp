// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract BIT_KCA {
    //declaring the state variable
    uint256 number ;
    string public message;

    //constructors
    constructor(uint256 _startingPoint, string memory _startingMessage){
        number=_startingPoint;
        message=_startingMessage;
    }
   
    //reading functions
    function getNumber() external view returns (uint256){
        return number;
    }

    //writing funtions
    //increasing the number by 1
    function increaseNumber() external  {
        number++;
    }

    //decreasing the number by 1
    function decreaseNumber() external  {
        number--;
    }

    //function to update the message
    function setMessage(string memory newMessage)public {
        message=newMessage;
    }

}