//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract UserProfile {
    struct User {
        address userAddress;
        uint256 userId;
        string name;
        string place;
        string phoneNumber;
        string emailAddress;
    }

    uint256 public usersCount = 0;

    mapping(uint256 => User) users;
    User[] usersArray;

    function getUsers() public view returns (User[] memory) {
        return usersArray;
    }

    function getSpecificUser(uint256 _userId)
        public
        view
        returns (User memory)
    {
        return users[_userId];
    }

    function addUser(
        string memory _name,
        string memory _place,
        string memory _phoneNumber,
        string memory _email
    ) public {
        usersCount += 1;
        User memory user = User(
            msg.sender,
            usersCount,
            _name,
            _place,
            _phoneNumber,
            _email
        );
        users[usersCount] = user;
        usersArray.push(user);
    }
}
