import { SELLER_ORDERS_QUERY } from "../../queries";
import { useAccount } from "wagmi";
import { useQuery } from "urql";
import { useEffect, useState } from "react";
import OrderRow from "./OrderRow";

const SoldOrders = () => {
  const { address } = useAccount();
  const ordersInPageCount = 10;
  const [skip, setSkip] = useState(0);
  const [orders, setOrders] = useState([]);
  const [result, reexecuteQuery] = useQuery({
    query: SELLER_ORDERS_QUERY,
    variables: {
      seller: address,
      first: ordersInPageCount,
      skip,
    },
    pause: !address,
  });
  const { data, fetching, error } = result;

  const gotoNextPage = () => {
    if (orders.length === ordersInPageCount) {
      setSkip((prev) => prev + ordersInPageCount);
      reexecuteQuery();
    }
  };

  const gotopPreviousPage = () => {
    if (skip > 0) {
      setSkip((prev) => prev - ordersInPageCount);
      reexecuteQuery();
    }
  };

  useEffect(() => {
    if (data?.orders && data?.orders.length > 0) {
      setOrders(data?.orders ?? []);
    }
  }, [data]);

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Buyer
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Product
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ordered at
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          {orders.length > 0 ? (
            <tbody>
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} isSold={true} />
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td className="text-center">No orders...</td>
              </tr>
            </tbody>
          )}
        </table>
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
          {/* <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span> */}
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={gotopPreviousPage}
              className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l"
            >
              Prev
            </button>
            &nbsp; &nbsp;
            <button
              onClick={gotoNextPage}
              className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SoldOrders;
