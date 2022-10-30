import { BigInt } from "@graphprotocol/graph-ts";
import {
  EscrowMarketplace,
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
import { Item } from "../generated/schema";

export function handleItemListed(event: ItemListed): void {
  let newItem = Item.load(event.params.itemId.toString());

  if (!newItem) {
    const params = event.params;
    newItem = new Item(event.params.itemId.toString());
    newItem.createdAt = params.createdAt;
    newItem.description = params.description;
    newItem.title = params.title;
    newItem.price = params.price;
    newItem.quantity = params.quantity;
    newItem.seller = params.seller;
    newItem.images = params.images;

    newItem.save();
  }
}

export function handleItemOrdered(event: ItemOrdered): void {}

export function handleOrderDelivered(event: OrderDelivered): void {}

export function handleOrderDisputed(event: OrderDisputed): void {}

export function handleOrderRefunded(event: OrderRefunded): void {}

export function handleOrderShipped(event: OrderShipped): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleWithdraw(event: Withdraw): void {}
