export const ITEMS_QUERY = `
    query {
        items(first: 5) {
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
    query($id: ID!) {
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