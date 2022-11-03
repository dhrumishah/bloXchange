import React from "react";
import { useQuery } from 'urql';
import Item from "./Item";
import { ITEMS_QUERY } from "../../queries"


const Items = () => {
    const [result] = useQuery({
        query: ITEMS_QUERY,
    });
    const { data, fetching, error } = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    const items = data.items;

    return (
        <>
            {items.length > 0 ? <div className="grid grid-cols-3 gap-8">
                {items.map(item => (
                    <Item
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price / 10 ** 18}
                        description={item.description}
                        location="Magdeburg, Deutschland"
                        image={item.images[0]}
                    />
                ))}
            </div> : <p>No items...</p>}
        </>
    )
};

export default Items;
