import { SELLER_ORDERS_QUERY } from "../../queries";
import { useAccount } from "wagmi";
import { useQuery } from "urql";
import { useEffect, useState } from "react";
import OrderRow from "./OrderRow";
import Thead from "./Table/Thead";

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
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden dark:bg-[#363952]">
        <table className="min-w-full leading-normal">
          <Thead isBuyer={false} isSeller={true} />
          {orders.length > 0 ? (
            <tbody>
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} userAddress={address} />
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td className="text-center text-white">No orders...</td>
              </tr>
            </tbody>
          )}
        </table>
        <div className="px-5 py-5 border-t border-slate-500 flex flex-col dark:bg-[#363952] xs:flex-row items-center xs:justify-between">
          {/* <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span> */}
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={gotopPreviousPage}
              className="w-full ml-auto mr-auto px-12 py-2 rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold hover:opacity-90 disabled:bg-[#595B73] disabled:pointer-events-none sm:min-w-[230px] sm:w-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300"
            >
              Prev
            </button>
            &nbsp; &nbsp;
            <button
              onClick={gotoNextPage}
              className="w-full ml-auto mr-auto px-12 py-2 rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold hover:opacity-90 disabled:bg-[#595B73] disabled:pointer-events-none sm:min-w-[230px] sm:w-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300"
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
