import { serializeError } from "eth-rpc-errors";

export const parseError = (error, customMessage) => {
    const fallbackError = { code: 4999, customMessage }
    const serializedError = serializeError(error, fallbackError)
    return serializedError?.data?.originalError?.reason ?? serializedError.message
}

export const getShortAddress = (address) => {
    if (address) {
        return address.slice(0, 4) + "..." + address.slice(-4);
    }
    return address
}

export const getImageUrl = (cid) => {
    return `https://w3s.link/ipfs/${cid}`
}

export const orderStatus = {
    0: { text: "PENDING", color: "orange" },
    1: { text: "SHIPPED", color: "yellow" },
    2: { text: "DELIVERED", color: "green" },
    3: { text: "DISPUTTED", color: "red" },
    4: { text: "REFUNDED", color: "blue" },
};

export const ORDER_STATUS = {
    PENDING: 0,
    SHIPPED: 1,
    DELIVERED: 2,
    DISPUTTED: 3,
    REFUNDED: 4,
}