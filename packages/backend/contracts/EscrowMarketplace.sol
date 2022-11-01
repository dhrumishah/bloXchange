// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";

contract EscrowMarketplace is ERC2771Recipient, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant ARBITRATOR_ROLE = keccak256("ARBITRATOR_ROLE");

    uint256 public escrowBalance;
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
        address seller;
    }

    struct Order {
        uint256 itemId;
        uint256 amount;
        uint256 quantity;
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
    mapping(uint256 => Order) private orders;
    mapping(uint256 => Dispute) private disputes;

    event ItemListed(
        uint256 itemId,
        address indexed seller,
        uint256 price,
        uint256 quantity,
        uint256 createdAt,
        string title,
        string description,
        string[] images
    );
    event ItemOrdered(
        uint256 orderId,
        uint256 indexed itemId,
        address indexed buyer,
        uint256 amount,
        uint256 quantity,
        uint256 orderedAt,
        uint256 disputeId,
        Status status
    );
    event OrderDisputed(
        uint256 disputeId,
        uint256 indexed orderId,
        address indexed disputedBy,
        address indexed resolvedBy
    );
    event OrderShipped(uint256 orderId);
    event OrderDelivered(uint256 orderId);
    event OrderRefunded(uint256 orderId, address refundedBy);
    event Withdraw(uint256 amount, address to, uint256 timestamp);

    modifier onlyAdmin() {
        if (!hasRole(ADMIN_ROLE, _msgSender())) {
            revert NotAdmin(_msgSender());
        }
        _;
    }

    modifier onlyArbitrator() {
        if (!hasRole(ARBITRATOR_ROLE, _msgSender())) {
            revert NotArbitrator(_msgSender());
        }
        _;
    }

    error NotAdmin(address caller);
    error NotArbitrator(address caller);

    constructor(
        address _trustedForwarder,
        uint256 _platformFee,
        uint256 _arbitratorFee
    ) {
        _setTrustedForwarder(_trustedForwarder);
        _grantRole(ADMIN_ROLE, _msgSender());
        _grantRole(ARBITRATOR_ROLE, _msgSender());
        platformFee = _platformFee;
        arbitratorFee = _arbitratorFee;
    }

    function createItem(
        string calldata _title,
        string calldata _description,
        uint256 _price,
        uint256 _quantity,
        string[] calldata _images
    ) external {
        require(_images.length >= 1, "No item images");
        uint256 itemId = totalItems++;

        Item memory item;
        item.itemId = itemId;
        item.price = _price;
        item.quantity = _quantity;
        item.seller = _msgSender();

        items[itemId] = item;

        emit ItemListed(
            itemId,
            _msgSender(),
            _price,
            _quantity,
            block.timestamp,
            _title,
            _description,
            _images
        );
    }

    function orderItem(uint256 _itemId, uint256 _quantity) external payable {
        Item memory item = items[_itemId];
        require(_msgSender() != item.seller, "Seller not allowed");
        require(_quantity <= item.quantity, "Not enough item quanity");
        require(msg.value == item.price * _quantity, "Incorrect amount sent");

        items[_itemId].quantity -= _quantity;

        uint256 orderId = totalOrders++;
        uint256 amount = item.price * _quantity;

        Order memory order;
        order.itemId = _itemId;
        order.amount = amount;
        order.quantity = _quantity;
        order.buyer = _msgSender();
        order.status = Status.PENDING;

        orders[orderId] = order;

        escrowBalance += order.amount;

        emit ItemOrdered(
            orderId,
            _itemId,
            _msgSender(),
            amount,
            _quantity,
            block.timestamp,
            0,
            Status.PENDING
        );
    }

    function performShipping(uint256 _orderId) external {
        Order memory order = orders[_orderId];
        require(
            _msgSender() == items[order.itemId].seller,
            "Only seller allowded"
        );
        require(order.status != Status.SHIPPED, "Order already shipped");
        require(order.status != Status.DELIVERED, "Order already completed");

        orders[_orderId].status = Status.SHIPPED;

        emit OrderShipped(_orderId);
    }

    function confirmDelivery(uint256 _orderId) external {
        Order memory order = orders[_orderId];
        require(_msgSender() == order.buyer, "Only buyer allowed");
        require(order.status == Status.SHIPPED, "Order not shipped");
        require(order.status != Status.DELIVERED, "Order already delivered");

        uint256 itemId = order.itemId;

        uint256 fee = (order.amount * platformFee) / 100;
        escrowBalance -= order.amount;

        order.status = Status.DELIVERED;
        orders[_orderId] = order;
        totalDelivered++;

        _payTo(items[itemId].seller, order.amount - fee);

        emit OrderDelivered(_orderId);
    }

    function disputeOrder(uint256 _orderId) external payable {
        Order memory order = orders[_orderId];
        require(order.status != Status.DELIVERED, "Order already delivered");
        require(
            msg.value >= ((order.amount * arbitratorFee) / 100),
            "Not enough arbitrator fee"
        );

        uint256 disputeId = totalDisputed++;
        Dispute memory dispute;
        dispute.orderId = _orderId;
        dispute.disputedBy = _msgSender();
        disputes[disputeId] = dispute;

        order.status = Status.DISPUTTED;
        order.disputeId = disputeId;
        orders[_orderId] = order;

        emit OrderDisputed(disputeId, _orderId, _msgSender(), address(0));
    }

    function refundItem(uint256 _orderId) external onlyArbitrator {
        Order memory order = orders[_orderId];
        require(order.status == Status.DISPUTTED, "Order not disputed");

        orders[_orderId].status = Status.REFUNDED;
        items[order.itemId].quantity += order.quantity;
        disputes[order.disputeId].resolvedBy = _msgSender();
        escrowBalance -= order.amount;
        _payTo(items[order.itemId].seller, order.amount);

        emit OrderRefunded(_orderId, _msgSender());
    }

    function withdrawFund(address _to, uint256 _amount) external onlyAdmin {
        require(
            _amount > 0 && _amount <= (address(this).balance - escrowBalance),
            "Zero withdrawal not allowed"
        );

        _payTo(_to, _amount);

        emit Withdraw(_amount, _to, block.timestamp);
    }

    function _payTo(address _to, uint256 _amount) internal {
        if (_amount > 0) {
            (bool success, ) = payable(_to).call{value: _amount}("");
            require(success, "Payment failed");
        }
    }

    function setPlatformFee(uint256 _platformFee) external onlyAdmin {
        platformFee = _platformFee;
    }

    function setArbitratorFee(uint256 _arbitratorFee) external onlyAdmin {
        arbitratorFee = _arbitratorFee;
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
