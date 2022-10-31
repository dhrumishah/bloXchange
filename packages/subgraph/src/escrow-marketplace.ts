import {
  ItemListed,
  ItemOrdered,
  OrderDelivered,
  OrderDisputed,
  OrderRefunded,
  OrderShipped,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Withdraw,
} from "../generated/EscrowMarketplace/EscrowMarketplace";
import { Dispute, Item, Order } from "../generated/schema";

enum Status {
  PENDING = 0,
  SHIPPED,
  DELIVERED,
  DISPUTTED,
  REFUNDED,
}

export function handleItemListed(event: ItemListed): void {
  let item = Item.load(event.params.itemId.toHex());

  if (!item) {
    const params = event.params;
    item = new Item(params.itemId.toHex());
    item.createdAt = params.createdAt;
    item.description = params.description;
    item.title = params.title;
    item.price = params.price;
    item.quantity = params.quantity;
    item.seller = params.seller;
    item.images = params.images;

    item.save();
  }
}

export function handleItemOrdered(event: ItemOrdered): void {
  let order = Order.load(event.params.orderId.toHex());
  if (!order) {
    const params = event.params;
    let item = Item.load(params.itemId.toHex());
    if (item) {
      item.quantity = item.quantity.minus(params.quantity);
      item.save();
    }
    order = new Order(params.orderId.toHex());
    order.item = params.itemId.toHex();
    order.amount = params.amount;
    order.quantity = params.quantity;
    order.orderedAt = params.orderedAt;
    order.disputeId = params.disputeId;
    order.buyer = params.buyer;
    order.status = params.status;

    order.save();
  }
}

export function handleOrderDelivered(event: OrderDelivered): void {
  let order = Order.load(event.params.orderId.toHex());
  if (order) {
    order.status = Status.DELIVERED;
    order.save();
  }
}

export function handleOrderDisputed(event: OrderDisputed): void {
  let dispute = Dispute.load(event.params.disputeId.toHex());
  if (!dispute) {
    let order = Order.load(event.params.orderId.toHex());
    if (order) {
      order.status = Status.DISPUTTED;
      order.save();
    }
    const params = event.params;
    dispute = new Dispute(params.disputeId.toHex());
    dispute.order = params.orderId.toHex();
    dispute.resolvedBy = params.resolvedBy;
    dispute.disputedBy = params.disputedBy;

    dispute.save();
  }
}

export function handleOrderRefunded(event: OrderRefunded): void {
  let order = Order.load(event.params.orderId.toHex());
  if (order) {
    let item = Item.load(order.item);
    let dispute = Dispute.load(order.disputeId.toHex());
    if (item) {
      item.quantity = item.quantity.plus(order.quantity);
      item.save();
    }
    if (dispute) {
      dispute.resolvedBy = event.params.refundedBy;
      dispute.save();
    }
    order.status = Status.REFUNDED;
    order.save();
  }
}

export function handleOrderShipped(event: OrderShipped): void {
  let order = Order.load(event.params.orderId.toHex());
  if (order) {
    order.status = Status.SHIPPED;
    order.save();
  }
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleWithdraw(event: Withdraw): void {}
