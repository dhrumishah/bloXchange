// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";

contract EscrowMarketplace is ERC2771Recipient, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant ARBITRATOR_ROLE = keccak256("ARBITRATOR_ROLE");

    uint256 public escrowBalance;
    uint256 public platformFeePercent;
    uint256 public arbitratorFeePercent;
    uint256 public totalItems;
    uint256 public totalOrders;
    uint256 public totalDelivered;
    uint256 public totalDisputed;
    uint256 private categoryCounter;

    struct Item {
        uint256 price;
        uint256 quantity;
        address seller;
    }

    struct CreateItem {
        string title;
        string description;
        uint256 categoryId;
        uint256 price;
        uint256 quantity;
        string[] images;
        string deliveryLocations;
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
    mapping(uint256 => bytes32) private categories;
    mapping(address => string) private profiles;
    mapping(bytes32 => bool) private categoryIsPresent;

    event ItemListed(
        uint256 itemId,
        address indexed seller,
        uint256 indexed categoryId,
        uint256 price,
        uint256 quantity,
        uint256 createdAt,
        string title,
        string description,
        string[] images,
        string deliveryLocations
    );
    event ItemUpdated(
        uint256 itemId,
        uint256 price,
        uint256 quantity,
        uint256 updatedAt
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
    event CategoryAdded(uint256 categoryId, bytes32 category);
    event CategoryRemoved(uint256 categoryId);
    event ProfileUpdated(address userAddress, string profileURI);
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
    error NoImages();
    error CategoryNotPresent(uint256 categoryId);
    error SellerCannotOrderOwnItem(address sellerAddress, uint256 itemId);
    error NotEnoughQuantity(uint256 availableQuantity, uint256 orderQuantity);
    error IncorrectAmountSent(uint256 amountSent, uint256 amountRequired);
    error OnlySellerAllowed();
    error OnlyBuyerAllowed();
    error OrderStatusNotShipped(uint256 orderId);
    error OrderStatusNotPending(uint256 orderId);
    error OrderNotDisputed(uint256 orderId);
    error OrderAlreadyDelivered(uint256 orderId);
    error NotEnoughArbitratorFeeSent(uint256 feeSent, uint256 feeRequired);
    error PaymentFailed(address to, uint256 amount);
    error WithdrawAmountZero();
    error InsufficientBalance(
        uint256 requestedBalance,
        uint256 availableBalance
    );
    error NotSellerOrBuyer(address caller);

    constructor(
        address _trustedForwarder,
        uint256 _platformFeePercent,
        uint256 _arbitratorFeePercent
    ) {
        _setTrustedForwarder(_trustedForwarder);
        _grantRole(ADMIN_ROLE, _msgSender());
        _grantRole(ARBITRATOR_ROLE, _msgSender());
        platformFeePercent = _platformFeePercent;
        arbitratorFeePercent = _arbitratorFeePercent;
    }

    function createItem(CreateItem calldata _item) external {
        if (_item.images.length == 0) {
            revert NoImages();
        }
        if (!categoryIsPresent[categories[_item.categoryId]]) {
            revert CategoryNotPresent(_item.categoryId);
        }

        uint256 itemId = totalItems++;

        items[itemId] = Item(_item.price, _item.quantity, _msgSender());

        emit ItemListed(
            itemId,
            _msgSender(),
            _item.categoryId,
            _item.price,
            _item.quantity,
            block.timestamp,
            _item.title,
            _item.description,
            _item.images,
            _item.deliveryLocations
        );
    }

    function updateItem(
        uint256 _itemId,
        uint256 _price,
        uint256 _quantity
    ) external {
        Item memory item = items[_itemId];
        if (item.seller != _msgSender()) revert OnlySellerAllowed();

        item.price = _price;
        item.quantity = _quantity;
        items[_itemId] = item;

        emit ItemUpdated(_itemId, _price, _quantity, block.timestamp);
    }

    function orderItem(uint256 _itemId, uint256 _quantity) external payable {
        Item memory item = items[_itemId];
        if (_msgSender() == item.seller) {
            revert SellerCannotOrderOwnItem(_msgSender(), _itemId);
        }
        if (_quantity > item.quantity) {
            revert NotEnoughQuantity(item.quantity, _quantity);
        }
        if (msg.value != item.price * _quantity) {
            revert IncorrectAmountSent(msg.value, item.price * _quantity);
        }

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
        if (_msgSender() != items[order.itemId].seller) {
            revert OnlySellerAllowed();
        }
        if (order.status != Status.PENDING) {
            revert OrderStatusNotPending(_orderId);
        }

        orders[_orderId].status = Status.SHIPPED;

        emit OrderShipped(_orderId);
    }

    function confirmDelivery(uint256 _orderId) external {
        Order memory order = orders[_orderId];
        if (_msgSender() != order.buyer) revert OnlyBuyerAllowed();
        if (order.status != Status.SHIPPED) {
            revert OrderStatusNotShipped(_orderId);
        }

        uint256 itemId = order.itemId;

        uint256 fee = (order.amount * platformFeePercent) / 100;
        escrowBalance -= order.amount;

        order.status = Status.DELIVERED;
        orders[_orderId] = order;
        totalDelivered++;

        _payTo(items[itemId].seller, order.amount - fee);

        emit OrderDelivered(_orderId);
    }

    function disputeOrder(uint256 _orderId) external payable {
        Order memory order = orders[_orderId];
        if (
            msg.sender != order.buyer ||
            msg.sender != items[order.itemId].seller
        ) {
            revert NotSellerOrBuyer(msg.sender);
        }
        if (order.status == Status.DELIVERED) {
            revert OrderAlreadyDelivered(_orderId);
        }
        uint256 arbitratorFee = (order.amount * arbitratorFeePercent) / 100;
        if (msg.value < arbitratorFee) {
            revert NotEnoughArbitratorFeeSent(msg.value, arbitratorFee);
        }

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
        if (order.status != Status.DISPUTTED) revert OrderNotDisputed(_orderId);

        orders[_orderId].status = Status.REFUNDED;
        items[order.itemId].quantity += order.quantity;
        disputes[order.disputeId].resolvedBy = _msgSender();
        escrowBalance -= order.amount;
        _payTo(order.buyer, order.amount);

        emit OrderRefunded(_orderId, _msgSender());
    }

    function completeOrder(uint256 _orderId) external onlyArbitrator {
        Order memory order = orders[_orderId];
        if (order.status != Status.DISPUTTED) revert OrderNotDisputed(_orderId);

        uint256 itemId = order.itemId;

        uint256 fee = (order.amount * platformFeePercent) / 100;
        escrowBalance -= order.amount;

        order.status = Status.DELIVERED;
        orders[_orderId] = order;
        disputes[order.disputeId].resolvedBy = _msgSender();
        totalDelivered++;

        _payTo(items[itemId].seller, order.amount - fee);

        emit OrderDelivered(_orderId);
    }

    function withdrawFund(address _to, uint256 _amount) external onlyAdmin {
        if (_amount == 0) revert WithdrawAmountZero();
        if (_amount > (address(this).balance - escrowBalance)) {
            revert InsufficientBalance(
                _amount,
                address(this).balance - escrowBalance
            );
        }

        _payTo(_to, _amount);

        emit Withdraw(_amount, _to, block.timestamp);
    }

    function _payTo(address _to, uint256 _amount) internal {
        if (_amount > 0) {
            (bool success, ) = payable(_to).call{value: _amount}("");
            if (!success) revert PaymentFailed(_to, _amount);
        }
    }

    function setPlatformFeePercent(uint256 _platformFeePercent)
        external
        onlyAdmin
    {
        platformFeePercent = _platformFeePercent;
    }

    function setArbitratorFeePercent(uint256 _arbitratorFeePercent)
        external
        onlyAdmin
    {
        arbitratorFeePercent = _arbitratorFeePercent;
    }

    function setProfileURI(string calldata _profileURI) external {
        address msgSender = _msgSender();
        profiles[msgSender] = _profileURI;
        emit ProfileUpdated(msgSender, _profileURI);
    }

    // category
    function addCategories(bytes32[] calldata _categories) external onlyAdmin {
        for (uint256 i = 0; i < _categories.length; i++) {
            bytes32 category = _categories[i];
            if (!categoryIsPresent[category] && category != "") {
                uint256 categoryId = categoryCounter++;
                categoryIsPresent[category] = true;
                categories[categoryId] = category;
                emit CategoryAdded(categoryId, category);
            }
        }
    }

    function removeCategories(uint256[] calldata _ids) external onlyAdmin {
        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 id = _ids[i];
            bytes32 category = categories[id];
            if (categoryIsPresent[category]) {
                categoryIsPresent[category] = false;
                delete categories[id];
                emit CategoryRemoved(id);
            }
        }
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
