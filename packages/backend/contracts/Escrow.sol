// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Escrow is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant ARBITRATOR_ROLE = keccak256("ARBITRATOR_ROLE");

    uint256 public escrowBalance;
    uint256 public escrowAvailableBalance;
    uint256 public platformFee;
    uint256 public arbitratorFee;
    uint256 public totalItems;
    uint256 public totalOrders;
    uint256 public totalDelivered;
    uint256 public totalDisputed;

    struct Item {
        uint256 itemId;
        string title;
        string description;
        uint256 price;
        uint256 quantity;
        string[] images;
        uint256 createdAt;
        uint256 updatedAt;
        address seller;
    }

    struct Order {
        uint256 orderId;
        uint256 itemId;
        uint256 amount;
        uint256 quantity;
        address buyer;
        Status status;
        uint256 orderedAt;
    }

    struct Dispute {
        uint256 orderId;
        address disputedBy;
        address resolvedBy;
        bool isResolved;
    }

    enum Status {
        PENDING,
        SHIPPED,
        DELIVERED,
        DISPUTTED,
        REFUNDED,
        WITHDRAWED
    }

    enum Available {
        NO,
        YES
    }

    mapping(uint256 => Item) private items;
    mapping(uint256 => Order) public orders;
    mapping(uint256 => Dispute) public disputes;
    mapping(address => Item[]) private itemsOf;
    mapping(uint256 => address) public sellerOfItem;
    mapping(uint256 => Available) public isAvailable;

    event ItemCreated(uint256 itemId, address createdBy);
    event ItemOrdered(uint256 itemId, uint256 orderId, address orderedBy);
    event OrderShipped(uint256 orderId);
    event OrderDelivered(uint256 orderId);
    event OrderDisputed(uint256 orderId, address disputedBy);
    event OrderRefunded(uint256 orderId, address refundedBy);
    event Withdraw(uint256 amount, address to, uint256 timestamp);

    modifier onlyAdmin() {
        if (!hasRole(ADMIN_ROLE, msg.sender)) {
            revert CallerNotAdmin(msg.sender);
        }
        _;
    }

    modifier onlyArbitrator() {
        if (!hasRole(ARBITRATOR_ROLE, msg.sender)) {
            revert CallerNotArbitrator(msg.sender);
        }
        _;
    }

    error CallerNotAdmin(address caller);
    error CallerNotArbitrator(address caller);

    constructor(uint256 _platformFee, uint256 _arbitratorFee) {
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(ARBITRATOR_ROLE, msg.sender);
        platformFee = _platformFee;
        arbitratorFee = _arbitratorFee;
    }

    function createItem(
        string calldata title,
        string calldata description,
        uint256 price,
        uint256 quantity,
        string[] calldata images
    ) external {
        require(images.length >= 1, "No item images");
        uint256 itemId = totalItems++;
        Item memory item;

        item.itemId = itemId;
        item.price = price;
        item.title = title;
        item.description = description;
        item.quantity = quantity;
        item.createdAt = block.timestamp;
        item.seller = msg.sender;
        item.images = images;

        items[itemId] = item;

        itemsOf[msg.sender].push(item);
        sellerOfItem[itemId] = msg.sender;
        isAvailable[itemId] = Available.YES;

        emit ItemCreated(itemId, msg.sender);
    }

    function orderItem(uint256 itemId, uint256 quantity) external payable {
        require(msg.sender != sellerOfItem[itemId], "Seller not allowed");
        require(isAvailable[itemId] == Available.YES, "Item not available");
        Item memory item = items[itemId];
        require(msg.value == item.price * quantity, "Incorrect amount sent");
        require(quantity <= item.quantity, "Not enough item quanity");

        uint256 orderId = totalOrders++;

        Order memory order;
        order.orderId = orderId;
        order.itemId = itemId;
        order.amount = item.price * quantity;
        order.buyer = msg.sender;
        order.status = Status.PENDING;
        order.orderedAt = block.timestamp;

        orders[orderId] = order;

        escrowBalance += order.amount;

        items[itemId].quantity -= 1;
        if (items[itemId].quantity == 0) {
            isAvailable[itemId] = Available.NO;
        }

        emit ItemOrdered(itemId, orderId, msg.sender);
    }

    function performShipping(uint256 orderId) external {
        Order memory order = orders[orderId];
        require(
            msg.sender == items[order.itemId].seller,
            "Service not awarded to you"
        );
        require(order.status != Status.SHIPPED, "Order already shipped");
        require(order.status != Status.DELIVERED, "Order already completed");

        orders[orderId].status = Status.SHIPPED;

        emit OrderShipped(orderId);
    }

    function confirmDelivery(uint256 orderId) external {
        Order memory order = orders[orderId];
        require(msg.sender == order.buyer, "Only buyer allowed");
        require(order.status == Status.SHIPPED, "Order not shipped");
        require(order.status != Status.DELIVERED, "Order already delivered");

        uint256 itemId = order.itemId;

        uint256 fee = (order.amount * platformFee) / 100;
        _payTo(items[itemId].seller, order.amount - fee);
        escrowBalance -= order.amount;
        escrowAvailableBalance += fee;

        order.status = Status.DELIVERED;
        orders[order.orderId] = order;
        totalDelivered++;

        emit OrderDelivered(orderId);
    }

    function disputeOrder(uint256 orderId) external payable {
        Order memory order = orders[orderId];
        require(order.status != Status.DELIVERED, "Order already delivered");
        require(
            msg.value >= ((order.amount * arbitratorFee) / 100),
            "Not enough arbitrator fee"
        );

        orders[order.orderId].status = Status.DISPUTTED;
        uint256 disputeId = totalDisputed++;
        Dispute memory dispute;
        dispute.orderId = orderId;
        dispute.disputedBy = msg.sender;
        disputes[disputeId] = dispute;
        escrowAvailableBalance += msg.value;

        emit OrderDisputed(orderId, msg.sender);
    }

    function refundItem(uint256 orderId) external onlyArbitrator {
        Order memory order = orders[orderId];
        require(order.status == Status.DISPUTTED, "Order not disputed");

        _payTo(items[order.itemId].seller, order.amount);
        escrowBalance -= order.amount;
        orders[order.orderId].status = Status.REFUNDED;

        emit OrderRefunded(orderId, msg.sender);
    }

    function withdrawFund(address to, uint256 amount) external onlyAdmin {
        require(
            amount > 0 && amount <= escrowAvailableBalance,
            "Zero withdrawal not allowed"
        );

        _payTo(to, amount);
        escrowAvailableBalance -= amount;

        emit Withdraw(amount, to, block.timestamp);
    }

    function _payTo(address to, uint256 amount) internal {
        if (amount > 0) {
            (bool success, ) = payable(to).call{value: amount}("");
            require(success, "Payment failed");
        }
    }

    function getItems() external view returns (Item[] memory props) {
        props = new Item[](totalItems);

        for (uint256 i = 0; i < totalItems; i++) {
            props[i] = items[i];
        }
    }

    function getItem(uint256 itemId) external view returns (Item memory) {
        return items[itemId];
    }

    function myItems(address myAddress) external view returns (Item[] memory) {
        return itemsOf[myAddress];
    }
}
