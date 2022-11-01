import { newMockEvent } from "matchstick-as";
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts";
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

export function createItemListedEvent(item: ethereum.Tuple): ItemListed {
  let ItemListedEvent = changetype<ItemListed>(newMockEvent());

  ItemListedEvent.parameters = new Array();

  ItemListedEvent.parameters.push(
    new ethereum.EventParam("item", ethereum.Value.fromTuple(item))
  );

  return ItemListedEvent;
}

export function createItemOrderedEvent(order: ethereum.Tuple): ItemOrdered {
  let itemOrderedEvent = changetype<ItemOrdered>(newMockEvent());

  itemOrderedEvent.parameters = new Array();

  itemOrderedEvent.parameters.push(
    new ethereum.EventParam("order", ethereum.Value.fromTuple(order))
  );

  return itemOrderedEvent;
}

export function createOrderDeliveredEvent(orderId: BigInt): OrderDelivered {
  let orderDeliveredEvent = changetype<OrderDelivered>(newMockEvent());

  orderDeliveredEvent.parameters = new Array();

  orderDeliveredEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  );

  return orderDeliveredEvent;
}

export function createOrderDisputedEvent(
  dispute: ethereum.Tuple
): OrderDisputed {
  let orderDisputedEvent = changetype<OrderDisputed>(newMockEvent());

  orderDisputedEvent.parameters = new Array();

  orderDisputedEvent.parameters.push(
    new ethereum.EventParam("dispute", ethereum.Value.fromTuple(dispute))
  );

  return orderDisputedEvent;
}

export function createOrderRefundedEvent(
  orderId: BigInt,
  refundedBy: Address
): OrderRefunded {
  let orderRefundedEvent = changetype<OrderRefunded>(newMockEvent());

  orderRefundedEvent.parameters = new Array();

  orderRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  );
  orderRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "refundedBy",
      ethereum.Value.fromAddress(refundedBy)
    )
  );

  return orderRefundedEvent;
}

export function createOrderShippedEvent(orderId: BigInt): OrderShipped {
  let orderShippedEvent = changetype<OrderShipped>(newMockEvent());

  orderShippedEvent.parameters = new Array();

  orderShippedEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  );

  return orderShippedEvent;
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent());

  roleAdminChangedEvent.parameters = new Array();

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  );
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  );

  return roleAdminChangedEvent;
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent());

  roleGrantedEvent.parameters = new Array();

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  );
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  );

  return roleGrantedEvent;
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent());

  roleRevokedEvent.parameters = new Array();

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  );
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  );

  return roleRevokedEvent;
}

export function createWithdrawEvent(
  amount: BigInt,
  to: Address,
  timestamp: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent());

  withdrawEvent.parameters = new Array();

  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  );
  withdrawEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  );
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  );

  return withdrawEvent;
}
