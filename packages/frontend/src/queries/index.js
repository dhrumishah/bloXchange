export const ITEMS_QUERY = `
    query GetItems($categoryId: ID!, $first: Int!, $skip: Int!) {
        items(where: {
            category_: {
                id: $categoryId
            },
            quantity_gt: 0
        }, first: $first, skip: $skip) {
            id
            price
            quantity
            createdAt
            category {
                id
                name
            }
            seller
            title
            description
            images
        }
    }
`;

export const ALL_ITEMS_QUERY = `
    query GetItems($categoryId: ID!, $first: Int!, $skip: Int!) {
        items(where: {quantity_gt: 0}, first: $first, skip: $skip) {
            id
            price
            quantity
            createdAt
            category {
                id
                name
            }
            seller
            title
            description
            images
        }
    }
`;

export const ITEM_QUERY = `
    query GetItem($id: ID!) {
        item(id: $id) {
            id
            price
            quantity
            createdAt
            category {
                id
                name
            }
            seller
            title
            description
            images
        }
    }
`;

export const CATEGORIES_QUERY = `
    query {
        categories {   
            id
            name
        }
    }
`;

export const BUYER_ORDERS_QUERY = `
query GetOrders($buyer: Bytes!, $first: Int!, $skip: Int!) {
    orders(where: {
        buyer: $buyer
    }, first: $first, skip: $skip) {
        id
        item {
            id
            title
            seller
        }
        amount
        quantity
        orderedAt
        disputeId
        buyer
        status
        disputes
    }
}`

export const SELLER_ORDERS_QUERY = `
query GetOrders($seller: Bytes!, $first: Int!, $skip: Int!) {
    orders(where: {
        item_: {
            seller: $seller
        }
    }, first: $first, skip: $skip) {
        id
        item {
            id
            title
        }
        amount
        quantity
        orderedAt
        disputeId
        buyer
        status
        disputes
    }
}`

export const ORDER_QUERY = `
query GetOrder($id: ID!) {
    order(id: $id) {
        id
        item {
            id
            price
            quantity
            createdAt
            category {
                id
                name
            }
            seller
            title
            description
            images
        }
        amount
        quantity
        orderedAt
        disputeId
        buyer
        status
        disputes
    }
}`