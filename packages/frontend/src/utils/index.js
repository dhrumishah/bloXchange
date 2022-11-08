import { serializeError } from "eth-rpc-errors";

export const parseError = (error, customMessage) => {
    const fallbackError = { code: 4999, customMessage }
    return serializeError(error, fallbackError).message
}