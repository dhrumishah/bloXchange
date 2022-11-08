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