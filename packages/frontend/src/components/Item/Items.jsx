import { useState, useEffect } from "react";
import { useQuery } from "urql";
import InfiniteScroll from "react-infinite-scroll-component";
import Item from "./Item";
import { ITEMS_QUERY, ALL_ITEMS_QUERY } from "../../queries";

const Items = ({ categoryId }) => {
  const pageItems = 10;
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [items, setItems] = useState([]);
  const [result, reexecuteQuery] = useQuery({
    query: categoryId === "0x-1" ? ALL_ITEMS_QUERY : ITEMS_QUERY,
    variables: {
      first: pageItems,
      skip,
      categoryId,
    },
  });
  const { data, fetching, error } = result;
  useEffect(() => {
    if (data?.items && data.items.length > 0) {
      setSkip(skip + pageItems);
      setItems([...items, ...data.items]);
      if (data.items.length < pageItems) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  }, [data?.items]);
  if (fetching && !data?.items) return <p>Loading...</p>;
  if (error && !data?.items) return <p>Oh no... {error.message}</p>;

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={reexecuteQuery}
      hasMore={hasMore}
      loader={<h4>Loading more items...</h4>}
      endMessage={
        <p style={{ textAlign: "center", marginTop: "5px" }}>
          <b className="text-white">No more items...</b>
        </p>
      }
    >
      {items.length > 0 ? (
        <div className="grid grid-cols-3 gap-8">
          {items.map((item) => (
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
        </div>
      ) : (
        <p>No items...</p>
      )}
    </InfiniteScroll>
  );
};

export default Items;
