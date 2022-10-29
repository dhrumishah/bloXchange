// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";


contract EscrowMarketplace is ERC2771Recipient, AccessControl {
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
        uint256 price;
        uint256 quantity;
        uint256 createdAt;
        uint256 updatedAt;
        address seller;
        string title;
        string description;
        string[] images;
    }

    struct Order {
        uint256 orderId;
        uint256 itemId;
        uint256 amount;
        uint256 quantity;
        uint256 orderedAt;
        uint256 disputeId;
        address buyer;
        Status status;
    }

    struct Dispute {
        uint256 orderId;
        address disputedBy;
        address resolvedBy;
    }

    enum Status {
        PENDING,
        SHIPPED,
        DELIVERED,
        DISPUTTED,
        REFUNDED
    }

    mapping(uint256 => Item) private items;
    mapping(uint256 => Order) public orders;
    mapping(uint256 => Dispute) public disputes;
    mapping(address => Item[]) private itemsOf;

    event ItemCreated(Item item);
    event ItemOrdered(Order order);
    event OrderShipped(uint256 orderId);
    event OrderDelivered(uint256 orderId);
    event OrderDisputed(Dispute dispute);
    event OrderRefunded(uint256 orderId, address refundedBy);
    event Withdraw(uint256 amount, address to, uint256 timestamp);

    modifier onlyAdmin() {
        if (!hasRole(ADMIN_ROLE, _msgSender())) {
            revert CallerNotAdmin(_msgSender());
        }
        _;
    }

    modifier onlyArbitrator() {
        if (!hasRole(ARBITRATOR_ROLE, _msgSender())) {
            revert CallerNotArbitrator(_msgSender());
        }
        _;
    }

    error CallerNotAdmin(address caller);
    error CallerNotArbitrator(address caller);

    constructor(address _trustedForwarder, uint256 _platformFee, uint256 _arbitratorFee) {
        _setTrustedForwarder(_trustedForwarder);
        _grantRole(ADMIN_ROLE, _msgSender());
        _grantRole(ARBITRATOR_ROLE, _msgSender());
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
        item.seller = _msgSender();
        item.images = images;

        items[itemId] = item;

        itemsOf[_msgSender()].push(item);

        emit ItemCreated(item);
    }

    function orderItem(uint256 itemId, uint256 quantity) external payable {
        Item memory item = items[itemId];
        require(_msgSender() != item.seller, "Seller not allowed");
        require(quantity <= item.quantity, "Not enough item quanity");
        require(msg.value == item.price * quantity, "Incorrect amount sent");

        items[itemId].quantity -= quantity;

        uint256 orderId = totalOrders++;

        Order memory order;
        order.orderId = orderId;
        order.itemId = itemId;
        order.amount = item.price * quantity;
        order.buyer = _msgSender();
        order.status = Status.PENDING;
        order.orderedAt = block.timestamp;

        orders[orderId] = order;

        escrowBalance += order.amount;

        emit ItemOrdered(order);
    }

    function performShipping(uint256 orderId) external {
        Order memory order = orders[orderId];
        require(
            _msgSender() == items[order.itemId].seller,
            "Only seller allowded"
        );
        require(order.status != Status.SHIPPED, "Order already shipped");
        require(order.status != Status.DELIVERED, "Order already completed");

        orders[orderId].status = Status.SHIPPED;

        emit OrderShipped(orderId);
    }

    function confirmDelivery(uint256 orderId) external {
        Order memory order = orders[orderId];
        require(_msgSender() == order.buyer, "Only buyer allowed");
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

        uint256 disputeId = totalDisputed++;
        Dispute memory dispute;
        dispute.orderId = orderId;
        dispute.disputedBy = _msgSender();
        disputes[disputeId] = dispute;

        order.status = Status.DISPUTTED;
        order.disputeId = disputeId;
        orders[orderId] = order;

        escrowAvailableBalance += msg.value;

        emit OrderDisputed(dispute);
    }

    function refundItem(uint256 orderId) external onlyArbitrator {
        Order memory order = orders[orderId];
        require(order.status == Status.DISPUTTED, "Order not disputed");

        _payTo(items[order.itemId].seller, order.amount);
        escrowBalance -= order.amount;
        orders[order.orderId].status = Status.REFUNDED;

        disputes[order.disputeId].resolvedBy = _msgSender();

        emit OrderRefunded(orderId, _msgSender());
    }

    function withdrawFund(address to, uint256 amount) external onlyAdmin {
        require(
            amount > 0 && amount <= escrowAvailableBalance,
            "Zero withdrawal not allowed"
        );

        escrowAvailableBalance -= amount;
        _payTo(to, amount);

        emit Withdraw(amount, to, block.timestamp);
    }

    function _payTo(address to, uint256 amount) internal {
        if (amount > 0) {
            (bool success, ) = payable(to).call{value: amount}("");
            require(success, "Payment failed");
        }
    }

    function setPlatformFee(uint256 _platformFee) external onlyAdmin {
        platformFee = _platformFee;
    }

    function setArbitratorFee(uint256 _arbitratorFee) external onlyAdmin {
        arbitratorFee = _arbitratorFee;
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

    // meta tx
    function setTrustedForwarder(address _trustedForwarder) external onlyAdmin {
        _setTrustedForwarder(_trustedForwarder);
    }

    function _msgSender()
        internal
        view
        override(Context, ERC2771Recipient)
        returns (address sender)
    {
        sender = ERC2771Recipient._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, ERC2771Recipient)
        returns (bytes calldata)
    {
        return ERC2771Recipient._msgData();
    }

    function versionRecipient() external pure returns (string memory) {
        return "2.2.0";
    }
}
