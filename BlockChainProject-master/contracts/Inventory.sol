// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Inventory {
    struct Order {
        uint256 orderId;
        uint256 productId;
        uint256 quantity;
        uint256 dispatchTime;
        address buyer;
        address seller;
        bool dispatched;
        bool rejected;
    }
    mapping(uint256 => Order) public orders;
    mapping(uint256 => uint256) public orderAmounts;

    uint256 public orderCount;
    uint256 public finePercentage; // Fine percentage deducted from order amount if not dispatched on time
    event OrderPlaced(
        uint256 indexed orderId,
        uint256 indexed productId,
        string productName,
        uint256 quantity,
        address buyer,
        uint256 dispatchTime
    );
    event OrderDispatched(uint256 indexed orderId, address seller, uint256 amount);
    event OrderRejected(uint256 indexed orderId, address buyer, uint256 amount);

    constructor(uint256 _finePercentage) {
        orderCount = 0;
        finePercentage = _finePercentage;
    }

    /**
     * @dev Place an order for a product.
     * @param _productId The ID of the product.
     * @param _quantity The quantity of the product to order.
     * @param _dispatchTime The timestamp when the order should be dispatched.
     */
    function placeOrder(uint256 _productId,uint256 buyrate, uint256 _quantity, uint256 _dispatchTime) public payable 
    {
        _dispatchTime += _dispatchTime + block.timestamp;
        require(_quantity > 0, "Quantity must be greater than zero");
        require(_dispatchTime > block.timestamp, "Dispatch time must be in the future");

        uint256 orderPrice = buyrate * _quantity;
        require(msg.value >= orderPrice, "Insufficient funds");
        orderCount++;
        Order storage order = orders[_productId];
        order.orderId = _productId;
        order.productId = _productId;
        order.quantity = _quantity;
        order.dispatchTime = _dispatchTime;
        order.buyer = msg.sender;
        order.seller = address(0);
        order.dispatched = false;
        order.rejected = false;

        orderAmounts[_productId] = orderPrice;

 //       emit OrderPlaced(orderCount, _productId, _quantity, msg.sender, _dispatchTime);
    }

    function acceptOrder(uint256 _productId) external {
        Order storage order = orders[_productId];
        require(order.buyer != address(0), "Invalid order ID");
        require(msg.sender != order.buyer, "Buyer cannot accept the order");
        require(order.seller == address(0), "Order already accepted by another seller");
        order.rejected = false;
        order.seller = msg.sender;
    }

   
    function rejectOrder(uint256 _productId) external {
        Order storage order = orders[_productId];
          require(msg.sender != order.buyer, "Only the seller can reject the order");
        require(!order.rejected, "Order already rejected");

        uint256 orderAmount = orderAmounts[_productId];
        order.rejected = true;
        payable(order.buyer).transfer(orderAmount);

        emit OrderRejected(_productId, order.buyer, orderAmount);
    }

    function dispatchOrder(uint256 _productId) external {
        Order storage order = orders[_productId];
        require(order.seller == msg.sender, "Only the seller can dispatch the order");
        require(!order.dispatched, "Order already dispatched");
        require(!order.rejected, "Order has been rejected");
        uint256 orderPrice = orderAmounts[_productId];

        require(address(this).balance >= orderPrice, "Insufficient contract balance");

        uint256 fineAmount = 0;
        if (block.timestamp > order.dispatchTime) {
            fineAmount = (orderPrice * finePercentage) / 100;
            orderPrice -= fineAmount;
        }

        payable(order.seller).transfer(orderPrice);
        order.dispatched = true;

        emit OrderDispatched(_productId, order.seller, orderPrice);

        if (fineAmount > 0) {
            payable(order.buyer).transfer(fineAmount);
        }
    }
}