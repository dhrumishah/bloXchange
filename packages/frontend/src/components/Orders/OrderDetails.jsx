import React from "react";
import { useParams } from "react-router-dom";
import { ORDER_QUERY } from "../../queries";
import { useQuery } from "urql";
import Order from "./Order";

function OrderWrapper() {
  const { orderId } = useParams();
  const [result] = useQuery({
    query: ORDER_QUERY,
    variables: {
      id: orderId,
    },
    pause: !orderId,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Oh no... {error.message}</p>;

  const order = data.order;

  return <Order order={order} />;
}

export default function OrderDetails() {
  return (
    <main className="mt-[80px] py-12 px-4 relative flex flex-col min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
      <div className="relative mx-auto grid grid-cols-1 mt-14 sm:mt-0 gap-8 lg:flex lg:justify-center">
        <OrderWrapper />
      </div>
    </main>
  );
}
