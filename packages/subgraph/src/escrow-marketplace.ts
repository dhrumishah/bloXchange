import {
  CategoryAdded,
  CategoryRemoved,
  ItemListed,
  ItemOrdered,
  OrderDelivered,
  OrderDisputed,
  OrderRefunded,
  OrderShipped,
  ProfileUpdated,
} from "../generated/EscrowMarketplace/EscrowMarketplace";
import { Category, Dispute, Item, Order, Profile } from "../generated/schema";
import { store } from "@graphprotocol/graph-ts";

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
    item.category = params.categoryId.toHex();
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

export function handleCategoryAdded(event: CategoryAdded): void {
  let category = Category.load(event.params.categoryId.toHex());
  if (!category) {
    category = new Category(event.params.categoryId.toHex());
    category.name = event.params.category.toString();
    category.save();
  }
}

export function handleCategoryRemoved(event: CategoryRemoved): void {
  let category = Category.load(event.params.categoryId.toHex());
  if (category) {
    store.remove("Category", category.id);
  }
}

export function handleProfileUpdated(event: ProfileUpdated): void {
  let profile = Profile.load(event.params.userAddress);
  if (!profile) {
    profile = new Profile(event.params.userAddress);
  }
  profile.profileURI = event.params.profileURI;
  profile.save();
}
